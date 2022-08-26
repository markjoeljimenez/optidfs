import {
	Action,
	combineReducers,
	configureStore,
	PreloadedState,
	ThunkAction,
} from '@reduxjs/toolkit';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { ContestsReducers } from '@/containers/Contests';
import { GlobalReducers } from '@/containers/Global';
import { OptimizeReducers } from '@/containers/Optimize';
import { ProviderReducers } from '@/containers/Providers';
import { SportsReducers } from '@/containers/Sports';
import { TableReducers } from '@/containers/Table';

import { OptidfsApi } from './api';
// import error from './containers/Error/Error.reducers';

const rootReducer = combineReducers({
	contests: ContestsReducers.reducer,
	// error,
	global: GlobalReducers,
	optimize: OptimizeReducers.reducer,
	providers: ProviderReducers.reducer,
	// rules,
	sports: SportsReducers.reducer,
	// stacking,
	table: TableReducers.reducer,
	// tabs,
	[OptidfsApi.reducerPath]: OptidfsApi.reducer,
});

const persistedReducer = persistReducer(
	{
		blacklist: ['table', 'optimize'],
		key: 'root',
		storage,
		version: 1,
	},
	rootReducer
);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		middleware: (getDefaultMiddleware) =>
			// adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [
						FLUSH,
						REHYDRATE,
						PAUSE,
						PERSIST,
						PURGE,
						REGISTER,
					],
				},
			}).concat(OptidfsApi.middleware),
		preloadedState,
		reducer: persistedReducer,
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

export const persistor = persistStore(store);
export default store;
