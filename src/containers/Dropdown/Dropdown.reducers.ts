import { IDraftKingsContest } from '../../interfaces/draftkings/IDraftKingsContest';
import { IContest } from '../../interfaces/IContest';
import { IYahooContest } from '../../interfaces/yahoo/IYahooContest';
import { DROPDOWN_ACTIONS } from './Dropdown.actions';
import {
	mapDraftKingsContestsToContests,
	mapYahooContestsToContests,
} from './mapContests';

interface IDropdownState {
	loading?: boolean;
	gameType?: string;
	error?: string | null;
	message?: string | null;
	contests?: IContest[];
	contest?: IContest[];
}

interface DropdownAction extends IDropdownState {
	id: string;
	type: string;
	provider: string;
}

const DEFAULT_STATE: IDropdownState = {
	loading: false,
};

const dropdown = (
	state = DEFAULT_STATE,
	{
		type,
		contests,
		gameType,
		contest,
		provider,
	}: DropdownAction & {
		contests: (IDraftKingsContest | IYahooContest)[];
	}
): IDropdownState => {
	switch (type) {
		case DROPDOWN_ACTIONS.LOADING_CONTESTS:
			return {
				...state,
				loading: true,
				message: 'Loading contests... This may take a while.',
			};

		case DROPDOWN_ACTIONS.SET_CONTESTS:
			const transformedContests =
				provider === 'draftkings'
					? mapDraftKingsContestsToContests(
							contests as IDraftKingsContest[]
					  )
					: mapYahooContestsToContests(contests as IYahooContest[]);

			return {
				...state,
				contests: transformedContests,
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
