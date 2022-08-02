import { IGetOptimizedLineupsResponse } from '@/containers/Optimize';

export function mapPlayersToDraftkingsCSV(
	response: IGetOptimizedLineupsResponse | undefined
) {
	if (response) {
		const playerIds = response?.lineups.map((lineup) =>
			lineup.players.map((player) => player.id)
		);

		return [response.positions, ...playerIds];
	}
}
