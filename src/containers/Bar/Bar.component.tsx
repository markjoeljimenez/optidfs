import { useAppSelector } from '../../hooks';

import Search from '../Search/Search.component';
import Optimize from '../Optimize/Optimize.component';

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
