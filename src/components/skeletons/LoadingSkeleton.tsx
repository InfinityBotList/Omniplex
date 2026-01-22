interface LoadingSkeletonProps {
  title?: string
  count?: number
  variant?: 'card' | 'featured' | 'compact'
  className?: string
}

/**
 * Loading skeleton for sections with cards
 * Provides visual feedback while content is loading
 */
export function LoadingSkeleton({ 
  title, 
  count = 6, 
  variant = 'featured',
  className = '' 
}: LoadingSkeletonProps) {
  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="h-6 w-32 rounded-full bg-muted animate-pulse mb-4" />
          <div className="h-10 w-64 rounded-lg bg-muted animate-pulse mb-2" />
          <div className="h-5 w-96 rounded-lg bg-muted animate-pulse" />
        </div>
        
        {/* Cards Grid */}
        {variant === 'featured' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <FeaturedCardSkeleton key={`skeleton-${title || 'card'}-${i}`} />
            ))}
          </div>
        )}
        
        {variant === 'card' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
              <DefaultCardSkeleton key={`skeleton-${title || 'card'}-${i}`} />
            ))}
          </div>
        )}
        
        {variant === 'compact' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: count }).map((_, i) => (
              <CompactCardSkeleton key={`skeleton-${title || 'card'}-${i}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturedCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="h-32 bg-muted" />
      <div className="p-5">
        <div className="flex gap-3 mb-4">
          <div className="w-16 h-16 rounded-xl bg-muted -mt-12" />
        </div>
        <div className="h-6 w-3/4 rounded bg-muted mb-2" />
        <div className="h-4 w-full rounded bg-muted mb-1" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 rounded bg-muted" />
          <div className="h-5 w-16 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}

function DefaultCardSkeleton() {
  return (
    <div className="glass rounded-xl overflow-hidden animate-pulse">
      <div className="h-16 bg-muted" />
      <div className="p-4">
        <div className="w-12 h-12 rounded-lg bg-muted -mt-8 mb-4" />
        <div className="h-5 w-3/4 rounded bg-muted mb-2" />
        <div className="h-4 w-full rounded bg-muted mb-1" />
        <div className="h-4 w-1/2 rounded bg-muted" />
        <div className="flex justify-between mt-3 pt-3 border-t border-border">
          <div className="h-4 w-12 rounded bg-muted" />
          <div className="h-4 w-12 rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}

function CompactCardSkeleton() {
  return (
    <div className="glass rounded-xl p-3 flex items-center gap-3 animate-pulse">
      <div className="w-10 h-10 rounded-lg bg-muted flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="h-4 w-24 rounded bg-muted mb-2" />
        <div className="h-3 w-32 rounded bg-muted" />
      </div>
    </div>
  )
}

// Export individual skeletons for custom use
export { FeaturedCardSkeleton, DefaultCardSkeleton, CompactCardSkeleton }
