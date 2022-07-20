export const ERROR_ACTION = {
	RESET_ERROR: 'RESET_ERROR',
	STATUS: {
		INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
		STACKING_SETTING_ERROR: 'STACKING_SETTING_ERROR',
	},
};

// export interface IError {
// 	type: string;
// 	message: string;
// 	show: boolean;
// }

export const setInternalServerError = (error: Error) => ({
	message: error.message,
	type: ERROR_ACTION.STATUS.INTERNAL_SERVER_ERROR,
});

export const resetError = () => ({
	type: ERROR_ACTION.RESET_ERROR,
});
