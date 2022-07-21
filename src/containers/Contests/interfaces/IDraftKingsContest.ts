export interface IEntriesDetails {
	fee: number;
	maximum: number;
	total: number;
}

export interface IDraftKingsContest {
	contest_id: number;
	draft_group_id: number;
	entries_details: IEntriesDetails;
	fantasy_player_points: number;
	is_double_up: boolean;
	is_fifty_fifty: boolean;
	is_guaranteed: boolean;
	is_head_to_head: boolean;
	is_starred: boolean;
	name: string;
	payout: number;
	sport: string;
	starts_at: string;
}
