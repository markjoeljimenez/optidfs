import { put, select } from 'redux-saga/effects';
import { ERROR_STATUSES } from '../components/error';
import { SET_ERROR } from '../containers/Error/Error.reducers';
import { OPTIMIZE_PLAYERS_FAILED, OPTIMIZE_PLAYERS_SUCCEEDED } from '../containers/Optimize/Optimize.actions';
import { LOADING_PLAYERS } from '../containers/Table/Table.actions';
import { post } from '../scripts/utilities/fetch';
import { API } from './saga';

export default function* optimizePlayers() {
	yield put({
		type: SET_ERROR,
		error: null,
	});

	yield put({ type: LOADING_PLAYERS });

	try {
		const { sports, table, rules, stacking } = yield select();

		let tempStacking = stacking;

		if (rules.errors.length) {
			yield put({
				type: OPTIMIZE_PLAYERS_FAILED,
			});

			yield put({
				type: SET_ERROR,
				show: true,
				error: {
					type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
					message: 'Can\'t generate lineups',
				},
			});

			return;
		}

		if (
			!tempStacking.CUSTOM?.STACKS?.every(
				(stack) => stack?.players?.length
			)
		) {
			tempStacking = { ...stacking, CUSTOM: undefined };
		}

		const {
			lockedPlayers,
			defaultPlayers,
			draftGroupId,
			gameType,
			excludedPlayers,
		} = table;

		const res = yield post(`${API}/optimize`, {
			lockedPlayers: lockedPlayers?.map((player) => player.id),
			excludedPlayers: excludedPlayers?.map((player) => player.id),
			players: defaultPlayers,
			rules,
			sport: sports.sport,
			draftGroupId,
			stacking: tempStacking,
			gameType,
		});

		const { lineups } = yield res.json();

		yield put({
			type: OPTIMIZE_PLAYERS_SUCCEEDED,
			lineups,
		});
	} catch (e) {
		yield put({
			type: OPTIMIZE_PLAYERS_FAILED,
		});

		yield put({
			type: SET_ERROR,
			error: {
				type: ERROR_STATUSES.INTERNAL_SERVER_ERROR,
				show: true,
				message: 'Can\'t generate lineups',
			},
		});
	}
}