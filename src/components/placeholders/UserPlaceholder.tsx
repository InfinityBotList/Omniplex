interface PlaceholderProps {
	className?: string;
	size?: number | string;
}

/**
 * User avatar placeholder with silhouette
 * Circular design matching Discord's user avatar style
 */
export function UserPlaceholder({
	className = "",
	size = 64,
}: PlaceholderProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 64 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-label="User placeholder"
		>
			{/* Circular background */}
			<circle cx="32" cy="32" r="32" className="fill-muted" />

			{/* Head */}
			<circle cx="32" cy="24" r="12" className="fill-muted-foreground/30" />

			{/* Body/shoulders */}
			<ellipse
				cx="32"
				cy="56"
				rx="20"
				ry="16"
				className="fill-muted-foreground/30"
			/>

			{/* Subtle highlight on head */}
			<circle cx="28" cy="20" r="3" className="fill-white/10" />
		</svg>
	);
}
