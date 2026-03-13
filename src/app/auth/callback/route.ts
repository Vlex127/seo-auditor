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
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        } else {
            console.error("Auth callback error:", error.message)
        }
    } else {
        console.warn("Auth callback: No code found in URL")
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
