import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  Link,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { AlertTriangle, Home, RefreshCw, SearchX, Sparkles } from 'lucide-react'
import { useEffect } from 'react'

import { Header } from '../components/static/Header'
import { BackgroundEffects } from '../components/static/BackgroundEffects'
import { Footer } from '../components/layouts'
import { ThemeProvider } from '../lib/theme-store'
import { logger } from '../lib/logger'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Omniplex - Discover Discord Bots, Servers & Packs',
      },
      {
        name: 'description',
        content: 'The ultimate destination for discovering Discord bots, servers, and curated bot packs. Elevate your Discord experience.',
      },
      {
        name: 'theme-color',
        content: '#8b5cf6',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  // Show welcome message and logger initialization
  useEffect(() => {
    logger.showWelcome()
    logger.showInitInfo({
      environment: import.meta.env.MODE,
      timestamp: new Date().toLocaleString(),
    })
  }, [])

  // Script to prevent flash of wrong theme - uses new storage key
  const themeScript = `
    (function() {
      try {
        const stored = localStorage.getItem('omniplex-theme-settings');
        const settings = stored ? JSON.parse(stored) : null;
        const mode = settings?.mode || 'system';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
        document.documentElement.classList.toggle('dark', isDark);
        
        // Apply accent hue if stored
        if (settings?.accent) {
          const hues = { violet: 265, blue: 230, cyan: 195, teal: 175, green: 145, orange: 40, pink: 330, rose: 350 };
          document.documentElement.style.setProperty('--accent-hue', hues[settings.accent] || 265);
        }
        
        // Apply effect toggles
        if (settings?.animations === false) document.documentElement.classList.add('no-animations');
        if (settings?.glassmorphism === false) document.documentElement.classList.add('no-glass');
      } catch(e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="text-foreground antialiased">
        <ThemeProvider>
          <BackgroundEffects />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

// Custom 404 Not Found Page
function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative text-center max-w-lg">
        {/* 404 Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-32 h-32 rounded-3xl glass flex items-center justify-center">
            <SearchX className="w-16 h-16 text-brand-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center">
            <span className="text-brand-400 font-bold text-sm">?</span>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-4">
          <span className="text-8xl font-black gradient-text">404</span>
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like this page got lost in the void. The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/bots"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-semibold hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4" />
            Explore Bots
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="w-2 h-2 rounded-full bg-border"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Custom Error Page
function ErrorPage({ error }: { error: Error }) {
  const router = useRouter()

  const handleRetry = () => {
    router.invalidate()
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-destructive/10 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[150px] animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative text-center max-w-lg">
        {/* Error Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-32 h-32 rounded-3xl glass flex items-center justify-center border border-destructive/20">
            <AlertTriangle className="w-16 h-16 text-destructive" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
            <span className="text-destructive font-bold text-sm">!</span>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
        </p>

        {/* Error Details (Collapsed) */}
        <details className="glass rounded-xl p-4 text-left mb-8 group">
          <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            View error details
          </summary>
          <div className="mt-4 p-3 rounded-lg bg-muted overflow-auto max-h-32">
            <code className="text-xs text-destructive font-mono break-all">
              {error?.message || 'Unknown error'}
            </code>
          </div>
        </details>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass text-foreground font-semibold hover:scale-105 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
