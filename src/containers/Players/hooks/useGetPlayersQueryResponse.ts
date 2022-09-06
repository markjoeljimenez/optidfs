import { useAppSelector } from 'src/hooks';

import { useGetPlayersQuery } from '../api';

export function useGetPlayersQueryArgs() {
	const { contests, providers } = useAppSelector((state) => state);

	return {
		// gameType: contests.gameType,
		id: contests.selectedContest?.contest_id!,
		provider: providers.provider!,
	};
}

export function useGetPlayersQueryResponse() {
	const { contests, providers, sports } = useAppSelector((state) => state);
	const GetPlayersQueryArgs = useGetPlayersQueryArgs();

	return useGetPlayersQuery(GetPlayersQueryArgs, {
		skip:
			!contests.selectedContest ||
			!providers.provider ||
			!sports.selectedSport,
	});
}
