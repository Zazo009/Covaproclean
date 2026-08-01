import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';

type Href = Parameters<typeof getPathname>[0]['href'];

/**
 * Builds a self-referencing canonical URL plus hreflang alternates for the
 * given page, for the given locale. Every page must call this with its own
 * route — the site-wide default in the root layout only covers "/", so any
 * page that doesn't set its own canonical ends up incorrectly claiming the
 * homepage as canonical (a real duplicate-content SEO bug, not just a
 * localhost-testing artifact).
 */
export function buildAlternates(locale: string, href: Href): Metadata['alternates'] {
  const canonical = getPathname({ locale: locale as Locale, href });
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, getPathname({ locale: loc, href })])
  );

  return { canonical, languages };
}
