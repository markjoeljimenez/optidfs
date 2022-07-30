import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import { IContest } from '../interfaces/IContest';

interface IContestState {
	gameType: string | null;
	selectedContest: IContest | null;
}

const initialState: IContestState = {
	gameType: null,
	selectedContest: null,
};

export const ContestsReducers = createSlice({
	initialState,
	name: 'contests',
	reducers: {
		setGameType: (state, action: PayloadAction<string>) => {
			state.gameType = action.payload;
		},
		setSelectedContest: (state, action: PayloadAction<IContest | null>) => {
			state.selectedContest = action.payload;
		},
	},
});

export const { setGameType, setSelectedContest } = ContestsReducers.actions;
export const contestsState = (state: AppState) => state.contests;

export default ContestsReducers.reducer;
