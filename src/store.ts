import {
	configureStore,
	ThunkAction,
	Action,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';

import contests from './containers/Dropdown/Dropdown.reducers';
import error from './containers/Error/Error.reducers';
import players from './containers/Players/Players.reducers';
import providers from './containers/Providers/Providers.reducers';
import rules from './containers/Rules/Rules.reducers';
import sports from './containers/Sports/Sports.reducers';
import stacking from './containers/Stacking/Stacking.reducers';
import table from './containers/Table/Table.reducers';
import tabs from './containers/Tabs/Tabs.reducers.old';
import { OptidfsApi } from './api';

// export const reducers = combineReducers({
// 	contests,
// 	error,
// 	players,
// 	providers,
// 	rules,
// 	sports,
// 	stacking,
// 	table,
// 	tabs,
// });

const initialState = {
	hasVisited: false,
};

const GlobalReducers = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setHasVisited: (state, action: PayloadAction<boolean>) => {
			state.hasVisited = action.payload;
		},
	},
});

export const { setHasVisited } = GlobalReducers.actions;

export function makeStore() {
	return configureStore({
		reducer: {
			contests,
			error,
			players,
			providers,
			// rules,
			sports,
			// stacking,
			table,
			// tabs,
			global: GlobalReducers.reducer,
			[OptidfsApi.reducerPath]: OptidfsApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(OptidfsApi.middleware),
	});
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
