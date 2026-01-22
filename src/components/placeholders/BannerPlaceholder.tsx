interface PlaceholderProps {
  className?: string
}

/**
 * Banner placeholder for wide banner images
 * Features abstract gradient shapes
 */
export function BannerPlaceholder({ className = '' }: PlaceholderProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 200"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Banner placeholder"
    >
      {/* Base background */}
      <rect width="600" height="200" className="fill-muted" />
      
      {/* Gradient overlay using CSS variables */}
      <defs>
        <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="circleGrad1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="circleGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Gradient layer */}
      <rect width="600" height="200" fill="url(#bannerGrad)" />
      
      {/* Abstract shapes */}
      <circle cx="100" cy="100" r="120" fill="url(#circleGrad1)" />
      <circle cx="500" cy="80" r="160" fill="url(#circleGrad2)" />
      <circle cx="300" cy="180" r="80" fill="url(#circleGrad1)" />
      
      {/* Subtle grid pattern */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path 
          d="M 40 0 L 0 0 0 40" 
          fill="none" 
          className="stroke-foreground/[0.03]" 
          strokeWidth="1"
        />
      </pattern>
      <rect width="600" height="200" fill="url(#grid)" />
      
      {/* Decorative elements */}
      <circle cx="80" cy="40" r="4" className="fill-primary/20" />
      <circle cx="520" cy="160" r="6" className="fill-accent/20" />
      <circle cx="300" cy="30" r="3" className="fill-primary/15" />
      
      {/* Curved lines for depth */}
      <path
        d="M0 150 Q150 100 300 140 T600 120"
        className="stroke-foreground/[0.05]"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0 180 Q200 140 400 170 T600 150"
        className="stroke-foreground/[0.03]"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
