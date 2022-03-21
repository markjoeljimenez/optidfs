import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

import { makeStore } from '../../store';

function render(
	ui,
	{ initialState, store = makeStore(), ...options }: any = {}
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
