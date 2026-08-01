import type { ComponentType } from 'react';
import { cn } from '@/lib/cn';
import { Camera } from 'lucide-react';
import { VillaScene, InteriorScene, CoastScene, BedroomScene, OfficeScene, TeamScene } from './illustrations/Scenes';

const scenes = {
  villa: VillaScene,
  interior: InteriorScene,
  coast: CoastScene,
  bedroom: BedroomScene,
  office: OfficeScene,
  team: TeamScene,
} satisfies Record<string, ComponentType>;

export type SceneVariant = keyof typeof scenes;

/**
 * An illustrated stand-in for real photography. Shows an original,
 * hand-built scene (see `illustrations/Scenes.tsx`) rather than a generic
 * stock photo — swap for a `next/image` once licensed/commissioned photos
 * exist. The aspect ratio and rounding are fixed here so the layout won't
 * shift when that happens.
 */
export function PhotoSlot({
  caption,
  variant = 'villa',
  aspect = 'aspect-[4/5]',
  className,
}: {
  caption: string;
  variant?: SceneVariant;
  aspect?: string;
  className?: string;
}) {
  const Scene = scenes[variant];

  return (
    <div
      className={cn(
        'relative flex items-end overflow-hidden rounded-xl2 border border-pine-200/60 transition-transform duration-300 hover:-translate-y-1',
        aspect,
        className
      )}
    >
      <div className="absolute inset-0">
        <Scene />
      </div>
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-pine-700 backdrop-blur">
        <Camera className="h-4 w-4" />
      </div>
      <p className="relative w-full bg-gradient-to-t from-ink-950/45 to-transparent p-4 font-display text-sm italic text-white">
        {caption}
      </p>
    </div>
  );
}
