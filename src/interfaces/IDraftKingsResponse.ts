export interface IDraftKingsResponse {
	players: IDraftKingsPlayer[];
	team_series_list: IDraftKingsTeamSeriesList[];
}

export interface IDraftKingsPlayer {
	draft: {
		draftable: boolean;
		exceptional_messages: string[];
		salary: number;
		starts_at: string;
	};
	first_name: string;
	id: string;
	jersey_number: number;
	last_name: string;
	match_up: {
		away_team_id: number;
		home_team_id: number;
		id: number;
		opposition_rank: Number;
	};
	salary: number;
	points_per_contest: number;
	position: {
		id: number;
		name: string;
	};
	team: string;
	status: string | null;
	isLocked: boolean;
	isExcluded: boolean;
}

interface IDraftKingsTeamSeriesList {
	away_team_id: number;
	home_team_id: number;
	id: number;
	starts_at: string;
	status_id: number;
	weather: null;
}

export interface IDraftKingsDraftStatAttributes {
	id: number;
	value: string;
	sortValue: number;
	quality?: string;
}
