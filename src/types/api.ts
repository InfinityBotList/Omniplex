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

// API Response wrapper
export interface ApiResponse<T> {
	data: T;
	error?: {
		code: string;
		message: string;
	};
}
