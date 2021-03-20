import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from '../../store';

function render(
	ui,
	{
		initialState,
		store = createStore(Reducer, initialState),
		...options
	}: any = {}
) {
	function Wrapper({ children }: any) {
		return <Provider store={store}>{children}</Provider>;
	}

	return rtlRender(ui, { wrapper: Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
