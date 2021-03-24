/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from '../../store';

function render(
	ui,
	{
		initialState,
		store = createStore(reducer, initialState),
		...options
	}: any = {}
) {
	function wrapper({ children }: { children: React.ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	}

	return rtlRender(ui, { wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
