'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts up to `value` once it scrolls into view. Only ever fed real,
 * config-derived numbers (service count, area count, etc.) — never a
 * fabricated or unconfirmed stat.
 */
export function StatCounter({
  value,
  label,
  suffix = '',
  duration = 900,
}: {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref}>
      <p className="font-display text-3xl font-semibold text-pine-800">
        {display}
        {suffix}
      </p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-800/80">{label}</p>
    </div>
  );
}
