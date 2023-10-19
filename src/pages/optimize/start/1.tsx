import router from 'next/router';
import { useAppSelector } from 'src/hooks';

import IconButton from '@/components/global/icon-button';
import Chevron from '@/components/icons/chevron';
import { Providers } from '@/containers/Providers';
import { Sports } from '@/containers/Sports';

const Start = () => {
	const state = useAppSelector((state) => state);

	// function onNext() {
	// 	if (state.providers.provider && state.sports.selectedSport) {
	// 		router.push('/optimize/start/2', undefined, {
	// 			shallow: true,
	// 		});
	// 	}
	// }

	return (
		<div>
			<div className="flex-1">
				<div className="space-y-3">
					<div className="text-center">
						<h1 className="text-3xl">Welcome!</h1>
						<p>Start by selecting a DFS provider and sport</p>
					</div>
					<div className="flex space-x-3 items-center">
						<Providers />
						<Sports />
						<IconButton
							disabled={!state.sports.selectedSport}
							testId="to-next-step"
							onClick={onNext}
						>
							<Chevron />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Start;
