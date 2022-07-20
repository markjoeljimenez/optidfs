import {
	Action,
	combineReducers,
	configureStore,
	createSlice,
	PayloadAction,
	PreloadedState,
	ThunkAction,
} from '@reduxjs/toolkit';

import { ContestsReducers } from '@/containers/Contests';
import { PlayersReducers } from '@/containers/Players';
import { ProvidersReducer } from '@/containers/Providers';
import { SportsReducers } from '@/containers/Sports';

import { OptidfsApi } from './api';
import error from './containers/Error/Error.reducers';
import rules from './containers/Rules/Rules.reducers';
import stacking from './containers/Stacking/Stacking.reducers';
import table from './containers/Table/Table.reducers';
import tabs from './containers/Tabs/Tabs.reducers.old';

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

interface IGlobalInitialState {
	hasVisited: boolean;
	step: number | null;
}

const initialState: IGlobalInitialState = {
	hasVisited: false,
	step: null,
};

const GlobalReducers = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setHasVisited: (state, action: PayloadAction<boolean>) => {
			state.hasVisited = action.payload;
		},
		setStep: (state, action: PayloadAction<number | null>) => {
			state.step = action.payload;
		},
	},
});

export const { setHasVisited } = GlobalReducers.actions;

const rootReducer = combineReducers({
	contests: ContestsReducers,
	error,
	players: PlayersReducers,
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
