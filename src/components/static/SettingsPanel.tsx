import * as Dialog from '@radix-ui/react-dialog'
import { 
  useTheme, 
  accentColors, 
  fontFamilies,
  backgroundStyles,
  type ThemeMode, 
  type AccentColor, 
  type FontFamily,
  type BackgroundStyle
} from '~/lib/theme-store'

export function SettingsPanel() {
  const { 
    settings, 
    actualTheme,
    setMode, 
    setAccent, 
    setFont,
    setBackground,
    toggleAnimations, 
    toggleGlassmorphism,
    resetSettings 
  } = useTheme()

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="p-2 rounded-lg glass hover:scale-105 transition-all duration-200"
          aria-label="Open settings"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md glass border-l border-border z-50 overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Dialog.Title className="text-xl font-bold text-foreground">
                  Customize
                </Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mt-1">
                  Personalize your experience
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Close">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>

            {/* Theme Mode Section */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Appearance
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setMode(mode)}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      settings.mode === mode 
                        ? 'border-primary bg-primary/10 text-foreground' 
                        : 'border-border hover:border-primary/30 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {mode === 'light' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      {mode === 'dark' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                      {mode === 'system' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      <span className="text-xs font-medium capitalize">{mode}</span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Currently using: <span className="text-foreground capitalize">{actualTheme}</span>
              </p>
            </section>

            {/* Accent Color Section */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Accent Color
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(accentColors) as AccentColor[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccent(color)}
                    className={`group relative p-1 rounded-xl transition-all duration-200 ${
                      settings.accent === color 
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'hover:scale-105'
                    }`}
                    title={accentColors[color].name}
                  >
                    <div 
                      className="w-full aspect-square rounded-lg"
                      style={{ background: accentColors[color].preview }}
                    />
                    <span className="absolute inset-x-0 -bottom-5 text-[10px] text-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {accentColors[color].name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Font Section */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
                Font
              </h3>
              <div className="space-y-2">
                {(Object.keys(fontFamilies) as FontFamily[]).map((font) => (
                  <button
                    key={font}
                    onClick={() => setFont(font)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-200 ${
                      settings.font === font 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/30'
                    }`}
                    style={{ fontFamily: fontFamilies[font].value }}
                  >
                    <span className="text-foreground font-medium">{fontFamilies[font].name}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      The quick brown fox jumps over the lazy dog
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Effects Section */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Effects
              </h3>
              <div className="space-y-3">
                {/* Animations Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <div>
                    <span className="text-foreground font-medium">Animations</span>
                    <span className="block text-xs text-muted-foreground">Smooth transitions and effects</span>
                  </div>
                  <button
                    onClick={toggleAnimations}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                      settings.animations ? 'bg-primary' : 'bg-muted'
                    }`}
                    aria-label="Toggle animations"
                  >
                    <span 
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        settings.animations ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>

                {/* Glassmorphism Toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl border border-border">
                  <div>
                    <span className="text-foreground font-medium">Glassmorphism</span>
                    <span className="block text-xs text-muted-foreground">Frosted glass effects</span>
                  </div>
                  <button
                    onClick={toggleGlassmorphism}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                      settings.glassmorphism ? 'bg-primary' : 'bg-muted'
                    }`}
                    aria-label="Toggle glassmorphism"
                  >
                    <span 
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        settings.glassmorphism ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Background Style Section */}
            <section className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Background
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(backgroundStyles) as BackgroundStyle[]).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBackground(bg)}
                    className={`group relative p-3 rounded-xl border transition-all duration-200 ${
                      settings.background === bg 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <BackgroundPreview style={bg} />
                      <span className="text-xs font-medium text-foreground">
                        {backgroundStyles[bg].name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {backgroundStyles[settings.background].description}
              </p>
            </section>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className="w-full p-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset to defaults
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// Mini preview icons for background styles
function BackgroundPreview({ style }: { style: BackgroundStyle }) {
  const baseClass = "w-8 h-8 rounded-lg overflow-hidden bg-muted"
  
  switch (style) {
    case 'none':
      return (
        <div className={baseClass}>
          <div className="w-full h-full bg-background border border-border" />
        </div>
      )
    case 'gradient':
      return (
        <div className={baseClass}>
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, oklch(0.6 0.2 var(--accent-hue) / 0.5) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, oklch(0.65 0.18 calc(var(--accent-hue) + 40) / 0.4) 0%, transparent 50%),
                var(--background)
              `
            }}
          />
        </div>
      )
    case 'mesh':
      return (
        <div className={baseClass}>
          <div 
            className="w-full h-full"
            style={{
              background: `
                radial-gradient(at 30% 20%, oklch(0.6 0.2 var(--accent-hue) / 0.4) 0px, transparent 50%),
                radial-gradient(at 70% 80%, oklch(0.65 0.18 calc(var(--accent-hue) + 60) / 0.3) 0px, transparent 50%),
                var(--background)
              `
            }}
          />
        </div>
      )
    case 'dots':
      return (
        <div className={baseClass}>
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(oklch(0.6 0.15 var(--accent-hue) / 0.5) 1px, var(--background) 1px)`,
              backgroundSize: '4px 4px',
            }}
          />
        </div>
      )
    case 'grid':
      return (
        <div className={baseClass}>
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(oklch(0.6 0.1 var(--accent-hue) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, oklch(0.6 0.1 var(--accent-hue) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '8px 8px',
              backgroundColor: 'var(--background)',
            }}
          />
        </div>
      )
    case 'aurora':
      return (
        <div className={baseClass}>
          <div 
            className="w-full h-full"
            style={{
              background: `
                linear-gradient(125deg, 
                  transparent 0%, 
                  oklch(0.6 0.2 var(--accent-hue) / 0.4) 30%, 
                  oklch(0.65 0.18 calc(var(--accent-hue) + 50) / 0.3) 60%, 
                  transparent 100%
                ),
                var(--background)
              `
            }}
          />
        </div>
      )
    default:
      return <div className={baseClass} />
  }
}

// Simple toggle for quick theme switching (light/dark only)
export function QuickThemeToggle() {
  const { actualTheme, setMode } = useTheme()

  return (
    <button
      onClick={() => setMode(actualTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg glass hover:scale-105 transition-all duration-200"
      aria-label={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {actualTheme === 'dark' ? (
        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}
