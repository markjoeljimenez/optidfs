import { AnyAction } from 'redux';

import { TABLE_ACTIONS } from './Table.actions';

export type View = 'all' | 'optimized';

type ITableState = {
	loading: boolean;
	page: number;
	view: View;
};

const DEFAULT_STATE: ITableState = {
	page: 0,
	view: 'all',
	loading: false,
};

const TableReducer = (
	state = DEFAULT_STATE,
	{ loading, page, type, view }: AnyAction
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
