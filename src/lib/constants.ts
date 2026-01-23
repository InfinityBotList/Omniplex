// Social Links
export const SOCIAL_LINKS = {
	discord: "https://discord.gg/yGNfjyPKxb",
	github: "https://github.com/InfinityBotList/Omniplex",
	twitter: "https://x.com/InfinityBotList",
};

// API Configuration
// Uses spider-staging.omniplex.gg in development, spider.omniplex.gg in production
const isProduction = import.meta.env.PROD;
export const API_CONFIG = {
	base: isProduction ? "https://spider.omniplex.gg" : "https://spider-staging.omniplex.gg",
	cdn: "https://cdn.omniplex.gg",
	discord_cdn: "https://cdn.discordapp.com",
};

// App Metadata
export const APP_METADATA = {
	name: "Omniplex",
	description:
		"The ultimate destination for discovering Discord bots, servers, and curated bot packs. Elevate your Discord experience.",
	title: "Omniplex - Discover Discord Bots, Servers & Packs",
	version: "0.1.0",
	themeColor: "#8b5cf6",
};

// Email Addresses
export const EMAILS = {
	support: "support@omniplex.gg",
	security: "security@omniplex.gg",
};

// Navigation Routes
export const ROUTES = {
	home: "/",
	bots: "/bots",
	servers: "/servers",
	packs: "/packs",
	tags: "/tags",
	docs: "/docs",
	add: "/add",
	partners: "/partners",
	support: "/support",
	login: "/login",
	privacy: "/privacy",
	terms: "/terms",
	guidelines: "/guidelines",
};

// Deprecated: Use SOCIAL_LINKS instead
export const WEB_CONSTANTS = SOCIAL_LINKS;
