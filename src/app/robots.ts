import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/Dashboard/', '/auth/', '/Settings/'],
        },
        sitemap: 'https://seo-vincent.vercel.app/sitemap.xml',
    }
}
