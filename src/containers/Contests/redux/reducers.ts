import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../../../store';
import { IContest } from '../interfaces/IContest';

interface IContestState {
	selectedContest: IContest | null;
	gameType;
}

const initialState: IContestState = {
	selectedContest: null,
	gameType: null,
};

export const ContestsReducers = createSlice({
	name: 'contests',
	initialState,
	reducers: {
		setSelectedContest: (state, action: PayloadAction<IContest>) => {
			state.selectedContest = action.payload;
		},
		setGameType: (state, action: PayloadAction<string>) => {
			state.gameType = action.payload;
		},
	},
});

export const { setSelectedContest, setGameType } = ContestsReducers.actions;
export const contestsState = (state: AppState) => state.contests;

export default ContestsReducers.reducer;

// interface IDropdownState {
// 	loading?: boolean;
// 	gameType?: string;
// 	error?: string | null;
// 	message?: string | null;
// 	contests?: IContest[];
// 	contest?: IContest[];
// }

// interface DropdownAction extends IDropdownState {
// 	id: string;
// 	type: string;
// 	provider: string;
// }

// const DEFAULT_STATE: IDropdownState = {
// 	loading: false,
// };

// const dropdown = (
// 	state = DEFAULT_STATE,
// 	{
// 		type,
// 		contests,
// 		gameType,
// 		contest,
// 		provider,
// 	}: DropdownAction & {
// 		contests: (IDraftKingsContest | IYahooContest)[];
// 	}
// ): IDropdownState => {
// 	switch (type) {
// 		case DROPDOWN_ACTIONS.LOADING_CONTESTS:
// 			return {
// 				...state,
// 				loading: true,
// 				message: 'Loading contests... This may take a while.',
// 			};

// 		case DROPDOWN_ACTIONS.SET_CONTESTS:
// 			const transformedContests =
// 				provider === 'draftkings'
// 					? mapDraftKingsContestsToContests(
// 							contests as IDraftKingsContest[]
// 					  )
// 					: mapYahooContestsToContests(contests as IYahooContest[]);

// 			return {
// 				...state,
// 				contests: transformedContests,
// 				loading: false,
// 				message: null,
// 				error: null,
// 			};

// 		case DROPDOWN_ACTIONS.SET_GAMETYPE:
// 			return {
// 				...state,
// 				gameType,
// 			};

// 		case DROPDOWN_ACTIONS.SET_CONTEST: {
// 			return {
// 				...state,
// 				contest,
// 			};
// 		}

// 		case DROPDOWN_ACTIONS.RESET: {
// 			return {
// 				loading: false,
// 				contest: undefined,
// 				contests: undefined,
// 				error: undefined,
// 				gameType: undefined,
// 				message: undefined,
// 			};
// 		}

// 		default:
// 			return state;
// 	}
// };

// export default dropdown;
