import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from 'src/hooks';

export default function useReset() {
	const dispatch = useAppDispatch();

	function reset(reducers: ActionCreatorWithPayload<any | null>[]) {
		for (const reducer of reducers) {
			dispatch(reducer(null));
		}
	}

	return reset;
}
