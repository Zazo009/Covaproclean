/**
 * A small family of hand-built scene illustrations sharing the palette and
 * flat-shape style of `CostaSkyline`. Used to fill photography slots with
 * real, original artwork (zero licensing risk) until commissioned photos
 * replace them — see `PhotoSlot`.
 */
function Base({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E3C8" />
          <stop offset="100%" stopColor="#EAE1CC" />
        </linearGradient>
        <filter id="sc-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
        <radialGradient id="sc-vignette" cx="50%" cy="35%" r="75%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#0D332B" stopOpacity="0.14" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#sc-sky)" />
      {children}
      <rect width="400" height="400" fill="url(#sc-vignette)" opacity="0.5" />
    </svg>
  );
}

function Shadow({
  cx,
  cy,
  rx,
  ry = 14,
}: {
  cx: number | string;
  cy: number | string;
  rx: number | string;
  ry?: number | string;
}) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#0D332B" opacity="0.16" filter="url(#sc-soft-shadow)" />;
}

export function VillaScene() {
  return (
    <Base label="Illustration of a whitewashed villa with a terracotta roof, pool and palm tree">
      <defs>
        <linearGradient id="villa-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9FD6BB" />
          <stop offset="100%" stopColor="#4CA483" />
        </linearGradient>
        <linearGradient id="villa-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E98A6B" />
          <stop offset="100%" stopColor="#C2573A" />
        </linearGradient>
      </defs>
      <rect y="250" width="400" height="150" fill="#EAE1CC" />
      <Shadow cx="200" cy="290" rx="130" ry="16" />
      <rect x="90" y="145" width="220" height="135" fill="#FBF9F4" />
      <rect x="90" y="145" width="220" height="10" fill="#EAE1CC" />
      <polygon points="78,145 322,145 200,82" fill="url(#villa-roof)" />
      <polygon points="78,145 322,145 315,150 85,150" fill="#A6432B" opacity="0.5" />
      <rect x="150" y="196" width="40" height="84" fill="#124237" />
      <rect x="152" y="198" width="36" height="8" fill="#1F6B52" opacity="0.6" />
      <rect x="218" y="188" width="38" height="38" fill="#7FC0A4" opacity="0.55" />
      <rect x="218" y="188" width="38" height="12" fill="#EEF6F2" opacity="0.5" />
      <rect x="272" y="188" width="38" height="38" fill="#7FC0A4" opacity="0.55" />
      <rect x="272" y="188" width="38" height="12" fill="#EEF6F2" opacity="0.5" />
      <ellipse cx="200" cy="320" rx="95" ry="20" fill="url(#villa-pool)" />
      <ellipse cx="200" cy="316" rx="95" ry="8" fill="#EEF6F2" opacity="0.3" />
      <g stroke="#124237" strokeWidth="6" strokeLinecap="round">
        <path d="M330 295 C 326 255 336 215 350 185" fill="none" />
      </g>
      <g fill="#1F6B52">
        <path d="M350 185 C 320 173 305 153 300 135 C 322 143 342 160 352 177 Z" />
        <path d="M350 185 C 380 170 398 150 404 130 C 380 143 358 160 348 177 Z" />
        <path d="M350 185 C 340 155 342 130 350 110 C 364 130 366 157 358 181 Z" />
      </g>
    </Base>
  );
}

export function InteriorScene() {
  return (
    <Base label="Illustration of a bright, tidy living room">
      <defs>
        <linearGradient id="int-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBF9F4" />
          <stop offset="100%" stopColor="#F5F0E4" />
        </linearGradient>
        <linearGradient id="int-sofa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9FD6BB" />
          <stop offset="100%" stopColor="#4CA483" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#int-wall)" />
      <rect x="30" y="55" width="150" height="115" fill="#EAE1CC" />
      <rect x="45" y="70" width="120" height="85" fill="#D7EBE1" />
      <rect x="45" y="70" width="120" height="18" fill="#F3D7B6" opacity="0.6" />
      <Shadow cx="130" cy="330" rx="150" ry="16" />
      <rect x="0" y="228" width="240" height="95" rx="18" fill="url(#int-sofa)" />
      <rect x="10" y="215" width="60" height="42" rx="12" fill="#175443" />
      <rect x="185" y="215" width="60" height="42" rx="12" fill="#175443" />
      <rect x="250" y="150" width="16" height="170" fill="#DD6E49" />
      <ellipse cx="258" cy="145" rx="34" ry="14" fill="#F3D7B6" />
      <path d="M260 400 C 258 360 268 330 280 300" stroke="#4CA483" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="280" cy="300" rx="26" ry="12" fill="#1F6B52" />
      <ellipse cx="255" cy="290" rx="20" ry="10" fill="#7FC0A4" />
      <rect x="0" y="330" width="400" height="70" fill="#EAE1CC" />
      <ellipse cx="130" cy="335" rx="110" ry="10" fill="#D7EBE1" opacity="0.7" />
    </Base>
  );
}

export function CoastScene() {
  return (
    <Base label="Illustration of the Costa del Sol coastline">
      <defs>
        <radialGradient id="coast-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3DC" />
          <stop offset="100%" stopColor="#E98A6B" />
        </radialGradient>
        <linearGradient id="coast-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9FD6BB" />
          <stop offset="100%" stopColor="#175443" />
        </linearGradient>
      </defs>
      <rect width="400" height="230" fill="#F3D7B6" />
      <ellipse cx="120" cy="70" rx="45" ry="14" fill="#FBF9F4" opacity="0.6" />
      <ellipse cx="170" cy="80" rx="30" ry="10" fill="#FBF9F4" opacity="0.5" />
      <circle cx="320" cy="100" r="42" fill="url(#coast-sun)" />
      <rect y="210" width="400" height="190" fill="url(#coast-sea)" />
      <path d="M0 220 q 30 -12 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="#EEF6F2" strokeWidth="4" opacity="0.5" />
      <path d="M0 245 q 30 10 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="#EEF6F2" strokeWidth="3" opacity="0.3" />
      <path d="M0 200 L 0 400 L 400 400 L 400 240 Q 300 200 200 260 Q 100 320 0 260 Z" fill="#F5E3C8" />
      <ellipse cx="200" cy="340" rx="180" ry="20" fill="#EAE1CC" opacity="0.5" />
    </Base>
  );
}

export function BedroomScene() {
  return (
    <Base label="Illustration of a neatly made guest bedroom">
      <defs>
        <linearGradient id="bed-linen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F0E4" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#FBF9F4" />
      <Shadow cx="200" cy="295" rx="160" ry="16" />
      <rect x="50" y="150" width="300" height="140" rx="10" fill="url(#bed-linen)" />
      <rect x="50" y="150" width="300" height="34" rx="10" fill="#D7EBE1" />
      <rect x="50" y="150" width="300" height="10" fill="#7FC0A4" opacity="0.4" />
      <rect x="70" y="118" width="60" height="52" rx="8" fill="#FFFFFF" stroke="#EAE1CC" strokeWidth="3" />
      <rect x="270" y="118" width="60" height="52" rx="8" fill="#FFFFFF" stroke="#EAE1CC" strokeWidth="3" />
      <rect x="0" y="290" width="400" height="110" fill="#EAE1CC" />
      <circle cx="330" cy="65" r="28" fill="#F3D7B6" />
      <rect x="20" y="230" width="30" height="45" rx="4" fill="#175443" />
      <ellipse cx="35" cy="222" rx="18" ry="8" fill="#4CA483" />
    </Base>
  );
}

export function OfficeScene() {
  return (
    <Base label="Illustration of a clean, modern office reception">
      <defs>
        <linearGradient id="office-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F6B52" />
          <stop offset="100%" stopColor="#124237" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="#F5F0E4" />
      <Shadow cx="200" cy="305" rx="170" ry="16" />
      <rect x="40" y="178" width="200" height="92" rx="8" fill="url(#office-desk)" />
      <rect x="60" y="158" width="160" height="24" rx="6" fill="#0D332B" />
      <rect x="60" y="200" width="160" height="8" fill="#EEF6F2" opacity="0.2" />
      <rect x="260" y="70" width="110" height="230" fill="#D7EBE1" />
      <rect x="275" y="90" width="80" height="55" fill="#7FC0A4" opacity="0.6" />
      <rect x="275" y="90" width="80" height="14" fill="#EEF6F2" opacity="0.4" />
      <rect x="275" y="165" width="80" height="55" fill="#7FC0A4" opacity="0.6" />
      <rect x="275" y="165" width="80" height="14" fill="#EEF6F2" opacity="0.4" />
      <rect y="330" width="400" height="70" fill="#EAE1CC" />
      <rect x="20" y="240" width="26" height="40" rx="4" fill="#175443" />
      <ellipse cx="33" cy="232" rx="16" ry="7" fill="#4CA483" />
    </Base>
  );
}

export function TeamScene() {
  return (
    <Base label="Abstract illustration representing the Cova Pro Clean team">
      <defs>
        <radialGradient id="team-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#F3D7B6" />
          <stop offset="100%" stopColor="#EAE1CC" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#team-glow)" />
      <Shadow cx="200" cy="330" rx="140" ry="18" />
      <circle cx="140" cy="180" r="60" fill="#7FC0A4" opacity="0.85" />
      <circle cx="250" cy="150" r="70" fill="#175443" opacity="0.9" />
      <circle cx="200" cy="260" r="50" fill="#DD6E49" opacity="0.9" />
      <circle cx="150" cy="150" r="24" fill="#FBF9F4" />
      <circle cx="255" cy="120" r="24" fill="#FBF9F4" />
      <circle cx="205" cy="230" r="24" fill="#FBF9F4" />
    </Base>
  );
}
