import type { ReactNode } from "react";

type BackgroundVariant = "none" | "brand" | "accent" | "gradient";

interface SectionProps {
	children: ReactNode;
	className?: string;
	background?: BackgroundVariant;
	id?: string;
}

const backgroundStyles: Record<BackgroundVariant, string> = {
	none: "",
	brand:
		"bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent",
	accent:
		"bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent",
	gradient: "bg-gradient-to-b from-transparent via-brand-500/5 to-transparent",
};

/**
 * Section wrapper component
 * Provides consistent section styling with optional background variants
 */
export function Section({
	children,
	className = "",
	background = "none",
	id,
}: SectionProps) {
	return (
		<section id={id} className={`relative py-24 overflow-hidden ${className}`}>
			{/* Section Background */}
			{background !== "none" && (
				<div className="absolute inset-0 pointer-events-none">
					<div className={`absolute inset-0 ${backgroundStyles[background]}`} />
				</div>
			)}

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{children}
			</div>
		</section>
	);
}

interface SectionHeaderProps {
	badge?: {
		icon?: ReactNode;
		text: string;
		variant?: "brand" | "accent";
	};
	title: string;
	titleHighlight?: string;
	description?: string;
	action?: {
		label: string;
		href: string;
	};
	className?: string;
}

/**
 * Section header with badge, title, description, and optional action link
 */
export function SectionHeader({
	badge,
	title,
	titleHighlight,
	description,
	action,
	className = "",
}: SectionHeaderProps) {
	// Always use brand colors for consistency with user's accent choice
	const badgeTextClass = "text-brand-400";
	const actionTextClass = "text-brand-400 hover:text-brand-300";
	const badgeDotClass = "bg-brand-400";

	return (
		<div
			className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 ${className}`}
		>
			<div>
				{badge && (
					<div
						className={`inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium ${badgeTextClass} mb-4`}
					>
						{badge.icon || (
							<span
								className={`w-2 h-2 rounded-full ${badgeDotClass} animate-pulse`}
							/>
						)}
						{badge.text}
					</div>
				)}
				<h2 className="text-3xl sm:text-4xl font-bold text-foreground">
					{title}{" "}
					{titleHighlight && (
						<span className="gradient-text">{titleHighlight}</span>
					)}
				</h2>
				{description && (
					<p className="mt-2 text-muted-foreground max-w-xl">{description}</p>
				)}
			</div>

			{action && (
				<a
					href={action.href}
					className={`inline-flex items-center gap-2 text-sm font-medium ${actionTextClass} transition-colors group`}
				>
					{action.label}
					<svg
						className="w-4 h-4 group-hover:translate-x-1 transition-transform"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</a>
			)}
		</div>
	);
}
