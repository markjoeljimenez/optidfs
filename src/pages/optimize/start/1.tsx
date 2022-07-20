import router from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'src/hooks';
import { useAppLocalStorage } from 'src/hooks/useAppLocalStorage';

import IconButton from '@/components/global/icon-button';
import Chevron from '@/components/icons/chevron';
import Providers from '@/containers/Providers';
import Sports from '@/containers/Sports';

const Start = () => {
	const state = useAppSelector((state) => state);
	const [localStorage, setLocalStorage] = useAppLocalStorage();
	// const [step, setStep] = useState(1);

	/**
	 * If there is a local storage value, redirect to /optimize
	 */
	// useEffect(() => {
	// 	console.log(state);
	// 	// if (contests && providers && sports) {
	// 	// 	router.push('/optimize', undefined, { shallow: true });
	// 	// 	return;
	// 	// }
	// }, [state]);

	function onNext() {
		if (state.providers.provider && state.sports.selectedSport) {
			router.push('/optimize/start/2', undefined, {
				shallow: true,
			});
		}
	}

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
							onClick={onNext}
							testId="to-next-step"
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
