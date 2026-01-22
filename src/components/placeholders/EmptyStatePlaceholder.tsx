import { Search, Package, Bot, Server, FileQuestion } from 'lucide-react'

type EmptyStateType = 'search' | 'bots' | 'servers' | 'packs' | 'generic'

interface EmptyStatePlaceholderProps {
  type?: EmptyStateType
  title?: string
  description?: string
  className?: string
}

const typeConfig: Record<EmptyStateType, { icon: typeof Search; defaultTitle: string; defaultDesc: string }> = {
  search: {
    icon: Search,
    defaultTitle: 'No results found',
    defaultDesc: 'Try adjusting your search or filters to find what you\'re looking for.',
  },
  bots: {
    icon: Bot,
    defaultTitle: 'No bots found',
    defaultDesc: 'There are no bots to display at the moment.',
  },
  servers: {
    icon: Server,
    defaultTitle: 'No servers found',
    defaultDesc: 'There are no servers to display at the moment.',
  },
  packs: {
    icon: Package,
    defaultTitle: 'No packs found',
    defaultDesc: 'There are no packs to display at the moment.',
  },
  generic: {
    icon: FileQuestion,
    defaultTitle: 'Nothing here',
    defaultDesc: 'There\'s nothing to display at the moment.',
  },
}

/**
 * Empty state placeholder for when there's no content to display
 * Used in search results, empty lists, etc.
 */
export function EmptyStatePlaceholder({ 
  type = 'generic',
  title,
  description,
  className = '' 
}: EmptyStatePlaceholderProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {/* Icon container with subtle animation */}
      <div className="relative mb-6">
        {/* Background glow */}
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl scale-150" />
        
        {/* Icon wrapper */}
        <div className="relative w-20 h-20 rounded-2xl glass flex items-center justify-center">
          <Icon className="w-10 h-10 text-muted-foreground/60" strokeWidth={1.5} />
        </div>
        
        {/* Decorative dots */}
        <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary/30" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-accent/30" />
      </div>
      
      {/* Text content */}
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        {description || config.defaultDesc}
      </p>
    </div>
  )
}
