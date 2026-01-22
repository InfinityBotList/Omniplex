interface PlaceholderProps {
  className?: string
  size?: number | string
}

/**
 * Server icon placeholder with Discord-style guild representation
 * Features layered rectangles suggesting a community/server
 */
export function ServerPlaceholder({ className = '', size = 64 }: PlaceholderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Server placeholder"
    >
      {/* Background - rounded square like Discord servers */}
      <rect width="64" height="64" rx="16" className="fill-muted" />
      
      {/* Server building/community icon */}
      <path
        d="M16 20h32v28a4 4 0 01-4 4H20a4 4 0 01-4-4V20z"
        className="fill-muted-foreground/15"
      />
      
      {/* Roof/header */}
      <path
        d="M12 20l20-8 20 8H12z"
        className="fill-primary/30"
      />
      
      {/* Windows/rooms - representing channels */}
      <rect x="20" y="26" width="8" height="8" rx="1" className="fill-muted-foreground/30" />
      <rect x="36" y="26" width="8" height="8" rx="1" className="fill-muted-foreground/30" />
      <rect x="20" y="38" width="8" height="8" rx="1" className="fill-muted-foreground/30" />
      <rect x="36" y="38" width="8" height="8" rx="1" className="fill-muted-foreground/30" />
      
      {/* Door - entrance */}
      <rect x="28" y="40" width="8" height="12" rx="1" className="fill-primary/40" />
      
      {/* People indicators */}
      <circle cx="24" cy="30" r="2" className="fill-primary/50" />
      <circle cx="40" cy="30" r="2" className="fill-accent/50" />
      <circle cx="24" cy="42" r="2" className="fill-accent/50" />
      <circle cx="40" cy="42" r="2" className="fill-primary/50" />
    </svg>
  )
}
