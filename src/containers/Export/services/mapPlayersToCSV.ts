import { IContest } from '@/containers/Contests';
import {
	IGetOptimizedLineupsResponse,
	IOptimizedLineup,
} from '@/containers/Optimize';

function mapIds(lineups: IOptimizedLineup[]) {
	return lineups.map((lineup) => lineup.players.map((player) => player.id));
}

export function mapPlayersToDraftkingsCSV(
	response: IGetOptimizedLineupsResponse | undefined
) {
	if (response) {
		const playerIds = mapIds(response.lineups);

		return [response.positions, ...playerIds];
	}
}

export function mapPlayersToYahooCSV(
	response: IGetOptimizedLineupsResponse | undefined,
	selectedContest: IContest
) {
	if (response) {
		const playerIds = mapIds(response.lineups);

		const transformedPositionHeaders = [
			'Contest ID',
			'Entry ID',
			...response.positions,
		];
		const transformedPlayerIds = playerIds.map((players) => [
			selectedContest.contest_id,
			undefined,
			...players,
		]);

		return [transformedPositionHeaders, ...transformedPlayerIds];
	}
}
