import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    console.log("Auth callback URL received:", request.url)
    const code = searchParams.get('code')

    // Explicitly check for next, but default to /Pricing for onboarding
    // This ensures that if things get stripped, we still send them to the plan select screen
    let next = searchParams.get('next') ?? '/Pricing'
    if (next === '/') next = '/Pricing'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            console.log("Auth callback successful, redirecting to:", next)

            // In hosted environments, we want to ensure we redirect to the correct public URL
            // We'll use the origin from the request, but ensure HTTPS if not local
            const isLocal = request.url.includes('localhost')
            const protocol = isLocal ? 'http' : 'https'
            const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || origin.split('://')[1]

            const redirectUrl = new URL(next, `${protocol}://${host}`)
            return NextResponse.redirect(redirectUrl.toString())
        } else {
            console.error("Auth callback error:", error.message)
        }
    } else {
        console.warn("Auth callback: No code found in URL")
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
