import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import { View } from '../models/view';

const initialState = {
	view: View.All,
};

export const TableReducers = createSlice({
	initialState,
	name: 'table',
	reducers: {
		setView: (state, action: PayloadAction<View>) => {
			state.view = action.payload;
		},
	},
});

export const { setView } = TableReducers.actions;
export const selectTable = (state: AppState) => state.table;

export default TableReducers.reducer;
