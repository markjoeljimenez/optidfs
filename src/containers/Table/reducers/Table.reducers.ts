import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnFiltersState } from '@tanstack/react-table';

import { AppState } from '../../../store';

interface ITableInitialState {
	view: string | number;
}

const initialState: ITableInitialState = {
	view: '',
};

export const TableReducers = createSlice({
	initialState,
	name: 'table',
	reducers: {
		setView: (state, action: PayloadAction<string | number>) => {
			state.view = action.payload;
		},
	},
});

export const { setView } = TableReducers.actions;
export const selectTable = (state: AppState) => state.table;

export default TableReducers.reducer;
