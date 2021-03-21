import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import table from './containers/Table/Table.reducers';
import dropdown from './containers/Dropdown/Dropdown.reducers';
import rules from './containers/Rules/Rules.reducers';
import tabs from './containers/Tabs/Tabs.reducers';
import sports from './containers/Sports/Sports.reducers';
import providers from './containers/Providers/Providers.reducers';
import error from './containers/Error/Error.reducers';
import stacking from './containers/Stacking/Stacking.reducers';

import rootSaga from './saga/saga';

export const reducer = combineReducers({
	dropdown,
	error,
	rules,
	sports,
	stacking,
	table,
	tabs,
});

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		const { composeWithDevTools } = require('redux-devtools-extension');
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

export const makeStore = (context) => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducer, bindMiddleware([sagaMiddleware]));

	sagaMiddleware.run(rootSaga);

	return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof reducer>;
// export type AppDispatch = typeof makeStore().dispatch;
