import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TPlayerStatus } from '@/containers/Players/';

import { AppState } from '../../../store';
import IOptimizedLineup from '../models/IOptimizedLineup';
import IOptimizeSettings from '../models/IOptimizeSettings';

interface IOptimizeState {
	settings: IOptimizeSettings;
}

const initialState: IOptimizeState = {
	settings: {
		numberOfLineups: 1,
		statusFilters: [],
	},
};

export const OptimizeReducers = createSlice({
	initialState,
	name: 'optimize',
	reducers: {
		setNumberOfGenerations: (state, action: PayloadAction<number>) => {
			state.settings.numberOfLineups = action.payload;
		},
		setStatusFilters: (state, action: PayloadAction<TPlayerStatus[]>) => {
			state.settings.statusFilters = action.payload;
		},
	},
});

export const { setNumberOfGenerations, setStatusFilters } =
	OptimizeReducers.actions;
export const optimizedState = (state: AppState) => state.optimize;

export default OptimizeReducers.reducer;
