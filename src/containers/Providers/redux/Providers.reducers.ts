import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	EProviders,
	TProviders,
} from '@/containers/Players/models/providers.enum';

import { AppState } from '../../../store';

interface IProviderState {
	provider: EProviders | null;
}

export const initialState: IProviderState = {
	provider: null,
};

const ProviderReducers = createSlice({
	initialState,
	name: 'providers',
	reducers: {
		setProvider: (state, action: PayloadAction<EProviders | null>) => {
			state.provider = action.payload;
		},
	},
});

export const { setProvider } = ProviderReducers.actions;
export const providersState = (state: AppState) => state.providers;

export default ProviderReducers.reducer;
