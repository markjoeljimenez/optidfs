import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../../store';

interface IProviderState {
	provider: string | null;
}

const initialState: IProviderState = {
	provider: null,
};

export const ProviderReducers = createSlice({
	name: 'providers',
	initialState,
	reducers: {
		setProvider: (state, action: PayloadAction<string>) => {
			state.provider = action.payload;
		},
	},
});

export const { setProvider } = ProviderReducers.actions;
export const selectProviders = (state: AppState) => state.providers;

export default ProviderReducers.reducer;
