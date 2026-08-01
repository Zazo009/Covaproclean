/**
 * Service-area catalogue driving /areas and /areas/[slug]. Copy lives in
 * messages under `areas.items.<slug>`. Add a new town by adding one entry
 * here plus its translation block — no routing/template changes needed.
 */
export interface AreaConfig {
  slug: string;
  region: string;
  enabled: boolean;
  featured: boolean;
}

export const areas: AreaConfig[] = [
  { slug: 'marbella', region: 'Málaga', enabled: true, featured: true },
  { slug: 'nueva-andalucia', region: 'Marbella', enabled: true, featured: true },
  { slug: 'puerto-banus', region: 'Marbella', enabled: true, featured: true },
  { slug: 'san-pedro-de-alcantara', region: 'Marbella', enabled: true, featured: true },
  { slug: 'benahavis', region: 'Málaga', enabled: true, featured: false },
  { slug: 'estepona', region: 'Málaga', enabled: true, featured: true },
  { slug: 'mijas', region: 'Málaga', enabled: true, featured: false },
  { slug: 'fuengirola', region: 'Málaga', enabled: true, featured: false },
  { slug: 'benalmadena', region: 'Málaga', enabled: true, featured: false },
  { slug: 'malaga', region: 'Málaga', enabled: true, featured: true },
  { slug: 'sotogrande', region: 'Cádiz', enabled: true, featured: false },
];

export const enabledAreas = () => areas.filter((a) => a.enabled);
export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
