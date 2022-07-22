import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';

interface IInitialState {
	hasVisited: boolean;
}

const initialState: IInitialState = {
	hasVisited: false,
};

export const GlobalReducers = createSlice({
	initialState,
	name: 'global',
	reducers: {
		setHasVisited: (state, action: PayloadAction<boolean>) => {
			state.hasVisited = action.payload;
		},
	},
});

export const { setHasVisited } = GlobalReducers.actions;
export const globalState = (state: AppState) => state.global;

export default GlobalReducers.reducer;
