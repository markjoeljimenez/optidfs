import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';

interface IProviderState {
	provider: string | null;
}

export const initialState: IProviderState = {
	provider: null,
};

const ProviderReducers = createSlice({
	initialState,
	name: 'providers',
	reducers: {
		setProvider: (state, action: PayloadAction<string>) => {
			state.provider = action.payload;
		},
	},
});

export const { setProvider } = ProviderReducers.actions;
export const providersState = (state: AppState) => state.providers;

export default ProviderReducers.reducer;
