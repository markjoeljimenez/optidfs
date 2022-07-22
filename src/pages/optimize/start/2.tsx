import router from 'next/router';
import { useAppDispatch, useAppSelector } from 'src/hooks';

import IconButton from '@/components/global/icon-button';
import Chevron from '@/components/icons/chevron';
import Contests from '@/containers/Contests';
import { setHasVisited } from '@/containers/Global';

const Start2 = () => {
	const { contests } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	function onNext() {
		if (contests.selectedContest) {
			router.push('/optimize', undefined, {
				shallow: true,
			});

			dispatch(setHasVisited(true));
		}
	}

	function onBack() {
		router.back();
	}

	return (
		<>
			<div className="text-center">
				<h1 className="text-3xl">Select a contest*</h1>
				<p>
					*Due to limitations with certain DFS providers, selecting a
					contest may not be possible
				</p>
			</div>
			<div className="flex space-x-3 items-center">
				<IconButton rotate={180} onClick={onBack}>
					<Chevron />
				</IconButton>
				<Contests />
				{/* <Upload /> */}
				<IconButton
					disabled={!contests.selectedContest}
					testId="to-next-step"
					onClick={onNext}
				>
					<Chevron />
				</IconButton>
			</div>
		</>
	);
};

export default Start2;
