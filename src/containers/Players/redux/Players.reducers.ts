import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Row } from '@tanstack/react-table';

import { AppState } from '../../../store';
import { IPlayer } from '../models/IPlayer';

interface IInitialState {
	filteredPlayers: IPlayer[] | null;
}

const initialState: IInitialState = {
	filteredPlayers: null,
};

export const PlayersReducers = createSlice({
	initialState,
	name: 'players',
	reducers: {
		setFilteredPlayers: (
			state,
			action: PayloadAction<Row<IPlayer>[] | null>
		) => {
			state.filteredPlayers =
				action.payload?.map((row) => row.original) ?? null;
		},
	},
});

export const { setFilteredPlayers } = PlayersReducers.actions;
export const playersState = (state: AppState) => state.players;

export default PlayersReducers.reducer;
