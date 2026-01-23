import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect, useMemo } from "react";
import {
	Bot,
	Menu,
	Package,
	Search,
	Server,
	Sparkles,
	X,
	Loader,
	LogOut,
	User,
	Settings,
	ChevronDown,
	LayoutDashboard,
	Heart,
	Bell,
} from "lucide-react";
import { SettingsPanel, QuickThemeToggle } from "./SettingsPanel";
import { useSearch, useOAuthMetadata, useLogout, useUser } from "~/lib/queries";
import { useAuth } from "~/lib/auth-store";
import { logger } from "~/lib/logger";
import { ROUTES } from "~/lib/constants";
import { getUserAvatarUrl } from "~/lib/images";

interface SearchResult {
	id: string;
	name: string;
	type: "bot" | "server" | "pack";
	description?: string;
	avatar?: string;
}

export function Header() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const searchContainerRef = useRef<HTMLDivElement>(null);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const _searchTimeoutRef = useRef<NodeJS.Timeout>();

	// Auth state
	const { isAuthenticated, userId, isLoading: isAuthLoading, logout: authLogout } = useAuth();
	const { data: oauthMeta } = useOAuthMetadata();
	const { mutate: logoutMutation } = useLogout();

	// Fetch user profile when authenticated (only when we have a valid userId)
	const shouldFetchUser = isAuthenticated && !isAuthLoading && !!userId && userId.length > 0;
	const { data: userProfile } = useUser(shouldFetchUser ? userId : null);

	// Use React Query for search
	const { data: rawSearchData, isPending: isSearching } =
		useSearch(searchQuery);

	// Get user display info
	const userDisplayName = userProfile?.user?.display_name || userProfile?.user?.username || "User";
	const userAvatarUrl = userId && userProfile?.user?.avatar
		? getUserAvatarUrl(userId, userProfile.user.avatar, { size: 64 })
		: userId
			? getUserAvatarUrl(userId, null, { size: 64 })
			: null;

	const navItems = [
		{ label: "Bots", href: ROUTES.bots, icon: Bot },
		{ label: "Servers", href: ROUTES.servers, icon: Server },
		{ label: "Packs", href: ROUTES.packs, icon: Package },
	];

	// Handle login button click
	const handleDiscordLogin = () => {
		if (!oauthMeta?.url) {
			logger.error("OAuth metadata not available");
			return;
		}

		// Store current URL for redirect after login
		localStorage.setItem("auth_redirect", window.location.pathname);

		const discordAuthUrl = oauthMeta.url.replace(
			"%REDIRECT_URL%",
			window.location.origin,
		);

		logger.debug("🔑 Redirecting to Discord OAuth");
		window.location.href = discordAuthUrl;
	};

	// Handle logout
	const handleLogout = () => {
		// Call mutation to clear server state/queries
		logoutMutation();
		// Call context to clear local state
		authLogout();
		navigate({ to: ROUTES.home });
	};

	// Close results when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target as Node)
			) {
				setShowResults(false);
			}
			if (
				userMenuRef.current &&
				!userMenuRef.current.contains(event.target as Node)
			) {
				setShowUserMenu(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Format search results from API response with memoization
	const searchResults: SearchResult[] = useMemo(() => {
		if (!rawSearchData) return [];

		const results: SearchResult[] = [];

		// Handle different response structures
		if (Array.isArray(rawSearchData)) {
			results.push(
				...rawSearchData.slice(0, 7).map((item: any) => ({
					id: item.id || item._id || String(Math.random()),
					name: item.name || item.title || "Unknown",
					type: item.type || item.category || "bot",
					description: item.description || item.desc || "",
					avatar:
						item.avatar_url ||
						item.avatar ||
						item.icon_url ||
						item.icon ||
						item.image_url ||
						item.image,
				})),
			);
		} else if (rawSearchData.items) {
			results.push(
				...rawSearchData.items.slice(0, 7).map((item: any) => ({
					id: item.id || item._id || String(Math.random()),
					name: item.name || item.title || "Unknown",
					type: item.type || item.category || "bot",
					description: item.description || item.desc || "",
					avatar:
						item.avatar_url ||
						item.avatar ||
						item.icon_url ||
						item.icon ||
						item.image_url ||
						item.image,
				})),
			);
		} else if (rawSearchData.results) {
			results.push(
				...rawSearchData.results.slice(0, 7).map((item: any) => ({
					id: item.id || item._id || String(Math.random()),
					name: item.name || item.title || "Unknown",
					type: item.type || item.category || "bot",
					description: item.description || item.desc || "",
					avatar:
						item.avatar_url ||
						item.avatar ||
						item.icon_url ||
						item.icon ||
						item.image_url ||
						item.image,
				})),
			);
		} else if (
			rawSearchData.bots ||
			rawSearchData.servers ||
			rawSearchData.packs
		) {
			if (rawSearchData.bots && Array.isArray(rawSearchData.bots)) {
				results.push(
					...rawSearchData.bots.slice(0, 3).map((bot: any) => ({
						id: bot.bot_id || bot.id,
						name: bot.user?.display_name || bot.name || "Unknown Bot",
						type: "bot" as const,
						description: bot.short || bot.description || "",
						avatar: bot.user?.avatar || bot.avatar_url || bot.avatar,
					})),
				);
			}
			if (rawSearchData.servers && Array.isArray(rawSearchData.servers)) {
				results.push(
					...rawSearchData.servers.slice(0, 2).map((server: any) => ({
						id: server.server_id || server.id,
						name: server.name || "Unknown Server",
						type: "server" as const,
						description: server.short || server.description || "",
						avatar:
							server.avatar?.default_path || server.icon_url || server.icon,
					})),
				);
			}
			if (rawSearchData.packs && Array.isArray(rawSearchData.packs)) {
				results.push(
					...rawSearchData.packs.slice(0, 2).map((pack: any) => ({
						id: pack.id || pack.name,
						name: pack.name || "Unknown Pack",
						type: "pack" as const,
						description: pack.short || pack.description || "",
						avatar: pack.image_url || pack.avatar,
					})),
				);
			}
		}

		return results;
	}, [rawSearchData]);

	// Show results when data loads
	useEffect(() => {
		if (searchResults.length > 0) {
			logger.info(`Found ${searchResults.length} search results`);
			logger.debug(`Results:`, searchResults);
			setShowResults(true);
		} else if (searchQuery && !isSearching && rawSearchData) {
			logger.warn(`No results found for query: "${searchQuery}"`);
			setShowResults(false);
		} else if (!searchQuery) {
			setShowResults(false);
		}
	}, [rawSearchData, isSearching, searchQuery, searchResults]);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
				<div className="mx-auto max-w-7xl">
					<div className="glass rounded-2xl px-4 py-3 shadow-lg">
						<div className="flex items-center justify-between gap-4">
							{/* Logo */}
							<Link to="/" className="flex items-center gap-3 group">
								<div className="relative flex h-10 w-10 items-center justify-center rounded-xl gradient-brand glow">
									<Sparkles className="h-5 w-5 text-white" />
								</div>
								<span className="text-xl font-bold tracking-tight">
									<span className="gradient-text">Omni</span>
									<span className="text-foreground">plex</span>
								</span>
							</Link>

							{/* Desktop Navigation */}
							<nav className="hidden md:flex items-center gap-1">
								{navItems.map((item) => (
									<Link
										key={item.href}
										to={item.href}
										className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
									>
										<item.icon className="h-4 w-4" />
										{item.label}
									</Link>
								))}
							</nav>

							{/* Search Bar */}
							<div
								className="hidden lg:flex flex-1 max-w-md mx-4"
								ref={searchContainerRef}
							>
								<div className="relative w-full">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									{isSearching && searchQuery && (
										<Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
									)}
									<input
										type="text"
										placeholder="Search bots, servers, packs..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										onFocus={() =>
											searchQuery && showResults && setShowResults(true)
										}
										className="w-full h-10 pl-10 pr-10 rounded-xl bg-muted/50 border border-transparent focus:border-primary/50 focus:bg-background text-sm placeholder:text-muted-foreground outline-none transition-all duration-200"
									/>

									{/* Search Results Dropdown */}
									{showResults && searchResults.length > 0 && (
										<div className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-xl glass shadow-xl z-50">
											<div className="p-2 space-y-1">
												{searchResults.map((result) => (
													<Link
														key={`${result.type}-${result.id}`}
														to={
															result.type === "bot"
																? `/bots/${result.id}`
																: result.type === "server"
																	? `/servers/${result.id}`
																	: `/packs/${result.id}`
														}
														onClick={() => {
															logger.info(
																`Navigating to ${result.type}: ${result.name} (ID: ${result.id})`,
															);
															setSearchQuery("");
															setShowResults(false);
															setSearchResults([]);
														}}
														className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors group"
													>
														{result.avatar && (
															<img
																src={result.avatar}
																alt={result.name}
																className="h-8 w-8 rounded-lg object-cover"
															/>
														)}
														<div className="flex-1 min-w-0">
															<div className="font-medium text-sm text-foreground truncate">
																{result.name}
															</div>
															<div className="text-xs text-muted-foreground capitalize">
																{result.type}
															</div>
														</div>
													</Link>
												))}
											</div>
										</div>
									)}
								</div>
							</div>

							{/* Right Actions */}
							<div className="flex items-center gap-2">
								<QuickThemeToggle />
								<SettingsPanel />

								{isAuthenticated && userId ? (
									<div className="relative hidden sm:block" ref={userMenuRef}>
										<button
											onClick={() => setShowUserMenu(!showUserMenu)}
											className="flex items-center gap-2 h-10 pl-1 pr-3 rounded-xl glass hover:bg-muted/50 transition-all duration-200"
										>
											<img
												src={userAvatarUrl || getUserAvatarUrl(userId, null, { size: 64 })}
												alt={userDisplayName}
												className="h-8 w-8 rounded-lg object-cover"
											/>
											<ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
										</button>

										{/* User Dropdown Menu */}
										{showUserMenu && (
											<div className="absolute right-0 top-full mt-2 w-56 rounded-xl glass shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
												<div className="px-3 py-2 border-b border-border/50">
													<p className="text-sm font-medium text-foreground">{userDisplayName}</p>
													<p className="text-xs text-muted-foreground truncate">@{userProfile?.user?.username || userId}</p>
												</div>

												<div className="py-1">
													<Link
														to={`/user/${userId}` as any}
														onClick={() => setShowUserMenu(false)}
														className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
													>
														<User className="h-4 w-4 text-muted-foreground" />
														My Profile
													</Link>
													<Link
														to="/dashboard" as any
														onClick={() => setShowUserMenu(false)}
														className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
													>
														<LayoutDashboard className="h-4 w-4 text-muted-foreground" />
														Dashboard
													</Link>
													<Link
														to="/notifications" as any
														onClick={() => setShowUserMenu(false)}
														className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
													>
														<Bell className="h-4 w-4 text-muted-foreground" />
														Notifications
													</Link>
													<Link
														to="/favorites" as any
														onClick={() => setShowUserMenu(false)}
														className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
													>
														<Heart className="h-4 w-4 text-muted-foreground" />
														Favorites
													</Link>
												</div>

												<div className="border-t border-border/50 pt-1">
													<button
														onClick={() => {
															setShowUserMenu(false);
															handleLogout();
														}}
														className="flex items-center gap-3 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
													>
														<LogOut className="h-4 w-4" />
														Logout
													</button>
												</div>
											</div>
										)}
									</div>
								) : (
									<button
										onClick={handleDiscordLogin}
										className="hidden sm:flex items-center justify-center h-10 px-5 rounded-xl gradient-brand text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
									>
										Login
									</button>
								)}

								{/* Mobile Menu Button */}
								<button
									onClick={() => setIsOpen(true)}
									className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted/50 transition-colors"
									aria-label="Open menu"
								>
									<Menu className="h-5 w-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsOpen(false)}
			/>

			{/* Mobile Menu Drawer */}
			<aside
				className={`fixed top-0 right-0 bottom-0 z-50 w-80 glass shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-border/50">
						<span className="text-lg font-bold gradient-text">Menu</span>
						<button
							onClick={() => setIsOpen(false)}
							className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-muted/50 transition-colors"
							aria-label="Close menu"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					{/* Search */}
					<div className="p-4 border-b border-border/50">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							{isSearching && searchQuery && (
								<Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
							)}
							<input
								type="text"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full h-11 pl-10 pr-10 rounded-xl bg-muted/50 border border-transparent focus:border-primary/50 text-sm placeholder:text-muted-foreground outline-none transition-all"
							/>

							{/* Mobile Search Results */}
							{showResults && searchResults.length > 0 && (
								<div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-xl glass shadow-xl z-50">
									<div className="p-2 space-y-1">
										{searchResults.map((result) => (
											<Link
												key={`${result.type}-${result.id}`}
												to={
													result.type === "bot"
														? `/bots/${result.id}`
														: result.type === "server"
															? `/servers/${result.id}`
															: `/packs/${result.id}`
												}
												onClick={() => {
													setSearchQuery("");
													setShowResults(false);
													setSearchResults([]);
													setIsOpen(false);
												}}
												className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
											>
												{result.avatar && (
													<img
														src={result.avatar}
														alt={result.name}
														className="h-6 w-6 rounded object-cover"
													/>
												)}
												<div className="flex-1 min-w-0">
													<div className="font-medium text-xs text-foreground truncate">
														{result.name}
													</div>
													<div className="text-xs text-muted-foreground capitalize">
														{result.type}
													</div>
												</div>
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 p-4 space-y-1 overflow-y-auto">
						{navItems.map((item) => (
							<Link
								key={item.href}
								to={item.href}
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
							>
								<item.icon className="h-5 w-5" />
								<span className="font-medium">{item.label}</span>
							</Link>
						))}

						{/* User-specific navigation when logged in */}
						{isAuthenticated && userId && (
							<>
								<div className="my-2 border-t border-border/50" />
								<Link
									to={`/user/${userId}` as any}
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
								>
									<User className="h-5 w-5" />
									<span className="font-medium">My Profile</span>
								</Link>
								<Link
									to="/dashboard" as any
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
								>
									<LayoutDashboard className="h-5 w-5" />
									<span className="font-medium">Dashboard</span>
								</Link>
								<Link
									to="/notifications" as any
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
								>
									<Bell className="h-5 w-5" />
									<span className="font-medium">Notifications</span>
								</Link>
								<Link
									to="/favorites" as any
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
								>
									<Heart className="h-5 w-5" />
									<span className="font-medium">Favorites</span>
								</Link>
							</>
						)}
					</nav>

					{/* Footer */}
					<div className="p-4 border-t border-border/50">
						{isAuthenticated && userId ? (
							<div className="space-y-3">
								<div className="flex items-center gap-3 px-3 py-2">
									<img
										src={userAvatarUrl || getUserAvatarUrl(userId, null, { size: 64 })}
										alt={userDisplayName}
										className="h-10 w-10 rounded-xl object-cover"
									/>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-foreground">{userDisplayName}</p>
										<p className="text-xs text-muted-foreground truncate">@{userProfile?.user?.username || userId}</p>
									</div>
								</div>
								<button
									onClick={() => {
										setIsOpen(false);
										handleLogout();
									}}
									className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-all duration-300"
								>
									<LogOut className="h-5 w-5" />
									Logout
								</button>
							</div>
						) : (
							<button
								onClick={() => {
									setIsOpen(false);
									handleDiscordLogin();
								}}
								className="flex items-center justify-center w-full h-12 rounded-xl gradient-brand text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
							>
								Login with Discord
							</button>
						)}
					</div>
			</div>
		</aside>

			{/* Spacer for fixed header */}
			<div className="h-20" />
		</>
	);
}
