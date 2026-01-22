import { Link } from "@tanstack/react-router";
import type { Bot } from "~/types/api";
import { getBotAvatarUrl, getBotBannerUrl } from "~/lib/images";
import { BotBannerPlaceholder } from "~/components/placeholders";

interface BotCardProps {
	bot: Bot;
	variant?: "default" | "featured" | "compact";
}

export function BotCard({ bot, variant = "default" }: BotCardProps) {
	const avatarUrl = getBotAvatarUrl(bot.bot_id);
	const bannerUrl = bot.banner?.exists ? getBotBannerUrl(bot.bot_id) : null;
	const isCertified = !!bot.cert_reason;
	const isPremium = bot.premium;

	if (variant === "compact") {
		return (
			<Link
				to="/"
				className="group glass rounded-xl p-3 flex items-center gap-3 hover:scale-[1.02] transition-all duration-300"
			>
				<div className="relative">
					<img
						src={avatarUrl}
						alt={bot.user.display_name}
						className="w-10 h-10 rounded-lg object-cover ring-2 ring-border"
					/>
					{isCertified && (
						<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center">
							<svg
								className="w-2.5 h-2.5 text-white"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					)}
				</div>
				<div className="flex-1 min-w-0">
					<h4 className="font-semibold text-foreground truncate group-hover:text-brand-400 transition-colors">
						{bot.user.display_name}
					</h4>
					<p className="text-xs text-muted-foreground truncate">
						{bot.short || "No description"}
					</p>
				</div>
			</Link>
		);
	}

	if (variant === "featured") {
		return (
			<Link
				to="/"
				className="group relative glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
			>
				{/* Banner/Gradient Background */}
				<div className="relative h-32 overflow-hidden">
					{bannerUrl ? (
						<img
							src={bannerUrl}
							alt=""
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					) : (
						<BotBannerPlaceholder className="w-full h-full" />
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

					{/* Badges */}
					<div className="absolute top-3 left-3 flex gap-2">
						{isCertified && (
							<span className="glass px-2 py-1 rounded-full text-xs font-medium text-brand-400 flex items-center gap-1">
								<svg
									className="w-3 h-3"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								Certified
							</span>
						)}
						{isPremium && (
							<span className="glass px-2 py-1 rounded-full text-xs font-medium text-brand-400">
								Premium
							</span>
						)}
					</div>
				</div>

				{/* Content */}
				<div className="relative p-5">
					{/* Avatar */}
					<div className="absolute -top-8 left-5">
						<div className="relative">
							<img
								src={avatarUrl}
								alt={bot.user.display_name}
								className="w-16 h-16 rounded-xl object-cover ring-4 ring-[var(--glass-bg)] shadow-xl"
							/>
							<div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-border" />
						</div>
					</div>

					<div className="mt-10">
						<h3 className="text-lg font-bold text-foreground group-hover:text-brand-400 transition-colors">
							{bot.user.display_name}
						</h3>
						<p className="mt-2 text-sm text-muted-foreground line-clamp-2">
							{bot.short || "No description available"}
						</p>

						{/* Stats */}
						<div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<svg
									className="w-4 h-4 text-brand-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								<span>{bot.servers?.toLocaleString() || "0"} servers</span>
							</div>
							<div className="flex items-center gap-1">
								<svg
									className="w-4 h-4 text-brand-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
								<span>{bot.votes?.toLocaleString() || 0} votes</span>
							</div>
						</div>

						{/* Tags */}
						{bot.tags && bot.tags.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-1.5">
								{bot.tags.slice(0, 3).map((tag) => (
									<span
										key={tag}
										className="px-2 py-0.5 rounded-md text-xs bg-muted/50 text-muted-foreground border border-border"
									>
										{tag}
									</span>
								))}
								{bot.tags.length > 3 && (
									<span className="px-2 py-0.5 rounded-md text-xs text-muted-foreground">
										+{bot.tags.length - 3}
									</span>
								)}
							</div>
						)}
					</div>

					{/* Hover Glow Effect */}
					<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/10 via-transparent to-brand-600/10" />
					</div>
				</div>
			</Link>
		);
	}

	// Default variant
	return (
		<Link
			to="/"
			className="group glass rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
		>
			{/* Mini Banner */}
			<div className="h-16 relative overflow-hidden">
				{bannerUrl ? (
					<img
						src={bannerUrl}
						alt=""
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<BotBannerPlaceholder className="w-full h-full" />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-[var(--glass-bg)] to-transparent" />
			</div>

			<div className="p-4 relative">
				{/* Avatar */}
				<div className="absolute -top-6 left-4">
					<img
						src={avatarUrl}
						alt={bot.user.display_name}
						className="w-12 h-12 rounded-lg object-cover ring-2 ring-[var(--glass-bg)] shadow-lg"
					/>
				</div>

				{/* Badges */}
				<div className="flex justify-end gap-1 mb-4">
					{isCertified && (
						<span
							className="w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center"
							title="Certified"
						>
							<svg
								className="w-3 h-3 text-brand-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</span>
					)}
					{isPremium && (
						<span
							className="w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center"
							title="Premium"
						>
							<svg
								className="w-3 h-3 text-brand-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						</span>
					)}
				</div>

				<h3 className="font-semibold text-foreground group-hover:text-brand-400 transition-colors truncate">
					{bot.user.display_name}
				</h3>
				<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
					{bot.short || "No description"}
				</p>

				{/* Stats Row */}
				<div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
					<span className="flex items-center gap-1">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						{bot.servers?.toLocaleString() || "0"}
					</span>
					<span className="flex items-center gap-1">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						{bot.votes?.toLocaleString() || 0}
					</span>
				</div>
			</div>
		</Link>
	);
}
