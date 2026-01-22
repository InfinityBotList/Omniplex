import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { BotCard } from "@/components/cards/BotCard";
import { PackCard } from "@/components/cards/PackCard";
import { useBotsIndex, usePacks } from "~/lib/queries";
import {
	PageLayout,
	Section,
	SectionHeader,
	CTASection,
	CTAIcons,
	LoadingSkeleton,
} from "@/components/layouts";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<PageLayout>
			{/* Featured Bots Section */}
			<Suspense
				fallback={
					<LoadingSkeleton title="Featured Bots" count={6} variant="featured" />
				}
			>
				<FeaturedBotsSection />
			</Suspense>

			{/* Popular Packs Section */}
			<Suspense
				fallback={
					<LoadingSkeleton title="Bot Packs" count={3} variant="featured" />
				}
			>
				<PopularPacksSection />
			</Suspense>

			{/* CTA Section */}
			<CTASection
				title="Ready to"
				titleHighlight="explore more?"
				description="Browse thousands of verified bots, servers, and curated collections. Join our growing community of Discord enthusiasts today!"
				primaryAction={{
					label: "Browse All Bots",
					href: "/bots",
					icon: CTAIcons.bolt,
				}}
				secondaryAction={{
					label: "Join Discord",
					href: "https://discord.gg/omniplex",
					icon: CTAIcons.discord,
					external: true,
				}}
			/>
		</PageLayout>
	);
}

function FeaturedBotsSection() {
	const { data } = useBotsIndex();

	const featuredBots = data.certified.slice(0, 6);
	const trendingBots = data.top_voted.slice(0, 4);

	return (
		<Section background="brand">
			<SectionHeader
				badge={{ text: "Featured Collection", variant: "brand" }}
				title="Featured"
				titleHighlight="Bots"
				description="Discover our certified and top-voted bots, handpicked for quality, reliability, and amazing features."
				action={{ label: "View all bots", href: "/bots" }}
			/>

			{/* Featured Bots Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{featuredBots.map((bot) => (
					<BotCard key={bot.bot_id} bot={bot} variant="featured" />
				))}
			</div>

			{/* Trending Section */}
			{trendingBots.length > 0 && (
				<div className="mt-16">
					<div className="flex items-center gap-2 mb-6">
						<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-xs font-medium text-brand-400">
							<svg
								className="w-3.5 h-3.5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							Trending Now
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{trendingBots.map((bot) => (
							<BotCard key={bot.bot_id} bot={bot} variant="default" />
						))}
					</div>
				</div>
			)}
		</Section>
	);
}

function PopularPacksSection() {
	const { data } = usePacks();

	const packs = data.results.slice(0, 3);

	if (!packs || packs.length === 0) {
		return null;
	}

	return (
		<Section background="accent">
			<SectionHeader
				badge={{
					text: "Curated Collections",
					variant: "accent",
					icon: (
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
								d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							/>
						</svg>
					),
				}}
				title="Bot"
				titleHighlight="Packs"
				description="Curated collections of bots organized by purpose, category, and use case for the perfect server setup."
				action={{ label: "View all packs", href: "/packs" }}
			/>

			{/* Packs Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{packs.map((pack) => (
					<PackCard key={pack.url} pack={pack} variant="featured" />
				))}
			</div>
		</Section>
	);
}
