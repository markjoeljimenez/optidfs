import { IPlayer, PlayerMaximumExposure } from '@/containers/Players';

interface ITableExpandedRow {
	player: IPlayer;
}

export const TableExpandedRow = ({ player }: ITableExpandedRow) => {
	return (
		<div className="p-4 border-b border-gray-200">
			<div className="flex child:flex-1">
				<PlayerMaximumExposure player={player} />
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
