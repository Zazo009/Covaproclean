import type { ReactNode } from 'react';
import { Container } from './ui/Container';
import { cn } from '@/lib/cn';

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  actions?: ReactNode;
  microTrust?: string;
  className?: string;
  compact?: boolean;
  /** Optional illustration/photo rendered beside the copy on wide screens. */
  visual?: ReactNode;
}

export function Hero({ eyebrow, headline, subheadline, actions, microTrust, className, compact, visual }: HeroProps) {
  const textAlign = visual ? 'text-center lg:text-left' : 'text-center';

  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-pine-200/40 blur-3xl"
      />
      <Container
        className={cn(
          'relative py-20',
          compact ? 'py-14' : 'py-20 sm:py-24',
          visual ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-2' : undefined
        )}
      >
        <div className={textAlign}>
          {eyebrow && (
            <p
              className={cn(
                'mb-4 inline-block rounded-full border border-pine-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-pine-700 animate-fadeUp',
                !visual && 'mx-auto'
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              'font-display text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl animate-fadeUp',
              visual ? 'max-w-xl' : 'mx-auto max-w-3xl'
            )}
          >
            {headline}
          </h1>
          {subheadline && (
            <p className={cn('mt-5 text-lg text-ink-800/80 animate-fadeUp', visual ? 'max-w-xl' : 'mx-auto max-w-2xl')}>
              {subheadline}
            </p>
          )}
          {actions && (
            <div
              className={cn(
                'mt-8 flex flex-wrap items-center gap-3 animate-fadeUp',
                visual ? 'justify-center lg:justify-start' : 'justify-center'
              )}
            >
              {actions}
            </div>
          )}
          {microTrust && <p className="mt-6 text-xs uppercase tracking-wide text-ink-800/50">{microTrust}</p>}
        </div>
        {visual && <div className="mx-auto w-full max-w-md lg:max-w-none">{visual}</div>}
      </Container>
    </section>
  );
}
