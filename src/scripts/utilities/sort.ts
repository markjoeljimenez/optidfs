import { ILineup } from '../../interfaces/IApp';
import get from 'lodash.get';

export default function (
	lineup: ILineup[],
	ascending: boolean,
	currentSort: string,
	sort: string = currentSort
) {
	return [
		{
			...lineup[0],
			...lineup[0].players.sort((a, b) =>
				ascending && currentSort === sort
					? get(b, sort) - get(a, sort)
					: get(a, sort) - get(b, sort)
			),
		},
	];
}
