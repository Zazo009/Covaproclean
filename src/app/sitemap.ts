import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { enabledServices } from '@/config/services';
import { enabledAreas } from '@/config/areas';

const staticEnPaths = [
  '',
  '/services',
  '/book',
  '/pricing',
  '/areas',
  '/holiday-rental-cleaning',
  '/commercial-cleaning',
  '/about',
  '/contact',
  '/faq',
];

const staticEsPaths = [
  '/es',
  '/es/servicios',
  '/es/reservar',
  '/es/precios',
  '/es/zonas',
  '/es/limpieza-alquiler-vacacional',
  '/es/limpieza-comercial',
  '/es/nosotros',
  '/es/contacto',
  '/es/preguntas-frecuentes',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticEnPaths) {
    entries.push({ url: `${site.domain}${path}`, lastModified: now, changeFrequency: 'weekly', priority: path === '' ? 1 : 0.7 });
  }
  for (const path of staticEsPaths) {
    entries.push({ url: `${site.domain}${path}`, lastModified: now, changeFrequency: 'weekly', priority: path === '/es' ? 1 : 0.7 });
  }

  for (const service of enabledServices()) {
    entries.push({ url: `${site.domain}/services/${service.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    entries.push({ url: `${site.domain}/es/servicios/${service.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }

  for (const area of enabledAreas()) {
    entries.push({ url: `${site.domain}/areas/${area.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
    entries.push({ url: `${site.domain}/es/zonas/${area.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }

  return entries;
}
