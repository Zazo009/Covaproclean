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
}

export function Hero({ eyebrow, headline, subheadline, actions, microTrust, className, compact }: HeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50', className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-pine-200/40 blur-3xl"
      />
      <Container className={cn('relative py-20 text-center', compact ? 'py-14' : 'py-24 sm:py-28')}>
        {eyebrow && (
          <p className="mx-auto mb-4 inline-block rounded-full border border-pine-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-pine-700 animate-fadeUp">
            {eyebrow}
          </p>
        )}
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink-950 sm:text-5xl animate-fadeUp">
          {headline}
        </h1>
        {subheadline && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-800/80 animate-fadeUp">{subheadline}</p>
        )}
        {actions && <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fadeUp">{actions}</div>}
        {microTrust && <p className="mt-6 text-xs uppercase tracking-wide text-ink-800/50">{microTrust}</p>}
      </Container>
    </section>
  );
}
