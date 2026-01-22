# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-22

### 🎉 Initial Release

#### Added
- **Search System** - Full-text search across bots, servers, and packs
  - Integration with Omniplex API (`POST /list/search`)
  - Support for multiple target types in single query
  - Results display with avatars, names, and descriptions
  - Desktop and mobile search interfaces
  - Real-time search with React Query caching (5-minute stale time)
- **Animated Backgrounds** - 6 customizable background effect styles
  - **Gradient**: Animated floating orbs with smooth translate animations
  - **Mesh**: Flowing gradient mesh patterns with position shifting
  - **Dots**: Dot pattern grid with floating glow effects
  - **Grid**: CSS grid lines with pulsing glow at top
  - **Aurora**: Animated aurora borealis effect (default style)
  - **None**: No background effects
  - All animations use translate/opacity for optimal performance (no layout shifts)
  - Smooth transitions with 12-35 second animation cycles
  - Uses OKLCH color space with dynamic `--accent-hue` variable
- **Settings Panel** - Customizable user preferences
  - Background style selector with visual 8x8px previews
  - Quick access to settings from header
  - Persistent theme state via React Context
- **Professional Logging System**
  - Secure logging that never leaks sensitive data
  - Automatic data sanitization for: passwords, tokens, secrets, API keys, authorization headers, cookies, sessions, credit cards, SSNs
  - Logger class with methods: `log()`, `info()`, `warn()`, `error()`, `debug()`, `group()`, `groupEnd()`
  - ASCII art welcome banner with security warning (Discord-style)
  - Initialization info display with grouped console output
  - Color-coded HTTP method logging (GET=cyan, POST=green, PUT=orange, PATCH=purple, DELETE=red)
  - Performance metrics with duration-based coloring (green <100ms, yellow <500ms, red ≥500ms)
  - All logs properly sanitized before output
- **Modern UI**
  - Responsive header with logo, navigation, search bar, and settings
  - Mobile menu drawer with smooth animations
  - Professional glassmorph design using glass utility classes
  - Bot, server, and pack card layouts
  - Section components with gradient separators
  - Loading placeholders for better UX
- **Theme System**
  - Dynamic theme switching (light/dark)
  - Accent color customization via CSS variables
  - Theme persistence across sessions
  - OKLCH color space for better color consistency
- **API Integration**
  - React Query hooks for all API calls
  - Proper query key management with `botKeys`, `packKeys`, `searchKeys`
  - Error handling with fallback data for graceful degradation
  - Search payload validation with required `target_types` field
- **Performance Optimizations**
  - Memoized search results calculation with `useMemo`
  - Proper React Hook dependencies to prevent infinite loops
  - Loader icon only shows when query is active
  - React Query caching (5-minute stale time for searches)
  - Efficient re-render prevention with dependency management
- **Z-Index & Layout**
  - HTML background layering (html has `bg-background`, effects on `z-0`, content on `z-10`)
  - Transparent sections and page layouts to show background effects
  - Bottom gradient fade on footer for visual distinction
  - Proper layering for fixed header (z-50) and modals (z-50)
- **Code Organization**
  - Separated concerns into components, hooks, utilities
  - Type-safe API responses with TypeScript
  - Dedicated logger module with security features
  - Centralized query definitions in `queries.ts`
  - Theme state management via React Context

---

[0.1.0]: https://github.com/plexicore/omniplex/releases/tag/v0.1.0
