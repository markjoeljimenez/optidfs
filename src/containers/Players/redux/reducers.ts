import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import { IDraftKingsPlayer } from '../interfaces/IDraftKingsPlayer';
import { IPlayer } from '../interfaces/IPlayer';
import { IYahooPlayer } from '../interfaces/IYahooPlayer';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../services/mapPlayers';

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
			const { players, provider } = action.payload;

			const transformedPlayers =
				provider === 'draftkings'
					? mapDraftKingsPlayers(players as IDraftKingsPlayer[])
					: mapYahooPlayers(players as IYahooPlayer[]);

			state.defaultPlayers = transformedPlayers;
		},
	},
});

export const { setDefaultPlayers } = PlayersReducers.actions;
export const playersState = (state: AppState) => state.players;

export default PlayersReducers.reducer;
