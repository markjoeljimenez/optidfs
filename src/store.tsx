import {
	Action,
	combineReducers,
	configureStore,
	isRejectedWithValue,
	Middleware,
	MiddlewareAPI,
	PreloadedState,
	ThunkAction,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
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

const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			toast.error(action.payload.data.detail);
		}

		return next(action);
	};

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
			})
				.concat(OptidfsApi.middleware)
				.concat(rtkQueryErrorLogger),
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
