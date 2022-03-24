import React, { PropsWithChildren } from 'react';
import { render as renderRtl, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import { RootState, AppStore } from '../store';
import type { PreloadedState } from '@reduxjs/toolkit';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

function render(
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}
	return {
		store,
		...renderRtl(ui, { wrapper: Wrapper, ...renderOptions }),
	};
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
