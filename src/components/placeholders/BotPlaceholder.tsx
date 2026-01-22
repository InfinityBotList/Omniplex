interface PlaceholderProps {
  className?: string
  size?: number | string
}

/**
 * Bot avatar placeholder with robot/bot icon
 * Features antenna and electronic styling
 */
export function BotPlaceholder({ className = '', size = 64 }: PlaceholderProps) {
  const sizeNum = typeof size === 'string' ? parseInt(size) : size
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bot placeholder"
    >
      {/* Background */}
      <rect width="64" height="64" rx="12" className="fill-muted" />
      
      {/* Antenna */}
      <rect x="30" y="6" width="4" height="10" rx="2" className="fill-muted-foreground/40" />
      <circle cx="32" cy="6" r="3" className="fill-primary/60" />
      
      {/* Head/Face area */}
      <rect x="16" y="18" width="32" height="28" rx="6" className="fill-muted-foreground/20" />
      
      {/* Eyes */}
      <circle cx="24" cy="30" r="4" className="fill-primary/50" />
      <circle cx="40" cy="30" r="4" className="fill-primary/50" />
      
      {/* Eye highlights */}
      <circle cx="25" cy="29" r="1.5" className="fill-white/60" />
      <circle cx="41" cy="29" r="1.5" className="fill-white/60" />
      
      {/* Mouth */}
      <rect x="24" y="38" width="16" height="4" rx="2" className="fill-muted-foreground/30" />
      
      {/* Side details */}
      <rect x="12" y="26" width="4" height="12" rx="2" className="fill-muted-foreground/20" />
      <rect x="48" y="26" width="4" height="12" rx="2" className="fill-muted-foreground/20" />
      
      {/* Bottom indicator */}
      <rect x="26" y="50" width="12" height="6" rx="2" className="fill-primary/30" />
    </svg>
  )
}

/**
 * Bot banner placeholder - wide format for profile banners
 * Abstract tech/circuit-inspired design
 */
export function BotBannerPlaceholder({ className = '' }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 200"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bot banner placeholder"
    >
      {/* Base background */}
      <rect width="600" height="200" className="fill-muted" />
      
      {/* Gradient overlay */}
      <defs>
        <linearGradient id="botBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="botGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="botGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <rect width="600" height="200" fill="url(#botBannerGrad)" />
      
      {/* Glowing orbs */}
      <circle cx="120" cy="100" r="100" fill="url(#botGlow1)" />
      <circle cx="480" cy="80" r="140" fill="url(#botGlow2)" />
      <circle cx="300" cy="160" r="60" fill="url(#botGlow1)" />
      
      {/* Circuit-like lines */}
      <g className="stroke-foreground/[0.06]" strokeWidth="1">
        <line x1="0" y1="50" x2="200" y2="50" />
        <line x1="180" y1="50" x2="180" y2="100" />
        <line x1="180" y1="100" x2="300" y2="100" />
        <line x1="400" y1="150" x2="600" y2="150" />
        <line x1="420" y1="100" x2="420" y2="150" />
        <line x1="300" y1="100" x2="420" y2="100" />
        <line x1="100" y1="0" x2="100" y2="80" />
        <line x1="500" y1="120" x2="500" y2="200" />
      </g>
      
      {/* Circuit nodes */}
      <circle cx="180" cy="50" r="4" className="fill-primary/30" />
      <circle cx="180" cy="100" r="4" className="fill-primary/30" />
      <circle cx="300" cy="100" r="6" className="fill-primary/40" />
      <circle cx="420" cy="100" r="4" className="fill-accent/30" />
      <circle cx="420" cy="150" r="4" className="fill-accent/30" />
      <circle cx="100" cy="80" r="3" className="fill-primary/25" />
      <circle cx="500" cy="120" r="3" className="fill-accent/25" />
      
      {/* Bot icon silhouette in center */}
      <g transform="translate(270, 60)" opacity="0.1">
        <rect x="10" y="0" width="40" height="6" rx="3" className="fill-foreground" />
        <circle cx="30" cy="-4" r="6" className="fill-foreground" />
        <rect x="0" y="8" width="60" height="50" rx="8" className="fill-foreground" />
        <circle cx="18" cy="28" r="8" className="fill-background" />
        <circle cx="42" cy="28" r="8" className="fill-background" />
        <rect x="15" y="44" width="30" height="4" rx="2" className="fill-background" />
      </g>
      
      {/* Grid pattern */}
      <pattern id="botGrid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path 
          d="M 30 0 L 0 0 0 30" 
          fill="none" 
          className="stroke-foreground/[0.02]" 
          strokeWidth="1"
        />
      </pattern>
      <rect width="600" height="200" fill="url(#botGrid)" />
      
      {/* Decorative dots */}
      <circle cx="50" cy="30" r="3" className="fill-primary/20" />
      <circle cx="550" cy="170" r="4" className="fill-accent/20" />
      <circle cx="250" cy="20" r="2" className="fill-primary/15" />
      <circle cx="450" cy="40" r="2" className="fill-accent/15" />
    </svg>
  )
}
