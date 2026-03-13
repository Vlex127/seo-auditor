'use server'

import { createClient } from '@/lib/supabase/server'

export async function getBacklinks(websiteId: string) {
    const supabase = await createClient()

    const { data: backlinks, error } = await supabase
        .from('backlinks')
        .select('*')
        .eq('website_id', websiteId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching backlinks:', error)
        return []
    }

    // Process backlinks for UI with some simulated metrics (DR, Traffic) 
    // since the schema only has basic fields
    return backlinks.map(b => ({
        id: b.id,
        site: b.url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0],
        url: b.url,
        title: b.title || 'Untitled Page',
        dr: Math.floor(Math.random() * 60) + 30, // Simulated DR
        traffic: `${(Math.random() * 500 + 10).toFixed(1)}K`, // Simulated Traffic
        status: b.is_toxic ? 'toxic' : 'ok',
        is_toxic: b.is_toxic
    }))
}

export async function getBacklinkStats(websiteId: string) {
    const supabase = await createClient()

    const { count: totalCount } = await supabase
        .from('backlinks')
        .select('*', { count: 'exact', head: true })
        .eq('website_id', websiteId)

    const { count: toxicCount } = await supabase
        .from('backlinks')
        .select('*', { count: 'exact', head: true })
        .eq('website_id', websiteId)
        .eq('is_toxic', true)

    return {
        total: totalCount || 0,
        toxic: toxicCount || 0,
        referringDomains: Math.floor((totalCount || 0) * 0.7) // Heuristic simulation
    }
}
