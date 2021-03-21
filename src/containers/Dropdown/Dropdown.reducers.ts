import { AnyAction } from 'redux';
import { IContest } from '../../interfaces/IApp';
import { LOADING_CONTESTS, SET_CONTESTS } from './Dropdown.actions';

type IDropdownState = {
	loading?: boolean;
	error?: string | null;
	message?: string | null;
	contests?: IContest[];
};

const DEFAULT_STATE: IDropdownState = {
	loading: false,
	error: null,
};

const dropdown = (
	state = DEFAULT_STATE,
	{ type, contests }: AnyAction
): IDropdownState => {
	switch (type) {
		case LOADING_CONTESTS:
			return {
				...state,
				loading: true,
				message: 'Loading contests... This may take a while.',
			};

		case SET_CONTESTS:
			return {
				...state,
				contests,
				loading: false,
				message: null,
				error: null,
			};

		default:
			return state;
	}
};

export default dropdown;
