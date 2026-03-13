'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addWebsite(domain: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    // Clean domain
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]

    // Get user profile to check plan
    const { data: profile } = await supabase
        .from('profiles')
        .select('plan')
        .eq('id', user.id)
        .single()

    // Count existing websites
    const { count } = await supabase
        .from('websites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    const siteCount = count || 0

    if (profile?.plan === 'free' && siteCount >= 1) {
        return { error: 'upgrade_required', message: 'Free plan is limited to 1 website. Please upgrade to add more.' }
    }

    if (profile?.plan === 'pro' && siteCount >= 5) {
        return { error: 'upgrade_required', message: 'Pro plan is limited to 5 websites. Please upgrade to add more.' }
    }

    const { data, error } = await supabase
        .from('websites')
        .insert([{ user_id: user.id, domain: cleanDomain }])
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/Dashboard')
    return { data }
}

export async function getWebsites() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return data || []
}
