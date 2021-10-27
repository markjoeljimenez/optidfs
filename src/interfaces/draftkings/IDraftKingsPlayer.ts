export interface IDraftKingsPlayer {
	draft: {
		draftable: boolean;
		exceptional_messages: string[];
		salary: number;
		starts_at: string;
	};
	first_name: string;
	id: number;
	jersey_number: number;
	last_name: string;
	match_up: {
		away_team_id: number;
		home_team_id: number;
		id: number;
		opposition_rank: number;
	};
	salary: number;
	points_per_contest: number;
	position: string;
	team: string;
	status: string | null;
	min_exposure?: number;
	projected_ownership?: number;
	draft_positions: string;
}
