import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://digital-garden-15m.pages.dev';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
