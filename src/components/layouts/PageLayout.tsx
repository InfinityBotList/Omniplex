import type { ReactNode } from "react";

interface PageLayoutProps {
	children: ReactNode;
	className?: string;
}

/**
 * Base page layout wrapper
 * Provides consistent page structure with proper spacing
 * Background is transparent to allow BackgroundEffects to show through
 */
export function PageLayout({ children, className = "" }: PageLayoutProps) {
	return <div className={`min-h-screen ${className}`}>{children}</div>;
}
