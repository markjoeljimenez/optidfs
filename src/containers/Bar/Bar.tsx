import { useAppSelector } from '../../hooks';

import Search from '../Search/Search';
import Optimize from '../Optimize/Optimize';
import { openModal } from '../Rules/Rules.actions';

const Bar = () => {
	const { players } = useAppSelector((state) => state);

	return players ? (
		<div className="flex items-center justify-between">
			<div className="flex-1 mr-4">
				<Search />
			</div>
			<Optimize />
		</div>
	) : (
		<></>
	);
};

export default Bar;
