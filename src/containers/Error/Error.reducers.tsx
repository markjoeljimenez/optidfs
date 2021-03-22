import { AnyAction } from 'redux';
import { ERROR_ACTION } from './Error.actions';

// export const SET_ERROR = 'SET_ERROR';

interface IError {
	display: boolean;
	message?: string;
	// rule?: string;
}

const DEFAULT_STATE: IError = {
	display: false
};

const ErrorReducers = (state = DEFAULT_STATE, { type, message }: AnyAction) => {
	switch (type) {
		case ERROR_ACTION.STATUS.INTERNAL_SERVER_ERROR:
			return {
				display: true,
				message,
			};

		case ERROR_ACTION.RESET_ERROR:
			return {
				display: false,
				message: undefined
			};

		default:
			return state;
	}
};

export default ErrorReducers;
