'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Updates the Google Search Console connection status in the user's metadata.
 * Using user_metadata ensures persistence even if the profiles table schema is restricted.
 */
export async function updateGSCConnection(connected: boolean) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase.auth.updateUser({
        data: { gsc_connected: connected }
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/Settings')
    return { success: true }
}

/**
 * Disconnects the Google Search Console.
 */
export async function disconnectGSC() {
    return updateGSCConnection(false)
}
