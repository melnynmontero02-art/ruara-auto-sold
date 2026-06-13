import type { MetadataRoute } from 'next'
import { vehicles, SITE_URL } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { route: string; priority: number; changeFrequency: 'daily' | 'weekly' }[] = [
    { route: '',               priority: 1.0, changeFrequency: 'daily' },
    { route: '/inventario',    priority: 0.9, changeFrequency: 'daily' },
    { route: '/financiamiento',priority: 0.8, changeFrequency: 'weekly' },
    { route: '/servicios',     priority: 0.7, changeFrequency: 'weekly' },
    { route: '/vende',         priority: 0.7, changeFrequency: 'weekly' },
    { route: '/nosotros',      priority: 0.6, changeFrequency: 'weekly' },
    { route: '/contacto',      priority: 0.6, changeFrequency: 'weekly' },
  ]

  const now = new Date()

  return [
    ...staticRoutes.map(({ route, priority, changeFrequency }) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...vehicles.map(v => ({
      url: `${SITE_URL}/inventario/${v.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
