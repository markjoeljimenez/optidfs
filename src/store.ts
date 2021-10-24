import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import contests from './containers/Dropdown/Dropdown.reducers';
import error from './containers/Error/Error.reducers';
import players from './containers/Players/Players.reducers';
import providers from './containers/Providers/Providers.reducers';
import rules from './containers/Rules/Rules.reducers';
import sports from './containers/Sports/Sports.reducers';
import stacking from './containers/Stacking/Stacking.reducers';
import table from './containers/Table/Table.reducers';
import tabs from './containers/Tabs/Tabs.reducers';

import rootSaga from './saga/saga';

export const reducer = combineReducers({
	contests,
	error,
	players,
	providers,
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

export const makeStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducer, bindMiddleware([sagaMiddleware]));

	sagaMiddleware.run(rootSaga);

	return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
