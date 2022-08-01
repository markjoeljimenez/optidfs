import { useGetPlayersQuery } from 'src/api';
import { useAppSelector } from 'src/hooks';

export default function useGetPlayersQueryResponse() {
	const { contests, providers, sports } = useAppSelector((state) => state);

	return useGetPlayersQuery(
		{
			// gameType: contests.gameType,
			id: contests.selectedContest?.contest_id!,
			provider: providers.provider!,
		},
		{
			skip:
				!contests.selectedContest ||
				!providers.provider ||
				!sports.selectedSport,
		}
	);
}
