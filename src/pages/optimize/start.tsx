import { setHasVisited } from 'src/store';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Chevron from '@/components/icons/chevron';
import Dropdown from '@/containers/Contests/components/Contests';
import IconButton from '@/components/global/icon-button';
import Providers from '@/containers/Providers';
import Sports from '@/containers/Sports';
import { useLocalStorage } from 'react-use';

interface StepRenders {
	content: JSX.Element;
}

const Start = () => {
	const { sports, contests, providers } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [value, setValue] = useLocalStorage('optidfs-initial-visit');
	const [step, setStep] = useState(1);

	/**
	 * If there is a local storage value, redirect to /optimize
	 */
	useEffect(() => {
		if (value) {
			router.push('/optimize', '', { shallow: true });
		}
	}, [value]);

	/**
	 * If there is no local storage and provider, sport and contest has been selected,
	 * set local storage
	 */
	useEffect(() => {
		if (step >= Object.keys(steps).length) {
			if (
				!value &&
				providers.provider &&
				sports.selectedSport &&
				contests.selectedContest
			) {
				setValue({
					provider: providers.provider,
					sport: sports.selectedSport,
					contest: contests.selectedContest,
				});

				dispatch(setHasVisited(true));
			}
		}
	}, [step]);

	function onNext() {
		if (step >= Object.keys(steps).length) {
			setStep(step);
			router.push('/optimize', '', { shallow: true });
		} else {
			setStep(step + 1);
		}
	}

	function onBack() {
		if (step < 0) {
			setStep(0);
		} else {
			setStep(step - 1);
		}
	}

	const steps: Record<number, StepRenders> = {
		1: {
			content: (
				<>
					<div className="text-center">
						<h1 className="text-3xl">Welcome!</h1>
						<p>Start by selecting a DFS provider and sport</p>
					</div>
					<div className="flex space-x-3 items-center">
						<Providers />
						<Sports />
						<IconButton
							disabled={!sports.selectedSport}
							onClick={onNext}
							testId="to-next-step"
							key="step-1"
						>
							<Chevron />
						</IconButton>
					</div>
				</>
			),
		},
		2: {
			content: (
				<>
					<div className="text-center">
						<h1 className="text-3xl">Select a contest*</h1>
						<p>
							*Due to limitations with certain DFS providers,
							selecting a contest may not be possible
						</p>
					</div>
					<div className="flex space-x-3 items-center">
						<IconButton onClick={onBack} rotate={180}>
							<Chevron />
						</IconButton>
						<Dropdown />
						{/* <Upload /> */}
						<IconButton
							disabled={!contests.selectedContest}
							onClick={onNext}
							key="step-2"
						>
							<Chevron />
						</IconButton>
					</div>
				</>
			),
		},
	};

	return (
		<div data-step={step}>
			<div className="flex-1">
				<div className="space-y-3">{steps[step].content}</div>
			</div>
		</div>
	);
};

export default Start;
