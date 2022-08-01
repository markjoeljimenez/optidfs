import { TPlayerStatus } from './IPlayerStatus';

export interface Images {
	fifty_pixels_by_fifty_pixels_url: string;
	one_hundred_and_sixty_pixels_by_one_hundred_and_sixty_pixels_url: string;
}

export interface IDraftKingsPlayer {
	draft_positions: string;
	first_name: string;
	id: number;
	images: Images;
	last_name: string;
	points_per_contest: number;
	position: string;
	salary: number;
	status: TPlayerStatus;
	team: string;
}
