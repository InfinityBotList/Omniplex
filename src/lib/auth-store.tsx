import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { logger } from "./logger";

interface AuthContextType {
	isAuthenticated: boolean;
	token: string | null;
	userId: string | null;
	targetId: string | null;
	sessionId: string | null;
	isLoading: boolean;
	isTokenExpired: boolean;
	login: (token: string, userId: string, targetId: string, sessionId: string, expiresOn: number) => void;
	logout: () => void;
	getAuthHeader: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Store Provider
 * Manages authentication state and provides auth helpers
 */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>(null);
	const [targetId, setTargetId] = useState<string | null>(null);
	const [sessionId, setSessionId] = useState<string | null>(null);
	const [expiresOn, setExpiresOn] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check if token is expired
	const isTokenExpired = expiresOn ? Date.now() > expiresOn : false;

	// Initialize auth state from localStorage on mount
	useEffect(() => {
		const storedToken = localStorage.getItem("auth_token");
		const storedUserId = localStorage.getItem("user_id");
		const storedTargetId = localStorage.getItem("target_id");
		const storedSessionId = localStorage.getItem("session_id");
		const storedExpiresOn = localStorage.getItem("auth_expires_on");

		if (storedToken && storedUserId && storedTargetId && storedSessionId) {
			setToken(storedToken);
			setUserId(storedUserId);
			setTargetId(storedTargetId);
			setSessionId(storedSessionId);
			if (storedExpiresOn) {
				setExpiresOn(Number(storedExpiresOn));
			}
			logger.debug("✅ Auth state restored from localStorage");
		}

		setIsLoading(false);
	}, []);

	const login = (
		newToken: string,
		newUserId: string,
		newTargetId: string,
		newSessionId: string,
		newExpiresOn: number,
	) => {
		setToken(newToken);
		setUserId(newUserId);
		setTargetId(newTargetId);
		setSessionId(newSessionId);
		setExpiresOn(newExpiresOn);
		localStorage.setItem("auth_token", newToken);
		localStorage.setItem("user_id", newUserId);
		localStorage.setItem("target_id", newTargetId);
		localStorage.setItem("session_id", newSessionId);
		localStorage.setItem("auth_expires_on", String(newExpiresOn));
		logger.debug("✅ User logged in", {
			expiresOn: new Date(newExpiresOn).toISOString(),
		});
	};

	const logout = () => {
		setToken(null);
		setUserId(null);
		setTargetId(null);
		setSessionId(null);
		setExpiresOn(null);
		localStorage.removeItem("auth_token");
		localStorage.removeItem("user_id");
		localStorage.removeItem("target_id");
		localStorage.removeItem("session_id");
		localStorage.removeItem("auth_expires_on");
		logger.debug("🚪 User logged out");
	};

	const getAuthHeader = () => {
		if (!token) return {};
		return {
			Authorization: `User ${token}`,
		};
	};

	const value: AuthContextType = {
		isAuthenticated: !!token && !!userId && !isTokenExpired,
		token,
		userId,
		targetId,
		sessionId,
		isLoading,
		isTokenExpired,
		login,
		logout,
		getAuthHeader,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
