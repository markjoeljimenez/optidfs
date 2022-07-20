import router from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'src/hooks';
import { useAppLocalStorage } from 'src/hooks/useAppLocalStorage';
import { setHasVisited } from 'src/store';

import IconButton from '@/components/global/icon-button';
import Chevron from '@/components/icons/chevron';
import Contests from '@/containers/Contests';

const Start2 = () => {
	const { contests } = useAppSelector((state) => state);
	const [localStorage] = useAppLocalStorage();

	useEffect(() => {
		if (!localStorage?.sport || !localStorage?.provider) {
			router.push('/optimize/start/1', undefined, {
				shallow: true,
			});
		}
	}, [localStorage]);

	function onNext() {
		if (contests.selectedContest) {
			router.push('/optimize', undefined, {
				shallow: true,
			});

			setHasVisited(true);
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
				<IconButton onClick={onBack} rotate={180}>
					<Chevron />
				</IconButton>
				<Contests />
				{/* <Upload /> */}
				<IconButton
					disabled={!contests.selectedContest}
					onClick={onNext}
				>
					<Chevron />
				</IconButton>
			</div>
		</>
	);
};

export default Start2;
