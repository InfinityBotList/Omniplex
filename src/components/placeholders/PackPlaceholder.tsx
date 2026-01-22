interface PlaceholderProps {
  className?: string
  size?: number | string
}

/**
 * Pack icon placeholder representing a collection/bundle
 * Features stacked items and grid pattern
 */
export function PackPlaceholder({ className = '', size = 64 }: PlaceholderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pack placeholder"
    >
      {/* Background */}
      <rect width="64" height="64" rx="12" className="fill-muted" />
      
      {/* Stacked layers representing collection */}
      <rect x="12" y="24" width="40" height="32" rx="4" className="fill-muted-foreground/15" />
      <rect x="16" y="20" width="32" height="28" rx="3" className="fill-muted-foreground/20" />
      <rect x="20" y="16" width="24" height="24" rx="2" className="fill-muted-foreground/25" />
      
      {/* Grid of items inside the pack */}
      <circle cx="26" cy="24" r="3" className="fill-primary/50" />
      <circle cx="38" cy="24" r="3" className="fill-accent/50" />
      <circle cx="26" cy="34" r="3" className="fill-accent/40" />
      <circle cx="38" cy="34" r="3" className="fill-primary/40" />
      
      {/* Pack label/badge */}
      <rect x="24" y="46" width="16" height="6" rx="3" className="fill-primary/30" />
      
      {/* Connection lines suggesting bundle */}
      <line x1="26" y1="27" x2="26" y2="31" className="stroke-muted-foreground/20" strokeWidth="1" />
      <line x1="38" y1="27" x2="38" y2="31" className="stroke-muted-foreground/20" strokeWidth="1" />
    </svg>
  )
}

/**
 * Pack banner placeholder - wide format for pack headers
 * Collection/bundle inspired design with stacked cards and connection lines
 */
export function PackBannerPlaceholder({ className = '' }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 200"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Pack banner placeholder"
    >
      {/* Base background */}
      <rect width="600" height="200" className="fill-muted" />
      
      {/* Gradient overlay */}
      <defs>
        <linearGradient id="packBannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="packGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="packGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      <rect width="600" height="200" fill="url(#packBannerGrad)" />
      
      {/* Glowing orbs */}
      <circle cx="150" cy="100" r="120" fill="url(#packGlow1)" />
      <circle cx="450" cy="100" r="140" fill="url(#packGlow2)" />
      <circle cx="300" cy="50" r="80" fill="url(#packGlow1)" />
      
      {/* Connection flow lines - representing bundled bots */}
      <g className="stroke-foreground/[0.06]" strokeWidth="1.5">
        {/* Horizontal flows */}
        <path d="M 0 80 Q 100 80 150 100 T 300 100" />
        <path d="M 300 100 Q 400 100 450 80 T 600 80" />
        <path d="M 0 120 Q 150 140 300 100 T 600 120" />
        
        {/* Vertical connectors */}
        <line x1="150" y1="60" x2="150" y2="140" />
        <line x1="300" y1="40" x2="300" y2="160" />
        <line x1="450" y1="60" x2="450" y2="140" />
      </g>
      
      {/* Stacked cards - representing the pack collection */}
      <g transform="translate(240, 60)" opacity="0.15">
        {/* Back card */}
        <rect x="30" y="10" width="60" height="80" rx="8" className="fill-foreground" />
        {/* Middle card */}
        <rect x="15" y="5" width="60" height="80" rx="8" className="fill-foreground" opacity="0.7" />
        {/* Front card */}
        <rect x="0" y="0" width="60" height="80" rx="8" className="fill-foreground" opacity="0.5" />
        {/* Bot circles on front card */}
        <circle cx="20" cy="25" r="10" className="fill-background" />
        <circle cx="40" cy="25" r="10" className="fill-background" />
        <rect x="10" y="45" width="40" height="6" rx="3" className="fill-background" />
        <rect x="10" y="55" width="30" height="4" rx="2" className="fill-background" />
      </g>
      
      {/* Node dots at connection points */}
      <circle cx="150" cy="100" r="6" className="fill-accent/40" />
      <circle cx="300" cy="100" r="8" className="fill-accent/50" />
      <circle cx="450" cy="100" r="6" className="fill-primary/40" />
      <circle cx="150" cy="60" r="4" className="fill-accent/30" />
      <circle cx="150" cy="140" r="4" className="fill-accent/30" />
      <circle cx="300" cy="40" r="4" className="fill-accent/25" />
      <circle cx="300" cy="160" r="4" className="fill-accent/25" />
      <circle cx="450" cy="60" r="4" className="fill-primary/30" />
      <circle cx="450" cy="140" r="4" className="fill-primary/30" />
      
      {/* Grid pattern */}
      <pattern id="packGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path 
          d="M 40 0 L 0 0 0 40" 
          fill="none" 
          className="stroke-foreground/[0.02]" 
          strokeWidth="1"
        />
      </pattern>
      <rect width="600" height="200" fill="url(#packGrid)" />
      
      {/* Small floating elements - like bundled items */}
      <g className="fill-accent/15">
        <rect x="60" y="40" width="16" height="16" rx="4" />
        <rect x="520" y="140" width="20" height="20" rx="5" />
        <rect x="100" y="150" width="12" height="12" rx="3" />
        <rect x="480" y="50" width="14" height="14" rx="4" />
      </g>
      
      {/* Decorative dots */}
      <circle cx="40" cy="30" r="3" className="fill-accent/20" />
      <circle cx="560" cy="170" r="4" className="fill-primary/20" />
      <circle cx="200" cy="20" r="2" className="fill-accent/15" />
      <circle cx="400" cy="180" r="2" className="fill-primary/15" />
    </svg>
  )
}
