export type IDraftKingsPlayerStatus = 'None' | 'OUT' | 'Q';

export interface IDraftKingsPlayer {
	draft_positions: string;
	first_name: string;
	id: number;
	last_name: string;
	points_per_contest: number;
	position: string;
	salary: number;
	status: IDraftKingsPlayerStatus;
	team: string;
	draft?: {
		draftable: boolean;
		exceptional_messages: string[];
		salary: number;
		starts_at: string;
	};
	images?: {
		50: string | undefined | null;
		65: string | undefined | null;
		160: string | undefined | null;
		full: string | undefined | null;
	};
	jersey_number?: number;
	match_up?: {
		away_team_id: number;
		home_team_id: number;
		id: number;
		opposition_rank: number;
	};
	min_exposure?: number;
	projected_ownership?: number;
}
