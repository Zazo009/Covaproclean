/**
 * Hand-built brand illustration — a stylised Costa del Sol skyline at golden
 * hour (terracotta rooftops, a palm, gentle sea). Used in place of generic
 * stock photography so the hero reads as distinctly "Cova Pro Clean" rather
 * than an interchangeable cleaning-company template.
 */
export function CostaSkyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      role="img"
      aria-label="Illustration of a Costa del Sol coastal skyline at golden hour"
    >
      <defs>
        <linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E3C8" />
          <stop offset="55%" stopColor="#F3D7B6" />
          <stop offset="100%" stopColor="#E9B98C" />
        </linearGradient>
        <linearGradient id="cs-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FC0A4" />
          <stop offset="100%" stopColor="#175443" />
        </linearGradient>
        <radialGradient id="cs-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF3DC" />
          <stop offset="100%" stopColor="#E98A6B" />
        </radialGradient>
        <linearGradient id="cs-roof-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DD6E49" />
          <stop offset="100%" stopColor="#C2573A" />
        </linearGradient>
      </defs>

      <rect width="640" height="300" fill="url(#cs-sky)" />
      <circle id="cs-sun-disc" cx="480" cy="130" r="58" fill="url(#cs-sun)" opacity="0.9" />

      <rect y="260" width="640" height="220" fill="url(#cs-sea)" />
      <g opacity="0.35" stroke="#EEF6F2" strokeWidth="3" fill="none" strokeLinecap="round">
        <path id="cs-wave-1" d="M0 300 q 40 -10 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" />
        <path id="cs-wave-2" d="M0 330 q 40 10 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0 t 80 0" opacity="0.6" />
      </g>

      {/* Rooftop skyline */}
      <g>
        <rect x="40" y="200" width="70" height="90" fill="#FBF9F4" />
        <polygon points="35,200 115,200 75,170" fill="url(#cs-roof-1)" />
        <rect x="120" y="230" width="55" height="60" fill="#F5F0E4" />
        <polygon points="116,230 179,230 147,208" fill="#175443" />
        <rect x="185" y="180" width="80" height="110" fill="#FBF9F4" />
        <polygon points="180,180 270,180 225,145" fill="url(#cs-roof-1)" />
        <rect x="275" y="215" width="60" height="75" fill="#F5F0E4" />
        <polygon points="270,215 340,215 305,190" fill="#124237" />
        <rect x="345" y="195" width="70" height="95" fill="#FBF9F4" />
        <polygon points="340,195 420,195 380,163" fill="url(#cs-roof-1)" />
        <rect x="425" y="235" width="50" height="55" fill="#F5F0E4" />
        <polygon points="421,235 479,235 450,213" fill="#175443" />
        <rect x="0" y="245" width="45" height="45" fill="#F5F0E4" />
      </g>

      {/* Palm */}
      <g stroke="#124237" strokeWidth="6" strokeLinecap="round">
        <path d="M540 290 C 536 250 546 210 560 180" fill="none" />
      </g>
      <g fill="#1F6B52">
        <path d="M560 180 C 520 165 500 140 495 120 C 525 130 550 150 562 172 Z" />
        <path d="M560 180 C 600 160 625 135 632 112 C 600 128 572 150 558 172 Z" />
        <path d="M560 180 C 545 145 545 115 555 90 C 572 115 575 148 566 176 Z" />
        <path d="M560 180 C 575 148 598 128 620 122 C 610 148 588 168 566 178 Z" />
        <path d="M560 180 C 530 175 505 165 488 148 C 512 145 542 155 562 174 Z" />
      </g>

      <style>{`
        #cs-sun-disc { transform-origin: 480px 130px; animation: cs-pulse 6s ease-in-out infinite; }
        #cs-wave-1 { animation: cs-drift 9s linear infinite; }
        #cs-wave-2 { animation: cs-drift 13s linear infinite reverse; }
        @keyframes cs-pulse { 0%, 100% { opacity: 0.85; } 50% { opacity: 1; } }
        @keyframes cs-drift { from { transform: translateX(0); } to { transform: translateX(-80px); } }
        @media (prefers-reduced-motion: reduce) {
          #cs-sun-disc, #cs-wave-1, #cs-wave-2 { animation: none; }
        }
      `}</style>
    </svg>
  );
}
