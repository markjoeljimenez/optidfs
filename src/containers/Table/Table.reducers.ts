import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../store';

export enum View {
	All = 'all',
}

const initialState = {
	view: View.All,
};

export const TableReducers = createSlice({
	name: 'table',
	initialState,
	reducers: {
		setView: (state, action: PayloadAction<View>) => {
			state.view = action.payload;
		},
	},
});

export const { setView } = TableReducers.actions;
export const selectTable = (state: AppState) => state.table;

export default TableReducers.reducer;
