import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Providers } from '@/containers/Players';

import { AppState } from '../../../store';

interface IProviderState {
	provider: Providers | null;
}

export const initialState: IProviderState = {
	provider: null,
};

const ProviderReducers = createSlice({
	initialState,
	name: 'providers',
	reducers: {
		setProvider: (state, action: PayloadAction<Providers>) => {
			state.provider = action.payload;
		},
	},
});

export const { setProvider } = ProviderReducers.actions;
export const providersState = (state: AppState) => state.providers;

export default ProviderReducers.reducer;
