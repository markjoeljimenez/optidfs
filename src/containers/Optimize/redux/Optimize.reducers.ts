import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPlayer } from '@/containers/Players';

import { AppState } from '../../../store';
import IOptimizedLineup from '../models/IOptimizedLineup';

interface IOptimizeState {
	currentOptimizedLineup: IOptimizedLineup | null;
	optimizedLineups: IOptimizedLineup[] | null;
}

const initialState: IOptimizeState = {
	currentOptimizedLineup: null,
	optimizedLineups: [],
};

export const OptimizeReducers = createSlice({
	initialState,
	name: 'optimize',
	reducers: {
		setCurrentOptimizedLineup: (
			state,
			action: PayloadAction<IOptimizedLineup | null>
		) => {
			state.currentOptimizedLineup = action.payload;
		},
		setOptimizedLineups: (
			state,
			action: PayloadAction<IOptimizedLineup[] | null>
		) => {
			state.optimizedLineups = action.payload;
		},
	},
});

export const { setCurrentOptimizedLineup, setOptimizedLineups } =
	OptimizeReducers.actions;
export const optimizedState = (state: AppState) => state.optimize;

export default OptimizeReducers.reducer;
