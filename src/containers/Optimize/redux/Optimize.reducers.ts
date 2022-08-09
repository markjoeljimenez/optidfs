import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPlayer, TPlayerStatus } from '@/containers/Players/';

import { AppState } from '../../../store';
import IOptimizeSettings from '../models/IOptimizeSettings';

interface IOptimizeState {
	settings: IOptimizeSettings;
}

const initialState: IOptimizeState = {
	settings: {
		lockedPlayers: [],
		numberOfLineups: 1,
		statusFilters: [],
	},
};

export const OptimizeReducers = createSlice({
	initialState,
	name: 'optimize',
	reducers: {
		setLockedPlayers: (state, action: PayloadAction<IPlayer['id'][]>) => {
			state.settings.lockedPlayers = action.payload;
		},
		setNumberOfGenerations: (state, action: PayloadAction<number>) => {
			state.settings.numberOfLineups = action.payload;
		},
		setStatusFilters: (state, action: PayloadAction<TPlayerStatus[]>) => {
			state.settings.statusFilters = action.payload;
		},
	},
});

export const { setLockedPlayers, setNumberOfGenerations, setStatusFilters } =
	OptimizeReducers.actions;
export const optimizedState = (state: AppState) => state.optimize;

export default OptimizeReducers.reducer;
