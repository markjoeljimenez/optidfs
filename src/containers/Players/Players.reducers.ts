import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDraftKingsPlayer } from '../../interfaces/draftkings/IDraftKingsPlayer';
import { IPlayer } from '../../interfaces/IPlayer';
import { IYahooPlayer } from '../../interfaces/yahoo/IYahooPlayer';
import {
	mapDraftKingsPlayersToPlayers,
	mapYahooPlayersToPlayers,
} from '../../scripts/services/mapPlayers';
import { AppState } from '../../store';

interface IInitialState {
	defaultPlayers: IPlayer[];
}

const initialState: IInitialState = {
	defaultPlayers: [],
};

export const PlayersReducers = createSlice({
	name: 'players',
	initialState,
	reducers: {
		setDefaultPlayers: (
			state,
			action: PayloadAction<{
				players: (IDraftKingsPlayer | IYahooPlayer)[];
				provider: string;
			}>
		) => {
			const { provider, players } = action.payload;

			const transformedPlayers =
				provider === 'draftkings'
					? mapDraftKingsPlayersToPlayers(
							players as IDraftKingsPlayer[]
					  )
					: mapYahooPlayersToPlayers(players as IYahooPlayer[]);

			state.defaultPlayers = transformedPlayers;
		},
	},
});

export const { setDefaultPlayers } = PlayersReducers.actions;
export const selectPlayers = (state: AppState) => state.players;

export default PlayersReducers.reducer;
