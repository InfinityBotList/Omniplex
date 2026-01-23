// User/Platform types
export interface User {
	id: string;
	username: string;
	display_name: string;
	avatar: string;
	bot: boolean;
	status: string;
	flags: string[];
	extra_data: Record<string, unknown>;
}

// Asset/File types
export interface Asset {
	default_path: string;
	path: string;
	exists: boolean;
	type: string;
	size: number;
	last_modified: string;
	errors: string[];
}

// Bot types
export interface Bot {
	bot_id: string;
	user: User;
	short: string;
	long?: string;
	tags: string[];
	premium: boolean;
	nsfw: boolean;
	clicks: number;
	invite_clicks: number;
	servers: number;
	shards: number;
	votes: number;
	approximate_votes: number;
	banner: Asset;
	avatar?: Asset;
	vanity?: string;
	vanity_ref: string;
	library?: string;
	type?: string;
	approval_note?: string;
	cert_reason?: string;
	claimed_by?: string;
}

export interface BotIndex {
	certified: Bot[];
	top_voted: Bot[];
	recent: Bot[];
}

export interface BotsAllResponse {
	count: number;
	per_page: number;
	results: Bot[];
}

export interface BotsRandomResponse {
	bots: Bot[];
}

// Pack types
export interface Pack {
	bot_ids: string[];
	bots: Bot[];
	name: string;
	short: string;
	tags: string[];
	url: string;
	created_at?: string;
	user?: User;
}

export interface PacksAllResponse {
	count: number;
	per_page: number;
	results: Pack[];
}

// Auth types
export interface OAuthMetadata {
	url: string;
	client_id: string;
}

export interface AuthLoginResponse {
	token: string;
	user_id: string;
	target_id: string;
	session_id: string;
	expiresOn?: number;
}

export interface AuthTokenRefreshResponse {
	context: Record<string, unknown>;
	message: string;
}

// User Profile types (from /users/{id} endpoint)
export interface ExtraLink {
	name: string;
	value: string;
}

export interface UserProfile {
	about: string;
	banned: boolean;
	bot_developer: boolean;
	bug_hunters: boolean;
	captcha_sponsor_enabled: boolean;
	certified: boolean;
	created_at: string;
	experiments: string[];
	extra_links: ExtraLink[];
	itag: string;
	last_booster_claim: string;
	staff: boolean;
	updated_at: string;
	user: User;
	user_bots: Bot[];
	user_packs: Pack[];
	user_teams: Team[];
	vote_banned: boolean;
}

export interface TeamMember {
	created_at: string;
	data_holder: boolean;
	flags: string[];
	itag: string;
	mentionable: boolean;
	service: string;
	team_id: string;
	user: User;
}

export interface Server {
	server_id: string;
	name: string;
	short: string;
	tags: string[];
	avatar: Asset;
	banner: Asset;
	clicks: number;
	invite_clicks: number;
	votes: number;
	approximate_votes: number;
	online_members: number;
	total_members: number;
	premium: boolean;
	nsfw: boolean;
	state: string;
	type: string;
	vanity: string;
	vanity_ref: string;
}

export interface TeamEntities {
	bots: Bot[];
	members: TeamMember[];
	servers: Server[];
	targets: string[];
}

export interface Team {
	id: string;
	name: string;
	short: string;
	tags: string[];
	avatar: Asset;
	banner: Asset;
	extra_links: ExtraLink[];
	entities: TeamEntities;
	service: string;
	nsfw: boolean;
	votes: number;
	approximate_votes: number;
	vote_banned: boolean;
	vanity: string;
	vanity_ref: string;
	created_at: string;
	updated_at: string;
}

// API Response wrapper
export interface ApiResponse<T> {
	data: T;
	error?: {
		code: string;
		message: string;
	};
}
