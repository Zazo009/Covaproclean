import { cn } from '@/lib/cn';
import { Camera } from 'lucide-react';

/**
 * A clearly-marked placeholder for real photography. Swap for a
 * `next/image` once licensed/commissioned photos exist — the aspect ratio
 * and rounding are set here so the surrounding layout won't shift.
 */
export function PhotoSlot({
  caption,
  aspect = 'aspect-[4/5]',
  className,
}: {
  caption: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative flex items-end overflow-hidden rounded-xl2 border border-pine-200/60 transition-transform duration-300 hover:-translate-y-1',
        'bg-[radial-gradient(circle_at_30%_20%,rgba(127,192,164,0.35),transparent_55%),linear-gradient(155deg,#EAE1CC,#D7EBE1)]',
        aspect,
        className
      )}
    >
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-pine-700 backdrop-blur">
        <Camera className="h-4 w-4" />
      </div>
      <p className="w-full bg-gradient-to-t from-ink-950/35 to-transparent p-4 font-display text-sm italic text-pine-900/80">
        {caption}
      </p>
    </div>
  );
}
