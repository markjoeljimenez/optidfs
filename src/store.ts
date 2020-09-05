import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { useMemo } from 'react';

import table from './containers/Table/Table.reducers';
import dropdown from './containers/Dropdown/Dropdown.reducers';
import rules from './containers/Rules/Rules.reducers';
import header from './containers/Header/Header.reducers';

import rootSaga from './saga';

let store;

const reducer = combineReducers({
	header,
	rules,
	dropdown,
	table,
});

function initStore(preloadedState = {}) {
	const saga = createSagaMiddleware();

	const _store = createStore(reducer, preloadedState, applyMiddleware(saga));

	saga.run(rootSaga);

	return _store;
}

export const initializeStore = (preloadedState?: any) => {
	let _store = store ?? initStore(preloadedState);

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		});
		// Reset the current store
		store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
};

export function useStore(_initialState) {
	return useMemo(() => initializeStore(_initialState), [_initialState]);
}
