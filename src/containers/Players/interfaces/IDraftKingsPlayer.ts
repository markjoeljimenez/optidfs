export type IDraftKingsPlayerStatus = 'None' | 'OUT' | 'Q';

export interface IDraftKingsPlayer {
	draft?: {
		draftable: boolean;
		exceptional_messages: string[];
		salary: number;
		starts_at: string;
	};
	first_name: string;
	id: number;
	jersey_number?: number;
	last_name: string;
	match_up?: {
		away_team_id: number;
		home_team_id: number;
		id: number;
		opposition_rank: number;
	};
	salary: number;
	points_per_contest: number;
	position: string;
	team: string;
	status: IDraftKingsPlayerStatus;
	min_exposure?: number;
	projected_ownership?: number;
	draft_positions: string;
	images?: {
		50: string | undefined | null;
		65: string | undefined | null;
		160: string | undefined | null;
		full: string | undefined | null;
	};
}
