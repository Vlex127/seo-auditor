'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    redirect('/Dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const host = (await headers()).get('host')
    const protocol = host?.includes('localhost') ? 'http' : 'https'
    const origin = `${protocol}://${host}`

    const { error } = await supabase.auth.signUp({
        ...data,
        options: {
            emailRedirectTo: `${origin}/auth/callback?next=%2FPricing`,
        },
    })

    if (error) {
        redirect('/signup?error=' + encodeURIComponent(error.message))
    }

    redirect('/signup?message=Check your email to confirm your account')
}

export async function signInWithOAuth(provider: 'google' | 'github') {
    const supabase = await createClient()
    const host = (await headers()).get('host')
    const protocol = host?.includes('localhost') ? 'http' : 'https'
    const origin = `${protocol}://${host}`

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${origin}/auth/callback?next=%2FPricing`,
        },
    })

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function selectPlan(plan: 'free' | 'pro' | 'enterprise') {
    const supabase = await createClient()

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Update the user's plan in the profiles table
    const { error } = await supabase
        .from('profiles')
        .update({ plan })
        .eq('id', user.id)

    if (error) {
        console.error('Error updating plan:', error.message)
        // Even if profiling fails, we might want to continue or show an error
    }

    // After selecting a plan, redirect to the dashboard
    redirect('/Dashboard')
}
