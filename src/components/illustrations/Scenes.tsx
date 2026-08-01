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
      </defs>
      <rect width="400" height="400" fill="url(#sc-sky)" />
      {children}
    </svg>
  );
}

export function VillaScene() {
  return (
    <Base label="Illustration of a whitewashed villa with a terracotta roof and palm tree">
      <rect y="260" width="400" height="140" fill="#D7EBE1" />
      <rect x="90" y="150" width="220" height="130" fill="#FBF9F4" />
      <polygon points="80,150 320,150 200,90" fill="#DD6E49" />
      <rect x="150" y="200" width="40" height="80" fill="#175443" />
      <rect x="220" y="190" width="35" height="35" fill="#7FC0A4" opacity="0.7" />
      <rect x="270" y="190" width="35" height="35" fill="#7FC0A4" opacity="0.7" />
      <ellipse cx="200" cy="330" rx="90" ry="18" fill="#7FC0A4" opacity="0.5" />
      <g stroke="#124237" strokeWidth="6" strokeLinecap="round">
        <path d="M330 300 C 326 260 336 220 350 190" fill="none" />
      </g>
      <g fill="#1F6B52">
        <path d="M350 190 C 320 178 305 158 300 140 C 322 148 342 165 352 182 Z" />
        <path d="M350 190 C 380 175 398 155 404 135 C 380 148 358 165 348 182 Z" />
        <path d="M350 190 C 340 160 342 135 350 115 C 364 135 366 162 358 186 Z" />
      </g>
    </Base>
  );
}

export function InteriorScene() {
  return (
    <Base label="Illustration of a bright, tidy living room">
      <rect y="0" width="400" height="400" fill="#FBF9F4" />
      <rect x="30" y="60" width="150" height="110" fill="#F5F0E4" />
      <rect x="45" y="75" width="120" height="80" fill="#D7EBE1" />
      <rect x="0" y="230" width="240" height="90" rx="16" fill="#7FC0A4" />
      <rect x="0" y="220" width="60" height="40" rx="10" fill="#4CA483" />
      <rect x="180" y="220" width="60" height="40" rx="10" fill="#4CA483" />
      <rect x="250" y="150" width="16" height="170" fill="#DD6E49" />
      <ellipse cx="258" cy="145" rx="34" ry="14" fill="#E9B98C" />
      <rect x="0" y="320" width="400" height="80" fill="#EAE1CC" />
    </Base>
  );
}

export function CoastScene() {
  return (
    <Base label="Illustration of the Costa del Sol coastline">
      <rect width="400" height="230" fill="#F3D7B6" />
      <circle cx="320" cy="100" r="40" fill="#E98A6B" opacity="0.9" />
      <rect y="210" width="400" height="190" fill="#7FC0A4" />
      <rect y="260" width="400" height="140" fill="#175443" />
      <path d="M0 220 q 30 -12 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0" fill="none" stroke="#EEF6F2" strokeWidth="4" opacity="0.5" />
      <path d="M0 200 L 0 400 L 400 400 L 400 240 Q 300 200 200 260 Q 100 320 0 260 Z" fill="#F5E3C8" opacity="0.9" />
    </Base>
  );
}

export function BedroomScene() {
  return (
    <Base label="Illustration of a neatly made guest bedroom">
      <rect width="400" height="400" fill="#FBF9F4" />
      <rect x="50" y="150" width="300" height="140" rx="10" fill="#F5F0E4" />
      <rect x="50" y="150" width="300" height="30" rx="10" fill="#D7EBE1" />
      <rect x="70" y="120" width="60" height="50" rx="8" fill="#FFFFFF" stroke="#EAE1CC" strokeWidth="3" />
      <rect x="270" y="120" width="60" height="50" rx="8" fill="#FFFFFF" stroke="#EAE1CC" strokeWidth="3" />
      <rect x="0" y="290" width="400" height="110" fill="#EAE1CC" />
      <circle cx="330" cy="70" r="26" fill="#E9B98C" />
    </Base>
  );
}

export function OfficeScene() {
  return (
    <Base label="Illustration of a clean, modern office reception">
      <rect width="400" height="400" fill="#F5F0E4" />
      <rect x="40" y="180" width="200" height="90" rx="8" fill="#175443" />
      <rect x="60" y="160" width="160" height="24" rx="6" fill="#0D332B" />
      <rect x="260" y="80" width="110" height="220" fill="#D7EBE1" />
      <rect x="275" y="100" width="80" height="60" fill="#7FC0A4" opacity="0.6" />
      <rect x="275" y="180" width="80" height="60" fill="#7FC0A4" opacity="0.6" />
      <rect y="330" width="400" height="70" fill="#EAE1CC" />
    </Base>
  );
}

export function TeamScene() {
  return (
    <Base label="Abstract illustration representing the Cova Pro Clean team">
      <circle cx="140" cy="180" r="60" fill="#7FC0A4" opacity="0.8" />
      <circle cx="250" cy="150" r="70" fill="#175443" opacity="0.85" />
      <circle cx="200" cy="260" r="50" fill="#DD6E49" opacity="0.85" />
      <circle cx="150" cy="150" r="24" fill="#FBF9F4" />
      <circle cx="255" cy="120" r="24" fill="#FBF9F4" />
      <circle cx="205" cy="230" r="24" fill="#FBF9F4" />
    </Base>
  );
}
