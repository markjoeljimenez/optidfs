import { setHasVisited } from '../store';
import { setSelectedContest } from '../containers/Contests/redux/reducers';
import { setSelectedSport } from '@/containers/Sports';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import Chevron from '../components/icons/chevron';
import Contests from '@/containers/Contests';
import Dropdown from '../containers/Contests/components/Contests';
import IconButton from '../components/global/icon-button';
import Providers, { setProvider } from '@/containers/Providers';
import Sports from '@/containers/Sports';
import Table from '../containers/Table/Table.component';

interface StepRenders {
	content: JSX.Element;
}

const Index = () => {
	const { sports, contests, players, providers, global } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();

	const [value, setValue] = useLocalStorage('optidfs-initial-visit');
	const [step, setStep] = useState(1);

	/**
	 * If there is a local storage value, set redux state
	 * and go to step 3 (view players)
	 */
	useEffect(() => {
		if (value) {
			if (
				!providers.provider &&
				!sports.selectedSport &&
				!contests.selectedContest
			) {
				dispatch(setProvider(value.provider));
				dispatch(setSelectedSport(value.sport));
				dispatch(setSelectedContest(value.contest));
				dispatch(setHasVisited(true));

				setStep(3);
			}
		}
	}, [value]);

	/**
	 * If there is no local storage and provider, sport and contest has been selected,
	 * set local storage
	 */
	useEffect(() => {
		if (
			!value &&
			providers.provider &&
			sports.selectedSport &&
			contests.selectedContest &&
			step === 3
		) {
			setValue({
				provider: providers.provider,
				sport: sports.selectedSport,
				contest: contests.selectedContest,
			});

			dispatch(setHasVisited(true));
		}
	}, [
		providers.provider,
		sports.selectedSport,
		contests.selectedContest,
		step,
	]);

	function onNext() {
		if (step >= Object.keys(steps).length) {
			setStep(step);
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
		3: {
			content: (
				<>
					<Contests />
					<Table />
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

export default Index;
