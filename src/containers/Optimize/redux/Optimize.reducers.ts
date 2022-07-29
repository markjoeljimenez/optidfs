import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import IOptimizedLineup from '../models/IOptimizedLineup';
import IOptimizeSettings from '../models/IOptimizeSettings';

interface IOptimizeState {
	optimizedLineups: IOptimizedLineup[] | null;
	settings: IOptimizeSettings;
}

const initialState: IOptimizeState = {
	optimizedLineups: [],
	settings: {
		numberOfLineups: 1,
	},
};

export const OptimizeReducers = createSlice({
	initialState,
	name: 'optimize',
	reducers: {
		setNumberOfGenerations: (state, action: PayloadAction<number>) => {
			state.settings.numberOfLineups = action.payload;
		},
		setOptimizedLineups: (
			state,
			action: PayloadAction<IOptimizedLineup[] | null>
		) => {
			state.optimizedLineups = action.payload;
		},
	},
});

export const { setNumberOfGenerations, setOptimizedLineups } =
	OptimizeReducers.actions;
export const optimizedState = (state: AppState) => state.optimize;

export default OptimizeReducers.reducer;
