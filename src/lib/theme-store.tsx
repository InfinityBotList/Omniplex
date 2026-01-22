import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Types for theme settings
export type ThemeMode = 'light' | 'dark' | 'system'
export type AccentColor = 'violet' | 'blue' | 'cyan' | 'teal' | 'green' | 'orange' | 'pink' | 'rose'
export type FontFamily = 'inter' | 'geist' | 'system' | 'mono'
export type BackgroundStyle = 'none' | 'gradient' | 'mesh' | 'dots' | 'grid' | 'aurora'

export interface ThemeSettings {
  mode: ThemeMode
  accent: AccentColor
  font: FontFamily
  background: BackgroundStyle
  animations: boolean
  glassmorphism: boolean
  reducedMotion: boolean
}

const defaultSettings: ThemeSettings = {
  mode: 'system',
  accent: 'violet',
  font: 'inter',
  background: 'aurora',
  animations: true,
  glassmorphism: true,
  reducedMotion: false,
}

interface ThemeContextValue {
  settings: ThemeSettings
  actualTheme: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: AccentColor) => void
  setFont: (font: FontFamily) => void
  setBackground: (background: BackgroundStyle) => void
  toggleAnimations: () => void
  toggleGlassmorphism: () => void
  resetSettings: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'omniplex-theme-settings'

// Accent color definitions using OKLCH
export const accentColors: Record<AccentColor, { hue: number; name: string; preview: string }> = {
  violet: { hue: 265, name: 'Violet', preview: 'oklch(0.65 0.25 265)' },
  blue: { hue: 230, name: 'Blue', preview: 'oklch(0.65 0.22 230)' },
  cyan: { hue: 195, name: 'Cyan', preview: 'oklch(0.7 0.15 195)' },
  teal: { hue: 175, name: 'Teal', preview: 'oklch(0.65 0.15 175)' },
  green: { hue: 145, name: 'Green', preview: 'oklch(0.65 0.2 145)' },
  orange: { hue: 40, name: 'Orange', preview: 'oklch(0.7 0.2 40)' },
  pink: { hue: 330, name: 'Pink', preview: 'oklch(0.7 0.22 330)' },
  rose: { hue: 350, name: 'Rose', preview: 'oklch(0.65 0.22 350)' },
}

// Background style definitions
export const backgroundStyles: Record<BackgroundStyle, { name: string; description: string }> = {
  none: { name: 'None', description: 'Clean, solid background' },
  gradient: { name: 'Gradient', description: 'Subtle gradient orbs' },
  mesh: { name: 'Mesh', description: 'Flowing mesh gradient' },
  dots: { name: 'Dots', description: 'Dotted pattern' },
  grid: { name: 'Grid', description: 'Subtle grid lines' },
  aurora: { name: 'Aurora', description: 'Animated aurora effect' },
}

// Font definitions
export const fontFamilies: Record<FontFamily, { name: string; value: string }> = {
  inter: { name: 'Inter', value: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  geist: { name: 'Geist', value: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
  system: { name: 'System', value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" },
  mono: { name: 'Mono', value: "'JetBrains Mono', 'Fira Code', Consolas, monospace" },
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings)
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark')

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ThemeSettings>
        setSettings(prev => ({ ...prev, ...parsed }))
      }
    } catch (e) {
      console.error('Failed to load theme settings:', e)
    }

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motionQuery.matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true, animations: false }))
    }
  }, [])

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (e) {
      console.error('Failed to save theme settings:', e)
    }
  }, [settings])

  // Handle system theme preference and actual theme
  useEffect(() => {
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateActualTheme = () => {
      if (settings.mode === 'system') {
        setActualTheme(darkQuery.matches ? 'dark' : 'light')
      } else {
        setActualTheme(settings.mode)
      }
    }

    updateActualTheme()
    darkQuery.addEventListener('change', updateActualTheme)
    return () => darkQuery.removeEventListener('change', updateActualTheme)
  }, [settings.mode])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    
    // Apply dark/light mode
    root.classList.toggle('dark', actualTheme === 'dark')

    // Apply accent color
    const accentHue = accentColors[settings.accent].hue
    root.style.setProperty('--accent-hue', String(accentHue))
    
    // Apply accent color variables
    root.style.setProperty('--brand-primary', `oklch(0.65 0.25 ${accentHue})`)
    root.style.setProperty('--primary', actualTheme === 'dark' 
      ? `oklch(0.7 0.22 ${accentHue})` 
      : `oklch(0.55 0.25 ${accentHue})`)
    root.style.setProperty('--ring', actualTheme === 'dark'
      ? `oklch(0.7 0.22 ${accentHue} / 0.5)`
      : `oklch(0.55 0.25 ${accentHue} / 0.5)`)
    
    // Update gradient
    root.style.setProperty('--gradient-brand', 
      `linear-gradient(135deg, oklch(0.6 0.25 ${accentHue}) 0%, oklch(0.65 0.22 ${accentHue + 25}) 50%, oklch(0.7 0.2 ${accentHue + 65}) 100%)`)

    // Apply font
    root.style.setProperty('--font-family', fontFamilies[settings.font].value)
    document.body.style.fontFamily = fontFamilies[settings.font].value

    // Apply animation toggle
    root.classList.toggle('no-animations', !settings.animations || settings.reducedMotion)

    // Apply glassmorphism toggle
    root.classList.toggle('no-glass', !settings.glassmorphism)

  }, [actualTheme, settings.accent, settings.font, settings.animations, settings.glassmorphism, settings.reducedMotion])

  const setMode = (mode: ThemeMode) => setSettings(prev => ({ ...prev, mode }))
  const setAccent = (accent: AccentColor) => setSettings(prev => ({ ...prev, accent }))
  const setFont = (font: FontFamily) => setSettings(prev => ({ ...prev, font }))
  const setBackground = (background: BackgroundStyle) => setSettings(prev => ({ ...prev, background }))
  const toggleAnimations = () => setSettings(prev => ({ ...prev, animations: !prev.animations }))
  const toggleGlassmorphism = () => setSettings(prev => ({ ...prev, glassmorphism: !prev.glassmorphism }))
  const resetSettings = () => setSettings(defaultSettings)

  return (
    <ThemeContext.Provider value={{
      settings,
      actualTheme,
      setMode,
      setAccent,
      setFont,
      setBackground,
      toggleAnimations,
      toggleGlassmorphism,
      resetSettings,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
