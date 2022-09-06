import { IPlayer, TPlayerStatus } from './';

export interface IGetPlayersResponse {
	players: IPlayer[];
	statusFilters: TPlayerStatus[];
}
