import { useTheme, type BackgroundStyle } from '~/lib/theme-store'

export function BackgroundEffects() {
  const { settings } = useTheme()
  
  return <BackgroundRenderer style={settings.background} />
}

function BackgroundRenderer({ style }: { style: BackgroundStyle }) {
  switch (style) {
    case 'gradient':
      return <GradientBackground />
    case 'mesh':
      return <MeshBackground />
    case 'dots':
      return <DotsBackground />
    case 'grid':
      return <GridBackground />
    case 'aurora':
      return <AuroraBackground />
    case 'none':
    default:
      return null
  }
}

// Keyframe animations defined in a style tag to keep them scoped
const AnimationStyles = () => (
  <style>{`
    @keyframes bg-float-1 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(80px, 50px); }
    }
    @keyframes bg-float-2 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-60px, 70px); }
    }
    @keyframes bg-float-3 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(70px, -40px); }
    }
    @keyframes bg-drift {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(30px, 15px); }
      50% { transform: translate(0, 30px); }
      75% { transform: translate(-30px, 15px); }
    }
    @keyframes bg-aurora {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes bg-glow {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.45; }
    }
  `}</style>
)

/**
 * Gradient orbs with gentle floating animation
 */
function GradientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimationStyles />
      
      {/* Primary large orb - top left */}
      <div 
        className="absolute -top-[200px] -left-[200px] w-[800px] h-[800px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, oklch(0.6 0.2 var(--accent-hue) / 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'bg-float-1 15s ease-in-out infinite',
        }}
      />
      
      {/* Secondary orb - top right */}
      <div 
        className="absolute top-[20%] -right-[150px] w-[600px] h-[600px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.18 calc(var(--accent-hue) + 40) / 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'bg-float-2 18s ease-in-out infinite',
        }}
      />
      
      {/* Middle accent orb */}
      <div 
        className="absolute top-[50%] left-[10%] w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.22 calc(var(--accent-hue) - 30) / 0.45) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'bg-float-3 20s ease-in-out infinite',
        }}
      />
      
      {/* Bottom gradient fade for footer distinction */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: 'linear-gradient(to top, oklch(0.1 0.02 var(--accent-hue) / 0.5) 0%, transparent 100%)',
        }}
      />
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

/**
 * Mesh gradient with gentle drift animation
 */
function MeshBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimationStyles />
      
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 40% 20%, oklch(0.6 0.2 var(--accent-hue) / 0.25) 0px, transparent 50%),
            radial-gradient(at 80% 0%, oklch(0.65 0.18 calc(var(--accent-hue) + 60) / 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 50%, oklch(0.55 0.22 calc(var(--accent-hue) - 40) / 0.18) 0px, transparent 50%),
            radial-gradient(at 80% 50%, oklch(0.6 0.2 var(--accent-hue) / 0.18) 0px, transparent 50%),
            radial-gradient(at 0% 100%, oklch(0.65 0.18 calc(var(--accent-hue) + 30) / 0.2) 0px, transparent 50%),
            radial-gradient(at 80% 100%, oklch(0.55 0.2 calc(var(--accent-hue) - 20) / 0.15) 0px, transparent 50%)
          `,
          animation: 'bg-drift 20s ease-in-out infinite',
        }}
      />
      
      {/* Bottom gradient fade for footer distinction */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: 'linear-gradient(to top, oklch(0.1 0.02 var(--accent-hue) / 0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

/**
 * Subtle dotted pattern background (static pattern, no animation needed)
 */
function DotsBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(oklch(0.6 0.15 var(--accent-hue) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center top, transparent 0%, oklch(0.12 0.01 var(--accent-hue) / 0.3) 100%)',
        }}
      />
      
      {/* Floating accent glow */}
      <AnimationStyles />
      <div 
        className="absolute top-[10%] right-[20%] w-[600px] h-[600px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, oklch(0.6 0.2 var(--accent-hue) / 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'bg-float-1 16s ease-in-out infinite',
        }}
      />
      
      {/* Bottom gradient fade for footer distinction */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: 'linear-gradient(to top, oklch(0.1 0.02 var(--accent-hue) / 0.5) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

/**
 * Subtle grid lines background with accent glow
 */
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimationStyles />
      
      <div 
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.6 0.1 var(--accent-hue) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.6 0.1 var(--accent-hue) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
      
      {/* Accent glow at top with subtle animation */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center top, oklch(0.6 0.2 var(--accent-hue) / 0.35) 0%, transparent 70%)',
          animation: 'bg-glow 6s ease-in-out infinite',
        }}
      />
      
      {/* Bottom gradient fade for footer distinction */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: 'linear-gradient(to top, oklch(0.08 0.02 var(--accent-hue) / 0.7) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

/**
 * Subtle aurora effect with smooth color animation
 */
function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimationStyles />
      
      {/* Aurora layers with animated gradient position */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            linear-gradient(
              125deg,
              transparent 0%,
              oklch(0.6 0.2 var(--accent-hue) / 0.25) 20%,
              transparent 40%,
              oklch(0.65 0.18 calc(var(--accent-hue) + 50) / 0.2) 60%,
              transparent 80%,
              oklch(0.55 0.22 calc(var(--accent-hue) - 30) / 0.18) 100%
            )
          `,
          backgroundSize: '200% 200%',
          animation: 'bg-aurora 12s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            linear-gradient(
              -45deg,
              transparent 0%,
              oklch(0.55 0.18 calc(var(--accent-hue) + 30) / 0.2) 25%,
              transparent 50%,
              oklch(0.6 0.2 var(--accent-hue) / 0.18) 75%,
              transparent 100%
            )
          `,
          backgroundSize: '200% 200%',
          animation: 'bg-aurora 15s ease-in-out infinite reverse',
        }}
      />
      
      {/* Glow spots with noticeable pulse */}
      <div 
        className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.6 0.2 var(--accent-hue) / 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'bg-glow 5s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute top-[40%] right-[15%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.18 calc(var(--accent-hue) + 40) / 0.25) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'bg-glow 6s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />
      
      {/* Bottom gradient fade for footer distinction */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[400px]"
        style={{
          background: 'linear-gradient(to top, oklch(0.1 0.02 var(--accent-hue) / 0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
