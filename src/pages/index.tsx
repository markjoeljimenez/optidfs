import { useAppDispatch, useAppSelector } from '../hooks';
// import { wrapper } from '../store';
import Dropdown from '../containers/Dropdown/Dropdown.component';
import Loading from '../components/loading/loading';
import Rules from '../containers/Rules/Rules.component';
import Stacking from '../containers/Stacking/Stacking.component';
import Table from '../containers/Table/Table.component';
import Tabs from '../containers/Tabs/Tabs.component';
import Upload from '../containers/Upload/Upload.component';
import {
	selectSports,
	setSelectedSport,
} from '../containers/Sports/Sports.reducers';
import { useGetPlayersQuery } from '../api';
import { useEffect, useState } from 'react';
import {
	selectContests,
	setSelectedContest,
} from '../containers/Dropdown/Dropdown.reducers';
import {
	selectProviders,
	setProvider,
} from '../containers/Providers/Providers.reducers';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
	selectPlayers,
	setDefaultPlayers,
} from '../containers/Players/Players.reducers';
import Providers from '../containers/Providers/Providers.components';
import Sports from '../containers/Sports/Sports.component';
import IconButton from '../components/global/icon-button';
import Chevron from '../components/icons/chevron';
import { setHasVisited } from '../store';
import { useLocalStorage } from 'react-use';

const PANELS = new Map([
	['players', <Table />],
	// {
	// 	id: 'stacking',
	// 	element: <Stacking />,
	// },
	// {
	// 	id: 'settings',
	// 	element: <Rules />,
	// },
]);

interface StepRenders {
	content: JSX.Element;
}

const Index = () => {
	const { sports, contests, players, providers, global } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();

	const [value, setValue, remove] = useLocalStorage('optidfs-initial-visit');
	const [step, setStep] = useState(1);

	// console.log(sports);

	// const { data } = useGetPlayersQuery(
	// 	contests.selectedContest
	// 		? {
	// 				id: contests.selectedContest?.id!,
	// 				provider: providers.provider!,
	// 		  }
	// 		: skipToken
	// );

	// useEffect(() => {
	// 	if (data && providers.provider) {
	// 		const { players } = data;

	// 		dispatch(
	// 			setDefaultPlayers({ players, provider: providers.provider })
	// 		);
	// 	}
	// }, [data]);

	/**
	 * If there is a local storage value, set redux state
	 * and go to step 3 (view players)
	 */
	useEffect(() => {
		if (value) {
			if (!providers.provider && !sports.selectedSport) {
				dispatch(setProvider(value.provider));
				dispatch(setSelectedSport(value.sport));
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
			step === 3
		) {
			setValue({
				provider: providers.provider,
				sport: sports.selectedSport,
			});

			dispatch(setHasVisited(true));
		}
	}, [providers.provider, sports.selectedSport, step]);

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
			content: <div>{PANELS.get('players')}</div>,
		},
	};

	return (
		<div
			className="flex flex-col items-center justify-center"
			data-step={step}
		>
			<div className="flex-1">
				<div className="space-y-3">{steps[step].content}</div>
			</div>
		</div>
	);
};

export default Index;
