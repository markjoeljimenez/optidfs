import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import { IPlayer } from '../models/IPlayer';

interface IInitialState {
	defaultPlayers: IPlayer[] | null;
}

const initialState: IInitialState = {
	defaultPlayers: [],
};

export const PlayersReducers = createSlice({
	initialState,
	name: 'players',
	reducers: {
		setDefaultPlayers: (state, action: PayloadAction<IPlayer[] | null>) => {
			state.defaultPlayers = action.payload;
		},
	},
});

export const { setDefaultPlayers } = PlayersReducers.actions;
export const playersState = (state: AppState) => state.players;

export default PlayersReducers.reducer;
