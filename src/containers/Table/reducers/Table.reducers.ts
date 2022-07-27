import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnFiltersState } from '@tanstack/react-table';

import { AppState } from '../../../store';

interface ITableInitialState {
	filters: ColumnFiltersState;
	view: string | number;
}

const initialState: ITableInitialState = {
	filters: [],
	view: '',
};

export const TableReducers = createSlice({
	initialState,
	name: 'table',
	reducers: {
		setFilters: (state, action: PayloadAction<ColumnFiltersState>) => {
			state.filters = action.payload;
		},
		setView: (state, action: PayloadAction<string | number>) => {
			state.view = action.payload;
		},
	},
});

export const { setFilters, setView } = TableReducers.actions;
export const selectTable = (state: AppState) => state.table;

export default TableReducers.reducer;
