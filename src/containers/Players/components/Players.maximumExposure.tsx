import { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/hooks';

import Input from '@/components/form/input';

import { GetPlayersExtendedApi } from '../api';
import { useGetPlayersQueryArgs, useGetPlayersQueryResponse } from '../hooks';
import { IGetPlayersResponse, IPlayer } from '../models';

interface IPlayerMaximumExposure {
	player: IPlayer;
}

export const PlayerMaximumExposure = ({ player }: IPlayerMaximumExposure) => {
	const GetPlayersQueryArgs = useGetPlayersQueryArgs();
	const dispatch = useAppDispatch();

	function handleMaximumExposure(e: ChangeEvent<HTMLInputElement>) {
		dispatch(
			GetPlayersExtendedApi.util.updateQueryData(
				'getPlayers',
				GetPlayersQueryArgs,
				(getPlayersResponse) =>
					mutatePlayerMaxExposure(
						player.id as string,
						getPlayersResponse,
						parseFloat(e.currentTarget.value)
					)
			)
		);
	}

	return (
		<Input
			defaultValue={player.maxExposure}
			id={`${player.id}-max-exposure`}
			label="Max exposure"
			max={1}
			min={0}
			step={0.1}
			testid="player-max-exposure"
			type="number"
			onChange={handleMaximumExposure}
		/>
	);
};

function mutatePlayerMaxExposure(
	id: string,
	getPlayersResponse: IGetPlayersResponse,
	maxExposure: number
) {
	const foundPlayerIndex = getPlayersResponse.players.findIndex(
		(player) => player.id === id
	);

	getPlayersResponse.players[foundPlayerIndex] = {
		...getPlayersResponse.players[foundPlayerIndex],
		maxExposure,
	};
}
