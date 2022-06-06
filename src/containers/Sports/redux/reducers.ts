import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from 'src/store';

import { ISport } from '../interfaces/ISports';

interface ISportsState {
	selectedSport?: ISport;
}

const initialState: ISportsState = {};

export const SportsReducers = createSlice({
	name: 'sports',
	initialState,
	reducers: {
		setSelectedSport: (state, action: PayloadAction<ISport>) => {
			state.selectedSport = action.payload;
		},
	},
});

export const { setSelectedSport } = SportsReducers.actions;
export const sportsState = (state: AppState) => state.sports;

export default SportsReducers.reducer;
