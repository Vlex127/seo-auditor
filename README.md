Awesome—Next.js is comfy indeed! It's a perfect stack for this AI Local SEO Auditor MVP: fast prototyping with App Router, server-side data fetching (great for API calls without exposing keys), built-in SEO perks (Metadata API, SSR), easy Vercel deploys, and seamless integration with Supabase + Tailwind/Shadcn for a clean dashboard.

Since you're comfy with it, let's get practical with next steps tailored to Next.js. I'll outline the MVP architecture, key code snippets/patterns, and how to handle the tricky part: fetching Google Business Profile (GBP) data programmatically in 2026.

### Quick Reality Check on Google APIs (March 2026)
- The old "Google My Business API" has evolved → now called **Google Business Profile APIs** (still at developers.google.com/my-business).
- For **your use case** (auditing public-ish profiles as a third-party tool):
  - Full management/insights (reviews, performance metrics) requires the user to OAuth login + grant your app access (Business Profile APIs + OAuth scopes).
  - But for a simple public audit (name, address, photos count, reviews count, hours, categories, etc.), you can start with **Google Places API** (Find Place + Place Details) → it's public, no user auth needed, and covers most basics for unclaimed or basic profiles.
  - Limitations: Doesn't give full private insights (e.g., exact view counts), but perfect for MVP scoring/completeness checks.
  - If users want deeper (their own profile), add OAuth later (Google Business Profile APIs support it).
- Pro tip: Many tools scrape ethically or use Places as fallback. For compliance, stick to APIs first.

### MVP Architecture in Next.js (App Router)
Project structure (quick setup: `npx create-next-app@latest my-seo-auditor --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`)

```
/src
  /app
    /dashboard/page.tsx       // Protected dashboard after login
    /api/audit/route.ts       // Server Action or Route Handler for audit
    page.tsx                  // Landing + input form
  /components
    AuditForm.tsx
    AuditReport.tsx
    ScoreCard.tsx
  /lib
    google.ts                 // Places API helpers
    ai.ts                     // OpenAI/Anthropic prompt + call
  /hooks
    useAuth.ts                // Supabase auth
```

**Tech additions** (install now):
```bash
npm install @supabase/supabase-js openai zod @google-cloud/local-auth-library  # or use fetch for Places
# For auth: npm install @supabase/auth-helpers-nextjs
# UI: npm install shadcn-ui  (npx shadcn-ui@latest init)
```

### Step 1: Google Places API Setup (Start Here Today)
1. Go to Google Cloud Console → Create project.
2. Enable **Places API** (New) + **Maps JavaScript API** if needed.
3. Create API key → restrict to your domain + Places API.
4. Cost: Free tier ~1k requests/month, then cheap (~$0.017 per Place Details).

Helper in `/lib/google.ts`:
```ts
// lib/google.ts
const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

export async function searchBusiness(query: string) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,formatted_address,geometry&key=${PLACES_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.candidates?.length > 0) return data.candidates[0].place_id;
  return null;
}

export async function getPlaceDetails(placeId: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,types,opening_hours,website,rating,user_ratings_total,photos,reviews,vicinity&key=${PLACES_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
}
```

### Step 2: Audit Route (Server-Side Magic)
Use Route Handler `/app/api/audit/route.ts` (POST):
```ts
// app/api/audit/route.ts
import { NextResponse } from 'next/server';
import { searchBusiness, getPlaceDetails } from '@/lib/google';
import { getAIReport } from '@/lib/ai'; // your AI function

export async function POST(req: Request) {
  const { businessName, location = 'Lagos, Nigeria' } = await req.json();

  try {
    const placeId = await searchBusiness(`${businessName} ${location}`);
    if (!placeId) return NextResponse.json({ error: 'Business not found' }, { status: 404 });

    const details = await getPlaceDetails(placeId);

    // Simple score calc (expand this)
    const score = calculateScore(details); // e.g., completeness % based on fields present

    // AI magic
    const aiSuggestions = await getAIReport(details, score);

    return NextResponse.json({
      score,
      details: {
        name: details.name,
        address: details.formatted_address,
        rating: details.rating,
        reviews: details.user_ratings_total,
        photos: details.photos?.length || 0,
        // etc.
      },
      suggestions: aiSuggestions,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Audit failed' }, { status: 500 });
  }
}

function calculateScore(details: any) {
  let score = 0;
  if (details.formatted_address) score += 20;
  if (details.opening_hours) score += 15;
  if (details.photos?.length > 5) score += 20;
  if (details.rating > 4) score += 15;
  // Add more rules (photos freshness, categories, etc.)
  return Math.min(score, 100);
}
```

### Step 3: AI Suggestions (Claude or OpenAI)
In `/lib/ai.ts`:
```ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAIReport(details: any, score: number) {
  const prompt = `
You are a local SEO expert for Nigerian businesses in Lagos.
Business data: ${JSON.stringify(details, null, 2)}
Current visibility score: ${score}/100

Generate a prioritized list of 5-8 fixes in plain English/Pidgin.
Include:
- Why it matters (e.g., "More photos = more clicks from Maps")
- Exact action (e.g., "Upload 10 fresh interior pics this week")
- Hyperlocal tips (keywords like "best salon in Ikeja")

Output as JSON array: [{priority:1, title:"Add more photos", description:"..."}]
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // cheap & fast
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(completion.choices[0].message.content || '{}').fixes;
}
```

### Next Immediate Actions (This Week)
1. Set up Google Cloud project + Places API key → add to `.env.local`.
2. Build landing page form (business name input) → call the /api/audit on submit.
3. Add Supabase auth (quick: email/password or magic link) so users see history.
4. Deploy to Vercel (free) → test with real Lagos businesses (e.g., search "tattoo artist Lagos").
5. Free tier launch: Show basic report free, gate monthly tracking behind ₦5k/mo (Paystack integration next).

This gets you a working MVP fast—input → fetch → AI fixes → nice report. Once live, collect feedback from 10–20 local spots.

Need code for the form component, Supabase setup snippet, Paystack button, or tweaks (e.g., add directory checks via scraping fallback)? Or want to focus on beauty salons niche first? Hit me—let's build momentum! 🚀