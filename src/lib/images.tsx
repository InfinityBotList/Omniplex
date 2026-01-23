/**
 * Image utility library for Omniplex
 * Handles CDN URLs for bots, servers, users, and packs
 * Provides default placeholder SVGs when images aren't available
 */

// =============================================================================
// CDN Configuration
// =============================================================================

import { API_CONFIG } from "./constants";

const CDN_BASE = API_CONFIG.cdn;
const DISCORD_CDN = API_CONFIG.discord_cdn;

export type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024;
export type ImageFormat = "webp" | "png" | "jpg" | "gif";

interface ImageOptions {
	size?: ImageSize;
	format?: ImageFormat;
	animated?: boolean;
}

// =============================================================================
// Bot Images
// =============================================================================

/**
 * Get bot avatar URL from Omniplex CDN
 */
export function getBotAvatarUrl(
	botId: string,
	options: ImageOptions = {},
): string {
	const { size = 128, format = "webp" } = options;
	return `${CDN_BASE}/avatars/bots/${botId}.${format}?size=${size}`;
}

/**
 * Get bot banner URL from Omniplex CDN
 */
export function getBotBannerUrl(
	botId: string,
	options: ImageOptions = {},
): string {
	const { format = "webp" } = options;
	return `${CDN_BASE}/banners/bots/${botId}.${format}`;
}

// =============================================================================
// Server Images
// =============================================================================

/**
 * Get server icon URL from Omniplex CDN
 */
export function getServerIconUrl(
	serverId: string,
	options: ImageOptions = {},
): string {
	const { size = 128, format = "webp" } = options;
	return `${CDN_BASE}/icons/servers/${serverId}.${format}?size=${size}`;
}

/**
 * Get server banner URL from Omniplex CDN
 */
export function getServerBannerUrl(
	serverId: string,
	options: ImageOptions = {},
): string {
	const { format = "webp" } = options;
	return `${CDN_BASE}/banners/servers/${serverId}.${format}`;
}

/**
 * Get server splash URL from Omniplex CDN
 */
export function getServerSplashUrl(
	serverId: string,
	options: ImageOptions = {},
): string {
	const { format = "webp" } = options;
	return `${CDN_BASE}/splashes/servers/${serverId}.${format}`;
}

// =============================================================================
// User Images (Discord CDN)
// =============================================================================

/**
 * Get user avatar URL from Discord CDN
 */
export function getUserAvatarUrl(
	userId: string,
	avatarHash?: string | null,
	options: ImageOptions = {},
): string {
	const { size = 128 } = options;

	if (avatarHash) {
		// Animated avatars start with 'a_'
		const format = avatarHash.startsWith("a_") ? "gif" : "webp";
		return `${DISCORD_CDN}/avatars/${userId}/${avatarHash}.${format}?size=${size}`;
	}

	// Default Discord avatar based on user ID
	try {
		const index = Number(BigInt(userId) % BigInt(5));
		return `${DISCORD_CDN}/embed/avatars/${index}.png`;
	} catch {
		return `${DISCORD_CDN}/embed/avatars/0.png`;
	}
}

/**
 * Get user banner URL from Discord CDN
 */
export function getUserBannerUrl(
	userId: string,
	bannerHash: string,
	options: ImageOptions = {},
): string {
	const { size = 512 } = options;
	const format = bannerHash.startsWith("a_") ? "gif" : "webp";
	return `${DISCORD_CDN}/banners/${userId}/${bannerHash}.${format}?size=${size}`;
}

// =============================================================================
// Pack Images
// =============================================================================

/**
 * Get pack icon URL from Omniplex CDN
 */
export function getPackIconUrl(
	packId: string,
	options: ImageOptions = {},
): string {
	const { size = 128, format = "webp" } = options;
	return `${CDN_BASE}/icons/packs/${packId}.${format}?size=${size}`;
}

/**
 * Get pack banner URL from Omniplex CDN
 */
export function getPackBannerUrl(
	packId: string,
	options: ImageOptions = {},
): string {
	const { format = "webp" } = options;
	return `${CDN_BASE}/banners/packs/${packId}.${format}`;
}

// =============================================================================
// Default Placeholder SVGs
// =============================================================================

interface PlaceholderProps {
	className?: string;
	size?: number;
}

/**
 * Default bot avatar placeholder
 */
export function BotAvatarPlaceholder({
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
		>
			<rect width="64" height="64" rx="12" className="fill-muted" />
			<circle cx="32" cy="24" r="12" className="fill-muted-foreground/30" />
			<path
				d="M16 56c0-8.837 7.163-16 16-16s16 7.163 16 16"
				className="stroke-muted-foreground/30"
				strokeWidth="4"
				strokeLinecap="round"
			/>
			{/* Bot antenna */}
			<rect
				x="30"
				y="4"
				width="4"
				height="8"
				rx="2"
				className="fill-muted-foreground/30"
			/>
			<circle cx="32" cy="4" r="3" className="fill-brand-500/50" />
		</svg>
	);
}

/**
 * Default server icon placeholder
 */
export function ServerIconPlaceholder({
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
		>
			<rect width="64" height="64" rx="16" className="fill-muted" />
			{/* Discord-style server icon */}
			<path d="M20 20h24v24H20z" className="fill-muted-foreground/20" rx="4" />
			<rect
				x="24"
				y="24"
				width="16"
				height="4"
				rx="2"
				className="fill-muted-foreground/40"
			/>
			<rect
				x="24"
				y="32"
				width="12"
				height="4"
				rx="2"
				className="fill-muted-foreground/30"
			/>
			<rect
				x="24"
				y="40"
				width="8"
				height="4"
				rx="2"
				className="fill-muted-foreground/20"
			/>
		</svg>
	);
}

/**
 * Default user avatar placeholder
 */
export function UserAvatarPlaceholder({
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
		>
			<rect width="64" height="64" rx="32" className="fill-muted" />
			<circle cx="32" cy="26" r="10" className="fill-muted-foreground/30" />
			<path
				d="M14 56c0-9.941 8.059-18 18-18s18 8.059 18 18"
				className="fill-muted-foreground/30"
			/>
		</svg>
	);
}

/**
 * Default pack icon placeholder
 */
export function PackIconPlaceholder({
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
		>
			<rect width="64" height="64" rx="12" className="fill-muted" />
			{/* Stack of items representing a pack */}
			<rect
				x="14"
				y="22"
				width="36"
				height="28"
				rx="4"
				className="fill-muted-foreground/20"
			/>
			<rect
				x="18"
				y="18"
				width="28"
				height="24"
				rx="3"
				className="fill-muted-foreground/30"
			/>
			<rect
				x="22"
				y="14"
				width="20"
				height="20"
				rx="2"
				className="fill-muted-foreground/40"
			/>
			{/* Grid dots to represent collection */}
			<circle cx="28" cy="22" r="2" className="fill-brand-500/50" />
			<circle cx="36" cy="22" r="2" className="fill-accent-500/50" />
			<circle cx="28" cy="30" r="2" className="fill-accent-500/50" />
			<circle cx="36" cy="30" r="2" className="fill-brand-500/50" />
		</svg>
	);
}

/**
 * Default banner placeholder (wide format)
 */
export function BannerPlaceholder({ className = "" }: { className?: string }) {
	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 600 200"
			preserveAspectRatio="xMidYMid slice"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<rect width="600" height="200" className="fill-muted" />
			{/* Gradient overlay */}
			<defs>
				<linearGradient id="bannerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop
						offset="0%"
						className="[stop-color:oklch(var(--brand-500)/0.3)]"
					/>
					<stop
						offset="50%"
						className="[stop-color:oklch(var(--accent-500)/0.2)]"
					/>
					<stop
						offset="100%"
						className="[stop-color:oklch(var(--brand-600)/0.3)]"
					/>
				</linearGradient>
			</defs>
			<rect width="600" height="200" fill="url(#bannerGradient)" />
			{/* Abstract decoration */}
			<circle cx="100" cy="100" r="80" className="fill-white/5" />
			<circle cx="500" cy="100" r="120" className="fill-white/5" />
			<circle cx="300" cy="50" r="40" className="fill-white/5" />
		</svg>
	);
}

/**
 * Image loading/error state placeholder with shimmer
 */
export function ImageShimmer({ className = "" }: { className?: string }) {
	return (
		<div className={`relative overflow-hidden bg-muted ${className}`}>
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
		</div>
	);
}

// =============================================================================
// Image Component with Fallback
// =============================================================================

interface ImageWithFallbackProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {
	fallback?: React.ReactNode;
	fallbackClassName?: string;
}

/**
 * Image component that shows a fallback on error
 */
export function ImageWithFallback({
	src,
	alt,
	fallback,
	fallbackClassName,
	className,
	onError,
	...props
}: ImageWithFallbackProps) {
	const [hasError, setHasError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setHasError(false);
		setIsLoading(true);
	}, []);

	if (hasError || !src) {
		if (fallback) {
			return <>{fallback}</>;
		}
		return <ImageShimmer className={fallbackClassName || className} />;
	}

	return (
		<>
			{isLoading && <ImageShimmer className={fallbackClassName || className} />}
			<img
				src={src}
				alt={alt}
				className={`${className} ${isLoading ? "hidden" : ""}`}
				onError={(e) => {
					setHasError(true);
					onError?.(e);
				}}
				onLoad={() => setIsLoading(false)}
				{...props}
			/>
		</>
	);
}

// Need React for the component
import * as React from "react";

// =============================================================================
// Convenience Components
// =============================================================================

interface BotAvatarProps {
	botId: string;
	name?: string;
	size?: ImageSize;
	className?: string;
}

/**
 * Bot avatar with automatic fallback
 */
export function BotAvatar({
	botId,
	name = "Bot",
	size = 64,
	className = "",
}: BotAvatarProps) {
	const sizeClass = getSizeClass(size);

	return (
		<ImageWithFallback
			src={getBotAvatarUrl(botId, { size })}
			alt={name}
			className={`${sizeClass} rounded-lg object-cover ${className}`}
			fallback={
				<BotAvatarPlaceholder
					size={size}
					className={`${sizeClass} ${className}`}
				/>
			}
		/>
	);
}

interface ServerIconProps {
	serverId: string;
	name?: string;
	size?: ImageSize;
	className?: string;
}

/**
 * Server icon with automatic fallback
 */
export function ServerIcon({
	serverId,
	name = "Server",
	size = 64,
	className = "",
}: ServerIconProps) {
	const sizeClass = getSizeClass(size);

	return (
		<ImageWithFallback
			src={getServerIconUrl(serverId, { size })}
			alt={name}
			className={`${sizeClass} rounded-2xl object-cover ${className}`}
			fallback={
				<ServerIconPlaceholder
					size={size}
					className={`${sizeClass} ${className}`}
				/>
			}
		/>
	);
}

interface UserAvatarComponentProps {
	userId: string;
	avatarHash?: string | null;
	name?: string;
	size?: ImageSize;
	className?: string;
}

/**
 * User avatar with automatic fallback
 */
export function UserAvatar({
	userId,
	avatarHash,
	name = "User",
	size = 64,
	className = "",
}: UserAvatarComponentProps) {
	const sizeClass = getSizeClass(size);

	return (
		<ImageWithFallback
			src={getUserAvatarUrl(userId, avatarHash, { size })}
			alt={name}
			className={`${sizeClass} rounded-full object-cover ${className}`}
			fallback={
				<UserAvatarPlaceholder
					size={size}
					className={`${sizeClass} ${className}`}
				/>
			}
		/>
	);
}

interface PackIconComponentProps {
	packId: string;
	name?: string;
	size?: ImageSize;
	className?: string;
}

/**
 * Pack icon with automatic fallback
 */
export function PackIcon({
	packId,
	name = "Pack",
	size = 64,
	className = "",
}: PackIconComponentProps) {
	const sizeClass = getSizeClass(size);

	return (
		<ImageWithFallback
			src={getPackIconUrl(packId, { size })}
			alt={name}
			className={`${sizeClass} rounded-xl object-cover ${className}`}
			fallback={
				<PackIconPlaceholder
					size={size}
					className={`${sizeClass} ${className}`}
				/>
			}
		/>
	);
}

// =============================================================================
// Helpers
// =============================================================================

function getSizeClass(size: ImageSize): string {
	const sizeMap: Record<ImageSize, string> = {
		16: "w-4 h-4",
		32: "w-8 h-8",
		64: "w-16 h-16",
		128: "w-32 h-32",
		256: "w-64 h-64",
		512: "w-[512px] h-[512px]",
		1024: "w-[1024px] h-[1024px]",
	};
	return sizeMap[size] || "w-16 h-16";
}

/**
 * Check if a URL is from Omniplex CDN
 */
export function isOmniplexCdn(url: string): boolean {
	return url.startsWith(CDN_BASE);
}

/**
 * Check if a URL is from Discord CDN
 */
export function isDiscordCdn(url: string): boolean {
	return url.startsWith(DISCORD_CDN);
}

/**
 * Get optimized image URL with size parameter
 */
export function getOptimizedUrl(url: string, size: ImageSize): string {
	const urlObj = new URL(url);
	urlObj.searchParams.set("size", size.toString());
	return urlObj.toString();
}
