import { AnyAction } from 'redux';
import { IContest } from '../../interfaces/IApp';
import { DROPDOWN_ACTIONS } from './Dropdown.actions';

type IDropdownState = {
	loading?: boolean;
	gameType?: string;
	error?: string | null;
	message?: string | null;
	contests?: IContest[];
	contest?: IContest;
};

const DEFAULT_STATE: IDropdownState = {
	loading: false,
};

const dropdown = (
	state = DEFAULT_STATE,
	{ type, contests, gameType, contest }: AnyAction
): IDropdownState => {
	switch (type) {
		case DROPDOWN_ACTIONS.LOADING_CONTESTS:
			return {
				...state,
				loading: true,
				message: 'Loading contests... This may take a while.',
			};

		case DROPDOWN_ACTIONS.SET_CONTESTS:
			return {
				...state,
				contests,
				loading: false,
				message: null,
				error: null,
			};

		case DROPDOWN_ACTIONS.SET_GAMETYPE:
			return {
				...state,
				gameType,
			};

		case DROPDOWN_ACTIONS.SET_CONTEST: {
			return {
				...state,
				contest,
			};
		}

		default:
			return state;
	}
};

export default dropdown;
