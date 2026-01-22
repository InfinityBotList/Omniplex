/**
 * Custom logger utility for Omniplex
 * Provides safe logging without leaking sensitive data
 */

const isDevelopment = import.meta.env.DEV

// ANSI color codes for styled console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
}

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

interface LoggerConfig {
  enableDebug?: boolean
}

class Logger {
  private config: LoggerConfig = {
    enableDebug: isDevelopment,
  }

  setConfig(config: Partial<LoggerConfig>) {
    this.config = { ...this.config, ...config }
  }

  private formatMessage(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toLocaleTimeString()
    const levelColor = this.getLevelColor(level)
    const levelLabel = level.toUpperCase().padEnd(5)

    return {
      styled: `${levelColor}${colors.bright}[${levelLabel}]${colors.reset} ${colors.dim}${timestamp}${colors.reset} ${message}`,
      data,
    }
  }

  private getLevelColor(level: LogLevel): string {
    switch (level) {
      case 'info':
        return colors.blue
      case 'warn':
        return colors.yellow
      case 'error':
        return colors.red
      case 'debug':
        return colors.cyan
      default:
        return colors.green
    }
  }

  log(message: string, data?: any) {
    const { styled } = this.formatMessage('log', message, data)
    console.log(styled, data)
  }

  info(message: string, data?: any) {
    const { styled } = this.formatMessage('info', message, data)
    console.info(styled, data)
  }

  warn(message: string, data?: any) {
    const { styled } = this.formatMessage('warn', message, data)
    console.warn(styled, data)
  }

  error(message: string, error?: Error | any) {
    const { styled } = this.formatMessage('error', message)
    if (error instanceof Error) {
      console.error(styled, {
        message: error.message,
        stack: error.stack,
      })
    } else {
      console.error(styled, error)
    }
  }

  debug(message: string, data?: any) {
    if (!this.config.enableDebug) return
    const { styled } = this.formatMessage('debug', message, data)
    console.debug(styled, data)
  }

  group(label: string) {
    console.group(`${colors.bright}${label}${colors.reset}`)
  }

  groupEnd() {
    console.groupEnd()
  }

  /**
   * Display startup welcome message (like Discord's security warning)
   */
  showWelcome() {
    // ASCII art banner
    const banner = `
%c
    ███████████████████████████████████████████████████████████
    █                                                         █
    █   ██████╗ ███╗   ███╗███╗   ██╗██╗██████╗ ██╗     ███████╗██╗  ██╗
    █  ██╔═══██╗████╗ ████║████╗  ██║██║██╔══██╗██║     ██╔════╝╚██╗██╔╝
    █  ██║   ██║██╔████╔██║██╔██╗ ██║██║██████╔╝██║     █████╗   ╚███╔╝
    █  ██║   ██║██║╚██╔╝██║██║╚██╗██║██║██╔═══╝ ██║     ██╔══╝   ██╔██╗
    █  ╚██████╔╝██║ ╚═╝ ██║██║ ╚████║██║██║     ███████╗███████╗██╔╝ ██╗
    █   ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝
    █                                                         █
    ███████████████████████████████████████████████████████████

    🚀 Welcome to Omniplex - Discover Discord Bots, Servers & Packs

    ⚠️  SECURITY WARNING:
    If someone told you to paste something here, STOP!
    Pasting unknown code can give attackers access to your account.

    💡 Pro Tips:
    • Never paste code you don't understand
    • Never share your authentication tokens
    • Report security issues: https://github.com/plexicore/omniplex

    Happy exploring! 🎉
`

    console.log(
      banner,
    )
  }

  /**
   * Display initialization info with nice formatting
   */
  showInitInfo(data: {
    environment: string
    timestamp: string
  }) {
    console.group(
      `%c🚀 Omniplex Initialization%c`,
      'color: #06b6d4; font-weight: bold; font-size: 12px;',
      'color: #6b7280;'
    )

    console.log(`%cEnvironment:%c ${data.environment}`, 'color: #9ca3af; font-weight: 500;', 'color: #d1d5db;')
    console.log(`%cTimestamp:%c ${data.timestamp}`, 'color: #9ca3af; font-weight: 500;', 'color: #d1d5db;')
    console.log(`%cVersion:%c ${this.getVersion()}`, 'color: #9ca3af; font-weight: 500;', 'color: #d1d5db;')

    if (isDevelopment) {
      console.log(
        `%c✓ Development Mode Enabled%c - Extra logging and React DevTools available`,
        'color: #10b981; font-weight: 500;',
        'color: #9ca3af;'
      )
    } else {
      console.log(
        `%c✓ Production Mode%c - Performance optimized`,
        'color: #06b6d4; font-weight: 500;',
        'color: #9ca3af;'
      )
    }

    console.groupEnd()
  }

  /**
   * Get version from package.json or default
   */
  private getVersion(): string {
    try {
      // This would be replaced by build process
      return (window as any).__OMNIPLEX_VERSION__ || '1.0.0'
    } catch {
      return '1.0.0'
    }
  }

  /**
   * Log API calls with nice formatting
   */
  logApiCall(method: string, endpoint: string, duration?: number) {
    const statusColor = 'color: #10b981;'
    const methodColor = `color: ${this.getMethodColor(method)}; font-weight: bold; font-size: 11px; text-transform: uppercase;`
    const durationText = duration ? ` (${duration}ms)` : ''

    console.log(
      `%c[${method}]%c ${endpoint}${durationText}`,
      methodColor,
      'color: #d1d5db;'
    )
  }

  /**
   * Get color for HTTP method
   */
  private getMethodColor(method: string): string {
    switch (method.toUpperCase()) {
      case 'GET':
        return '#06b6d4'
      case 'POST':
        return '#10b981'
      case 'PUT':
        return '#f59e0b'
      case 'PATCH':
        return '#8b5cf6'
      case 'DELETE':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  /**
   * Log performance metrics
   */
  logPerformance(label: string, duration: number) {
    const color =
      duration < 100 ? '#10b981' : duration < 500 ? '#f59e0b' : '#ef4444'
    console.log(
      `%c⏱️  ${label}%c ${duration}ms`,
      `color: ${color}; font-weight: bold;`,
      'color: #d1d5db;'
    )
  }
}

// Create singleton instance
export const logger = new Logger()

/**
 * Secure data serializer - removes sensitive fields before logging
 * Use this when you need to log objects that might contain sensitive data
 */
export function serializeData(data: any, depth = 0): any {
  if (depth > 5) return '[Circular/Deep]'
  if (data === null || data === undefined) return data
  if (typeof data !== 'object') return data

  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'apiKey',
    'authorization',
    'bearer',
    'auth',
    'cookie',
    'session',
    'privateKey',
    'accessToken',
    'refreshToken',
    'creditCard',
    'ssn',
    'ssn',
  ]

  if (Array.isArray(data)) {
    return data.map((item) => serializeData(item, depth + 1))
  }

  const sanitized: any = {}
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()
    const isSensitive = sensitiveFields.some((field) =>
      lowerKey.includes(field.toLowerCase())
    )

    if (isSensitive) {
      sanitized[key] = '[REDACTED]'
    } else {
      sanitized[key] = serializeData(value, depth + 1)
    }
  }

  return sanitized
}

export default logger
