'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

const API_KEY = process.env.GOOGLE_PAGE_INSIGHTS

export async function runAudit(websiteId: string, domain: string) {
    const supabase = await createClient()

    try {
        // 1. Fetch PageSpeed Insights Data (Desktop)
        const desktopUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://${domain}&key=${API_KEY}&category=SEO&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=desktop`
        const desktopRes = await fetch(desktopUrl)
        const desktopData = await desktopRes.json()

        if (desktopData.error) {
            throw new Error(desktopData.error.message || 'PageSpeed API Error')
        }

        const lighthouse = desktopData.lighthouseResult
        const categories = lighthouse.categories

        // 2. Discover Sitemap and Pages
        let discoveredPages: string[] = []
        try {
            const sitemapUrl = `https://${domain}/sitemap.xml`
            const sitemapRes = await fetch(sitemapUrl)
            if (sitemapRes.ok) {
                const sitemapText = await sitemapRes.text()
                // Simple regex to extract <loc> URLs from XML
                const locs = sitemapText.match(/<loc>(.*?)<\/loc>/g)
                if (locs) {
                    discoveredPages = locs.map(l => l.replace('<loc>', '').replace('</loc>', '')).slice(0, 50)
                }
            }
        } catch (e) {
            console.log('No sitemap found')
        }

        // Extract Scores (0-100)
        const scores = {
            performance: Math.round(categories.performance.score * 100),
            seo: Math.round(categories.seo.score * 100),
            accessibility: Math.round(categories.accessibility.score * 100),
            best_practices: Math.round(categories['best-practices'].score * 100),
            search_visibility: Math.round(categories.seo.score * 85) // Simulated GSC visibility
        }

        // Summary of Metrics
        const audits = lighthouse.audits
        const metrics = {
            lcp: audits['largest-contentful-paint'].displayValue,
            cls: audits['cumulative-layout-shift'].displayValue,
            fcp: audits['first-contentful-paint'].displayValue,
            speed_index: audits['speed-index'].displayValue,
            interactive: audits['interactive'].displayValue,
            pages_found: discoveredPages.length
        }

        // Extract Issues/Opportunities (More robust selection)
        const allAudits = Object.values(lighthouse.audits)
        const extractedIssues = allAudits
            .filter((audit: any) =>
                audit.score !== null &&
                audit.score < 0.9 &&
                audit.title &&
                audit.description &&
                !audit.id.includes('manual') // Skip manual checks
            )
            .sort((a: any, b: any) => (a.score || 0) - (b.score || 0))
            .slice(0, 10)
            .map((audit: any) => ({
                id: audit.id,
                title: audit.title,
                level: audit.score < 0.5 ? 'high' : 'medium',
                description: audit.description
            }))

        // Fallback if no issues found but scores aren't perfect
        if (extractedIssues.length === 0 && (scores.seo < 100 || scores.performance < 100)) {
            extractedIssues.push({
                id: 'generic-optimization',
                title: 'General SEO Optimization',
                level: 'medium',
                description: 'We suggest a deep dive into your content structure to improve visibility.'
            })
        }

        // 3. Save Audit to Database
        const { data: auditRecord, error: auditError } = await supabase
            .from('audits')
            .insert([{
                website_id: websiteId,
                score_performance: scores.performance,
                score_seo: scores.seo,
                score_accessibility: scores.accessibility,
                score_best_practices: scores.best_practices,
                raw_data: {
                    metrics,
                    lighthouse_summary: lighthouse.timing,
                    discovered_pages: discoveredPages,
                    issues: extractedIssues // SAVE ISSUES IN RAW_DATA AS FAILSAFE
                }
            }])
            .select()
            .single()

        if (auditError) {
            console.error('Audit Record Insert Error:', auditError)
            throw auditError
        }

        // 4. Save Issues to Database (Secondary - failsafed)
        if (extractedIssues.length > 0) {
            try {
                // Try text column (standard)
                const issuesToInsert = extractedIssues.map(opt => ({
                    audit_id: auditRecord.id,
                    level: opt.level,
                    text: opt.title,
                    resolved: false
                }))

                const { error: issuesError } = await supabase.from('issues').insert(issuesToInsert)

                // If it fails due to column name, try title column
                if (issuesError && issuesError.code === 'PGRST204') {
                    const fallbackIssues = extractedIssues.map(opt => ({
                        audit_id: auditRecord.id,
                        level: opt.level,
                        title: opt.title,
                        resolved: false
                    }))
                    await supabase.from('issues').insert(fallbackIssues)
                }
            } catch (err) {
                // Silently fail - issues are already in raw_data for safety
                console.warn('Issues table insertion failed, using raw_data fallback.')
            }
        }

        revalidatePath('/Dashboard')
        return { success: true, scores, metrics, issues: extractedIssues }

    } catch (error: any) {
        console.error('Audit failed:', error)
        return { error: error.message || 'Failed to complete audit' }
    }
}

export async function runGuestAudit(domain: string) {
    try {
        const desktopUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://${domain}&key=${API_KEY}&category=SEO&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&strategy=desktop`
        const desktopRes = await fetch(desktopUrl)
        const desktopData = await desktopRes.json()

        if (desktopData.error) {
            throw new Error(desktopData.error.message || 'PageSpeed API Error')
        }

        const lighthouse = desktopData.lighthouseResult
        const categories = lighthouse.categories

        const scores = {
            performance: Math.round(categories.performance.score * 100),
            seo: Math.round(categories.seo.score * 100),
            accessibility: Math.round(categories.accessibility.score * 100),
            best_practices: Math.round(categories['best-practices'].score * 100),
        }

        const audits = lighthouse.audits
        const opportunities = Object.values(audits)
            .filter((audit: any) => audit.details?.type === 'opportunity' && audit.score < 1)
            .sort((a: any) => (a.score))
            .slice(0, 3)
            .map((audit: any) => ({
                title: audit.title,
                level: audit.score < 0.5 ? 'high' : 'medium'
            }))

        return { success: true, scores, issuesCount: opportunities.length, topIssues: opportunities }
    } catch (error: any) {
        console.error('Guest Audit failed:', error)
        return { error: error.message || 'Failed to complete audit' }
    }
}
