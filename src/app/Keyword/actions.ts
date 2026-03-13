'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addKeyword(websiteId: string, keyword: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    // Check if keyword already exists for this website
    const { data: existing } = await supabase
        .from('keywords')
        .select('*')
        .eq('website_id', websiteId)
        .eq('keyword', keyword)
        .maybeSingle()

    if (existing) {
        return { error: 'Keyword already tracked for this website' }
    }

    const { data, error } = await supabase
        .from('keywords')
        .insert([{ website_id: websiteId, keyword: keyword.toLowerCase().trim() }])
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    // Simulate initial ranking
    await supabase.from('keyword_rankings').insert([{
        keyword_id: data.id,
        position: Math.floor(Math.random() * 99) + 1,
        recorded_at: new Date().toISOString()
    }])

    revalidatePath('/Keyword')
    return { data }
}

export async function getKeywords(websiteId: string) {
    const supabase = await createClient()

    // Get keywords with their latest ranking
    const { data, error } = await supabase
        .from('keywords')
        .select(`
            *,
            keyword_rankings (
                position,
                recorded_at
            )
        `)
        .eq('website_id', websiteId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching keywords:', error)
        return []
    }

    // Process to get the latest ranking and some random metadata for UI
    return data.map(k => {
        const rankings = k.keyword_rankings || []
        const latest = rankings.sort((a: any, b: any) =>
            new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
        )[0]

        return {
            id: k.id,
            kw: k.keyword,
            pos: latest?.position || '-',
            delta: Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1),
            vol: `${(Math.random() * 20 + 1).toFixed(1)}K`,
            difficulty: Math.floor(Math.random() * 100),
            recorded_at: latest?.recorded_at
        }
    })
}

export async function deleteKeyword(keywordId: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('keywords')
        .delete()
        .eq('id', keywordId)

    if (error) return { error: error.message }

    revalidatePath('/Keyword')
    return { success: true }
}
