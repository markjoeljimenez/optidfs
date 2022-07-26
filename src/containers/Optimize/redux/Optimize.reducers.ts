import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPlayer } from '@/containers/Players';

import { AppState } from '../../../store';
import IOptimizedLineup from '../models/IOptimizedLineup';

interface IOptimizeState {
	optimizedLineups: IOptimizedLineup[] | null;
}

const initialState: IOptimizeState = {
	optimizedLineups: [],
};

export const OptimizeReducers = createSlice({
	initialState,
	name: 'optimize',
	reducers: {
		setOptimizedLineups: (
			state,
			action: PayloadAction<IOptimizedLineup[] | null>
		) => {
			state.optimizedLineups = action.payload;
		},
	},
});

export const { setOptimizedLineups } = OptimizeReducers.actions;
export const optimizedState = (state: AppState) => state.optimize;

export default OptimizeReducers.reducer;
