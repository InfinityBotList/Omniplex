import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useLogin, useOAuthMetadata } from "~/lib/queries";
import { useAuth } from "~/lib/auth-store";
import { logger } from "~/lib/logger";
import { ROUTES, API_CONFIG } from "~/lib/constants";

interface AuthCallbackParams {
	code?: string;
	error?: string;
	error_description?: string;
	state?: string;
}

export const Route = createFileRoute("/auth/sauron")({
	component: AuthCallbackPage,
});

function AuthCallbackPage() {
	const navigate = useNavigate();
	const searchParams = useSearch({ strict: false }) as AuthCallbackParams;
	const { login: setAuthLogin } = useAuth();
	const { mutate: login, isPending: isLoggingIn } = useLogin();
	const { data: oauthMeta } = useOAuthMetadata();
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState("Processing authentication...");
	const hasInitiatedLoginRef = useRef(false);

	useEffect(() => {
		// Check for Discord OAuth errors
		if (searchParams.error) {
			const errorMsg = searchParams.error_description || searchParams.error;
			logger.error("Discord OAuth error", errorMsg);
			setError(`Authentication failed: ${errorMsg}`);
			return
		}

		// Check if we have an authorization code
		if (!searchParams.code) {
			logger.error("No authorization code in callback");
			setError("No authorization code received from Discord");
			return
		}

		// Wait for OAuth metadata to load
		if (!oauthMeta) {
			logger.debug("Waiting for OAuth metadata to load...");
			return;
		}

		// Prevent duplicate login attempts with the same code
		if (hasInitiatedLoginRef.current) {
			logger.debug("Login already initiated, skipping...");
			return;
		}
		hasInitiatedLoginRef.current = true;

		// Exchange code for token
		const redirectUri = `${window.location.origin}/auth/sauron`;

		logger.debug("🔐 OAuth metadata loaded", {
			client_id: oauthMeta.client_id,
			url: oauthMeta.url ? oauthMeta.url.substring(0, 50) + "..." : "undefined",
		})

		logger.debug("🔐 About to exchange authorization code", {
			code: searchParams.code.substring(0, 10) + "...",
			client_id: oauthMeta.client_id,
			redirect_uri: redirectUri,
		})

		setMessage("Authenticating with server...");

		const params = {
			code: searchParams.code,
			client_id: oauthMeta.client_id,
			redirect_uri: redirectUri,
			protocol: "persepolis",
			scope: searchParams.state || "normal",
		}

		logger.debug("🔐 Final params object:", params);

		login(params, {
			onSuccess: (data) => {
				logger.debug("✅ Authentication successful", {
					user_id: data.user_id,
					token: data.token.substring(0, 20) + "...",
				})

				// Store auth data via context
				setAuthLogin(
					data.token,
					data.user_id,
					data.target_id,
					data.session_id,
					Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
				)

				// Check for stored redirect URL
				const storedRedirect = localStorage.getItem("auth_redirect");
				if (storedRedirect) {
					localStorage.removeItem("auth_redirect");
					setMessage("Login successful, redirecting to your page...");
					setTimeout(() => {
						// Use window.location for full page reload to ensure auth state is picked up
						window.location.href = window.location.origin + storedRedirect;
					}, 1000)
				} else {
					setMessage("Login successful, redirecting to home...");
					setTimeout(() => {
						// Use window.location for full page reload to ensure auth state is picked up
						window.location.href = window.location.origin;
					}, 1000)
				}
			},
			onError: (err) => {
				const errorMsg = err instanceof Error ? err.message : "Unknown error";
				logger.error("❌ Authentication failed", errorMsg);

				// Check if user is banned
				if (errorMsg.toLowerCase().includes("banned")) {
					setError(`You are banned: ${errorMsg}`);
				} else if (errorMsg.toLowerCase().includes("used before")) {
					setError(
						"This authorization code has already been used. Please try logging in again.",
					);
					// Reset the ref so they can try again
					hasInitiatedLoginRef.current = false;
				} else {
					setError(`Authentication failed: ${errorMsg}`);
				}
			},
		})
	}, [searchParams.code, searchParams.error, oauthMeta, login, navigate, setAuthLogin]);

	// Error state
	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="glass rounded-3xl p-8 max-w-md w-full space-y-6">
					<div className="text-center">
						<div className="w-16 h-16 rounded-full bg-destructive/20 mx-auto mb-4 flex items-center justify-center">
							<svg
								className="w-8 h-8 text-destructive"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
						<h1 className="text-2xl font-bold text-destructive">
							Authentication Failed
						</h1>
					</div>

					<div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
						<p className="text-sm text-destructive">{error}</p>
					</div>

					<div className="space-y-3">
						<button
							onClick={() => {
								hasInitiatedLoginRef.current = false;
								window.location.href = window.location.origin;
							}}
							className="w-full px-6 py-3 rounded-xl gradient-brand text-white font-semibold hover:scale-105 transition-all duration-300"
						>
							Try Again
						</button>
						<button
							onClick={() => navigate({ to: ROUTES.home })}
							className="w-full px-6 py-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/80 transition-all duration-300"
						>
							Go to Home
						</button>
					</div>
				</div>
			</div>
		)
	}

	// Loading/Processing state
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="text-center">
				<div className="relative w-16 h-16 mx-auto mb-6">
					<div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full animate-spin opacity-75" />
					<div className="absolute inset-2 bg-background rounded-full" />
				</div>
				<h2 className="text-xl font-semibold text-foreground mb-2">
					{isLoggingIn ? "Authenticating" : "Processing"}
				</h2>
				<p className="text-muted-foreground">{message}</p>
			</div>
		</div>
	)
}
