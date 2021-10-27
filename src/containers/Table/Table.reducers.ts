import { AnyAction } from 'redux';

import { TABLE_ACTIONS } from './Table.actions';

export type View = 'all' | 'optimized';

type ITableState = {
	page: number;
	view: View;
	loading: boolean;
};

const DEFAULT_STATE: ITableState = {
	page: 0,
	view: 'all',
	loading: false,
};

const TableReducer = (
	state = DEFAULT_STATE,
	{ type, loading, view, page }: AnyAction
): ITableState => {
	switch (type) {
		case TABLE_ACTIONS.LOADING_TABLE:
			return {
				...state,
				loading,
			};

		case TABLE_ACTIONS.SET_VIEW:
			return {
				...state,
				view,
			};

		case TABLE_ACTIONS.SET_PAGE:
			return {
				...state,
				page,
			};

		case TABLE_ACTIONS.RESET:
			return DEFAULT_STATE;

		default:
			return state;
	}
};

export default TableReducer;
