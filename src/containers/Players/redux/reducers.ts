import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import { IDraftKingsPlayer } from '../models/IDraftKingsPlayer';
import { IPlayer } from '../models/IPlayer';
import { IYahooPlayer } from '../models/IYahooPlayer';
import { mapDraftKingsPlayers, mapYahooPlayers } from '../services/mapPlayers';

interface IInitialState {
	defaultPlayers: (IDraftKingsPlayer | IYahooPlayer)[] | null;
}

const initialState: IInitialState = {
	defaultPlayers: [],
};

export const PlayersReducers = createSlice({
	initialState,
	name: 'players',
	reducers: {
		setDefaultPlayers: (
			state,
			action: PayloadAction<(IDraftKingsPlayer | IYahooPlayer)[] | null>
		) => {
			state.defaultPlayers = action.payload;
		},
	},
});

export const { setDefaultPlayers } = PlayersReducers.actions;
export const playersState = (state: AppState) => state.players;

export default PlayersReducers.reducer;
