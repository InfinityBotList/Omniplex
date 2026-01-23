import { useQuery, useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	BotIndex,
	BotsAllResponse,
	BotsRandomResponse,
	PacksAllResponse,
	OAuthMetadata,
	AuthLoginResponse,
	AuthTokenRefreshResponse,
	UserProfile,
} from "~/types/api";
import { logger } from "./logger";
import { API_CONFIG } from "./constants";

const API_BASE = API_CONFIG.base;

export const botKeys = {
	all: () => ["bots"] as const,
	index: () => [...botKeys.all(), "index"] as const,
	random: () => [...botKeys.all(), "random"] as const,
	list: () => [...botKeys.all(), "list"] as const,
	detail: (id: string) => [...botKeys.all(), id] as const,
};

export const packKeys = {
	all: () => ["packs"] as const,
	list: () => [...packKeys.all(), "list"] as const,
	detail: (id: string) => [...packKeys.all(), id] as const,
};

export const searchKeys = {
	all: () => ["search"] as const,
	query: (q: string) => [...searchKeys.all(), q] as const,
};

export const authKeys = {
	all: () => ["auth"] as const,
	user: () => [...authKeys.all(), "user"] as const,
	token: () => [...authKeys.all(), "token"] as const,
};

export const userKeys = {
	all: () => ["users"] as const,
	detail: (id: string | null | undefined) => [...userKeys.all(), id ?? "unknown"] as const,
};

// User queries
export const useUser = (userId?: string | null) => {
	// Extra validation - ensure userId is a valid non-empty string and not the literal "undefined"
	const validUserId = typeof userId === 'string' && 
		userId.length > 0 && 
		userId !== 'undefined' && 
		userId !== 'null' 
		? userId 
		: null;
	
	return useQuery({
		queryKey: userKeys.detail(validUserId),
		queryFn: async () => {
			// Double-check userId is valid before making request
			if (!validUserId || validUserId === 'undefined' || validUserId === 'null') {
				logger.error("❌ useUser called with invalid userId:", userId);
				throw new Error("User ID required");
			}

			const startTime = performance.now();
			logger.debug("👤 Fetching user profile...", { userId: validUserId });

			try {
				const res = await fetch(`${API_BASE}/users/${validUserId}`);
				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`Failed to fetch user ${validUserId} with status ${res.status}`);
					logger.debug("User fetch error response:", { status: res.status, body: errorText });
					throw new Error(`HTTP ${res.status}: Failed to fetch user`);
				}

				const data = (await res.json()) as UserProfile;
				logger.logApiCall("GET", `/users/${validUserId}`, duration);
				logger.debug("✅ User profile fetched", {
					userId: data.user?.id,
					displayName: data.user?.display_name,
				});

				return data;
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Failed to fetch user after ${duration}ms:`, error);
				throw error;
			}
		},
		enabled: !!validUserId,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
		retry: false, // Don't retry on failure
	});
};

// Bot queries
export const useBotsIndex = () => {
	return useSuspenseQuery({
		queryKey: botKeys.index(),
		queryFn: async () => {
			try {
				const res = await fetch(`${API_BASE}/bots/@index`);
				if (!res.ok)
					throw new Error(`HTTP ${res.status}: Failed to fetch bots index`);
				return res.json() as Promise<BotIndex>;
			} catch (error) {
				console.error("API Error:", error);
				// Return mock data for development
				return {
					certified: [],
					top_voted: [],
					recent: [],
				} as BotIndex;
			}
		},
	});
};

export const useBotsRandom = () => {
	return useSuspenseQuery({
		queryKey: botKeys.random(),
		queryFn: async () => {
			try {
				const res = await fetch(`${API_BASE}/bots/@random`);
				if (!res.ok)
					throw new Error(`HTTP ${res.status}: Failed to fetch random bots`);
				return res.json() as Promise<BotsRandomResponse>;
			} catch (error) {
				console.error("API Error:", error);
				return { bots: [] } as BotsRandomResponse;
			}
		},
	});
};

export const useBots = (page = 1) => {
	return useSuspenseQuery({
		queryKey: [...botKeys.list(), page],
		queryFn: async () => {
			try {
				const res = await fetch(`${API_BASE}/bots/@all?page=${page}`);
				if (!res.ok)
					throw new Error(`HTTP ${res.status}: Failed to fetch bots`);
				return res.json() as Promise<BotsAllResponse>;
			} catch (error) {
				console.error("API Error:", error);
				return { count: 0, per_page: 0, results: [] } as BotsAllResponse;
			}
		},
	});
};

// Pack queries
export const usePacks = (page = 1) => {
	return useSuspenseQuery({
		queryKey: [...packKeys.list(), page],
		queryFn: async () => {
			try {
				const res = await fetch(`${API_BASE}/packs/@all?page=${page}`);
				if (!res.ok)
					throw new Error(`HTTP ${res.status}: Failed to fetch packs`);
				return res.json() as Promise<PacksAllResponse>;
			} catch (error) {
				console.error("API Error:", error);
				return { count: 0, per_page: 0, results: [] } as PacksAllResponse;
			}
		},
	});
};

// Search query
export const useSearch = (query: string) => {
	return useQuery({
		queryKey: searchKeys.query(query),
		queryFn: async () => {
			const startTime = performance.now();
			logger.debug(`🔍 Searching for: "${query}"`);

			const searchPayload = {
				query: query.trim(),
				target_types: ["bot", "server", "pack"],
			};
			logger.debug(`Search payload:`, searchPayload);

			try {
				const res = await fetch(`${API_BASE}/list/search`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(searchPayload),
				});

				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.warn(`Search API returned ${res.status}`);
					logger.debug(`Response body:`, errorText);
					throw new Error(`HTTP ${res.status}: Search failed - ${errorText}`);
				}

				const data = await res.json();
				logger.logApiCall("POST", "/list/search", duration);
				logger.logPerformance(
					`Search query: "${query.substring(0, 30)}${query.length > 30 ? "..." : ""}"`,
					duration,
				);
				logger.debug(`Search results received:`, data);

				return data;
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Search failed after ${duration}ms:`, error);
				throw error;
			}
		},
		enabled: !!query.trim(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// OAuth metadata query
export const useOAuthMetadata = () => {
	return useQuery({
		queryKey: authKeys.all(),
		queryFn: async () => {
			const startTime = performance.now();
			logger.debug("🔑 Fetching OAuth metadata...");

			try {
				const res = await fetch(`${API_BASE}/auth/login/discord-oauth2`);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`OAuth metadata failed with status ${res.status}`);
					logger.debug("Error response:", errorText);
					throw new Error(`HTTP ${res.status}: Failed to fetch OAuth metadata`);
				}

				const data = (await res.json()) as OAuthMetadata;
				const duration = Math.round(performance.now() - startTime);
				logger.logApiCall("GET", "/auth/login/discord-oauth2", duration);
				logger.debug("✅ OAuth metadata fetched", { client_id: data.client_id });

				return data;
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`OAuth metadata failed after ${duration}ms:`, error);
				throw error;
			}
		},
	});
};

// Auth mutations
interface LoginParams {
	code: string;
	client_id: string;
	redirect_uri: string;
	protocol?: string;
	scope?: string;
}

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: LoginParams) => {
			const startTime = performance.now();
			
			const loginPayload = {
				code: params.code,
				client_id: params.client_id,
				redirect_uri: params.redirect_uri,
				protocol: "persepolis-infernoplex",
				scope: params.scope || "normal",
			};
			
			logger.debug("🔐 Login payload being sent:", loginPayload);
			
			logger.debug("🔐 Initiating login...", {
				code: params.code.substring(0, 10) + "...",
				client_id: params.client_id,
				redirect_uri: params.redirect_uri,
			});

			try {
				const res = await fetch(`${API_BASE}/auth/login/discord-oauth2`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(loginPayload),
				});

				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`Login failed with status ${res.status}`);
					logger.debug("Login error response:", {
						status: res.status,
						body: errorText,
					});
					throw new Error(`HTTP ${res.status}: Login failed`);
				}

				const data = (await res.json()) as AuthLoginResponse;
				logger.logApiCall("POST", "/auth/login/discord-oauth2", duration);
				logger.debug("✅ Login successful", {
					token: data.token.substring(0, 20) + "...",
					user_id: data.user_id,
				});

				// Add expiration timestamp (7 days from now)
				const tokenData: AuthLoginResponse = {
					...data,
					expiresOn: Date.now() + 1000 * 60 * 60 * 24 * 7,
				};

				// Store complete token data in localStorage
				localStorage.setItem("auth_token", tokenData.token);
				localStorage.setItem("user_id", tokenData.user_id);
				localStorage.setItem("target_id", tokenData.target_id);
				localStorage.setItem("session_id", tokenData.session_id);
				localStorage.setItem("auth_expires_on", String(tokenData.expiresOn));
				logger.debug("Token stored in localStorage with expiration", {
					expiresOn: new Date(tokenData.expiresOn).toISOString(),
				});

				// Invalidate auth queries to refetch user data
				await queryClient.invalidateQueries({ queryKey: authKeys.all() });

				return tokenData;
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Login failed after ${duration}ms:`, error);
				throw error;
			}
		},
	});
};

interface RefreshTokenParams {
	userId: string;
}

export const useRefreshToken = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ userId }: RefreshTokenParams) => {
			const startTime = performance.now();
			const token = localStorage.getItem("auth_token");

			if (!token) {
				throw new Error("No auth token found");
			}

			logger.debug("🔄 Refreshing token...");

			try {
				const res = await fetch(`${API_BASE}/users/${userId}/token`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `User ${token}`,
					},
				});

				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`Token refresh failed with status ${res.status}`);
					logger.debug("Error response:", errorText);

					// Clear invalid token
					localStorage.removeItem("auth_token");
					localStorage.removeItem("user_id");

					throw new Error(`HTTP ${res.status}: Token refresh failed`);
				}

				const data = (await res.json()) as AuthTokenRefreshResponse;
				logger.logApiCall("PATCH", `/users/${userId}/token`, duration);
				logger.debug("✅ Token refreshed");

				// Invalidate auth queries
				await queryClient.invalidateQueries({ queryKey: authKeys.all() });

				return data;
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Token refresh failed after ${duration}ms:`, error);
				throw error;
			}
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			logger.debug("🚪 Logging out...");

			// Clear all auth data
			localStorage.removeItem("auth_token");
			localStorage.removeItem("user_id");
			localStorage.removeItem("target_id");
			localStorage.removeItem("session_id");
			localStorage.removeItem("auth_expires_on");

			// Clear all auth queries
			queryClient.removeQueries({ queryKey: authKeys.all() });

			logger.debug("✅ Logout successful");
		},
	});
};

// Session management queries
interface Session {
	id: string;
	name?: string;
	created_at: string;
	type: string;
	target_type: string;
	target_id: string;
	perm_limits?: string[];
	expiry: string;
}

export const useSessions = (userId?: string) => {
	return useQuery({
		queryKey: [...authKeys.all(), "sessions", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID required");

			const startTime = performance.now();
			logger.debug("📋 Fetching sessions...", { user_id: userId });

			try {
				const token = localStorage.getItem("auth_token");
				if (!token) throw new Error("No auth token");

				const res = await fetch(`${API_BASE}/user/${userId}/sessions`, {
					headers: {
						Authorization: `User ${token}`,
					},
				});

				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`Failed to fetch sessions with status ${res.status}`);
					logger.debug("Error response:", errorText);
					throw new Error(`HTTP ${res.status}: Failed to fetch sessions`);
				}

				const data = (await res.json()) as { sessions: Session[] };
				logger.logApiCall("GET", `/user/${userId}/sessions`, duration);
				logger.debug("✅ Sessions fetched", {
					count: data.sessions?.length || 0,
				});

				return data.sessions || [];
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Failed to fetch sessions after ${duration}ms:`, error);
				throw error;
			}
		},
		enabled: !!userId,
	});
};

interface CreateSessionParams {
	name: string;
	type: "api";
	permLimits?: string[];
	expiry: number; // seconds
}

export const useCreateSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: CreateSessionParams & { userId: string }) => {
			const startTime = performance.now();
			logger.debug("🆕 Creating session...", { name: params.name });

			try {
				const token = localStorage.getItem("auth_token");
				if (!token) throw new Error("No auth token");

				const payload = {
					name: params.name,
					type: params.type,
					perm_limits: params.permLimits || [],
					expiry: params.expiry,
				};

				const res = await fetch(
					`${API_BASE}/user/${params.userId}/sessions`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `User ${token}`,
						},
						body: JSON.stringify(payload),
					},
				);

				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`Failed to create session with status ${res.status}`);
					logger.debug("Error response:", errorText);
					throw new Error(`HTTP ${res.status}: Failed to create session`);
				}

				const data = (await res.json()) as Session;
				logger.logApiCall("POST", `/user/${params.userId}/sessions`, duration);
				logger.debug("✅ Session created", { session_id: data.id });

				// Invalidate sessions query
				queryClient.invalidateQueries({
					queryKey: [...authKeys.all(), "sessions"],
				});

				return data;
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Failed to create session after ${duration}ms:`, error);
				throw error;
			}
		},
	});
};

export const useDeleteSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: { userId: string; sessionId: string }) => {
			const startTime = performance.now();
			logger.debug("🗑️ Deleting session...", {
				session_id: params.sessionId,
			});

			try {
				const token = localStorage.getItem("auth_token");
				if (!token) throw new Error("No auth token");

				const res = await fetch(
					`${API_BASE}/user/${params.userId}/sessions/${params.sessionId}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `User ${token}`,
						},
					},
				);

				const duration = Math.round(performance.now() - startTime);

				if (!res.ok) {
					const errorText = await res.text();
					logger.error(`Failed to delete session with status ${res.status}`);
					logger.debug("Error response:", errorText);
					throw new Error(`HTTP ${res.status}: Failed to delete session`);
				}

				logger.logApiCall(
					"DELETE",
					`/user/${params.userId}/sessions/${params.sessionId}`,
					duration,
				);
				logger.debug("✅ Session deleted");

				// Invalidate sessions query
				queryClient.invalidateQueries({
					queryKey: [...authKeys.all(), "sessions"],
				});
			} catch (error) {
				const duration = Math.round(performance.now() - startTime);
				logger.error(`Failed to delete session after ${duration}ms:`, error);
				throw error;
			}
		},
	});
};
