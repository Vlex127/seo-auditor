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

        // Extract Issues/Opportunities (Top 5)
        const opportunities = Object.values(audits)
            .filter((audit: any) => audit.details?.type === 'opportunity' && audit.score < 1)
            .sort((a: any, b: any) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
            .slice(0, 5)
            .map((audit: any) => ({
                id: audit.id,
                title: audit.title,
                level: audit.score < 0.5 ? 'high' : 'medium',
                description: audit.description
            }))

        // 3. Save Audit to Database
        const { data: auditRecord, error: auditError } = await supabase
            .from('audits')
            .insert([{
                website_id: websiteId,
                score_performance: scores.performance,
                score_seo: scores.seo,
                score_accessibility: scores.accessibility,
                score_best_practices: scores.best_practices,
                raw_data: { metrics, lighthouse_summary: lighthouse.timing, discovered_pages: discoveredPages }
            }])
            .select()
            .single()

        if (auditError) throw auditError

        // 3. Save Issues to Database
        if (opportunities.length > 0) {
            const { data: { user } } = await supabase.auth.getUser()
            const issuesToInsert = opportunities.map(opt => ({
                audit_id: auditRecord.id,
                level: opt.level,
                text: opt.title,
                fix_recommendation: opt.description,
                resolved: false
            }))
            await supabase.from('issues').insert(issuesToInsert)
        }

        revalidatePath('/Dashboard')
        return { success: true, scores, metrics, issues: opportunities }

    } catch (error: any) {
        console.error('Audit failed:', error)
        return { error: error.message || 'Failed to complete audit' }
    }
}
