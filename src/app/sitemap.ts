import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://seo-vincent.vercel.app'

    const routes = [
        '',
        '/About',
        '/Pricing',
        '/Privacy',
        '/Terms',
        '/Careers',
        '/Audit',
        '/Keyword',
        '/Backlink',
        '/login',
        '/signup',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))
}
