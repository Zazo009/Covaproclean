import type { SceneVariant } from '@/components/PhotoSlot';
import { VillaScene, InteriorScene, CoastScene, BedroomScene, OfficeScene, TeamScene } from '@/components/illustrations/Scenes';

const scenes = {
  villa: VillaScene,
  interior: InteriorScene,
  coast: CoastScene,
  bedroom: BedroomScene,
  office: OfficeScene,
  team: TeamScene,
} satisfies Record<SceneVariant, typeof VillaScene>;

export function StepHeader({
  variant,
  heading,
  subheading,
}: {
  variant: SceneVariant;
  heading: string;
  subheading?: string;
}) {
  const Scene = scenes[variant];

  return (
    <div className="mb-6 overflow-hidden rounded-xl2 border border-pine-100">
      <div className="h-24 sm:h-28">
        <Scene />
      </div>
      <div className="bg-white px-5 py-4">
        <h2 className="font-display text-xl font-semibold text-ink-950">{heading}</h2>
        {subheading && <p className="mt-1 text-sm text-ink-800/70">{subheading}</p>}
      </div>
    </div>
  );
}
