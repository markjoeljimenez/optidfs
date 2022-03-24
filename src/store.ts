import {
	configureStore,
	ThunkAction,
	Action,
	createSlice,
	PayloadAction,
	PreloadedState,
	combineReducers,
} from '@reduxjs/toolkit';

import { ContestsReducers } from '@/containers/Contests';
import error from './containers/Error/Error.reducers';
import players from './containers/Players/Players.reducers';
import { ProvidersReducer } from '@/containers/Providers';
import rules from './containers/Rules/Rules.reducers';
import { SportsReducers } from '@/containers/Sports';
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

const rootReducer = combineReducers({
	contests: ContestsReducers,
	error,
	players,
	providers: ProvidersReducer,
	// rules,
	sports: SportsReducers,
	// stacking,
	table,
	// tabs,
	global: GlobalReducers.reducer,
	[OptidfsApi.reducerPath]: OptidfsApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			// adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
			getDefaultMiddleware().concat(OptidfsApi.middleware),
		preloadedState,
	});
};

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
