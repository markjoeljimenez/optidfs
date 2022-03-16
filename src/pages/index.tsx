import { useAppDispatch, useAppSelector } from '../hooks';
// import { wrapper } from '../store';
import Dropdown from '../containers/Dropdown/Dropdown.component';
import Loading from '../components/loading/loading';
import Rules from '../containers/Rules/Rules.component';
import Stacking from '../containers/Stacking/Stacking.component';
import Table from '../containers/Table/Table.component';
import Tabs from '../containers/Tabs/Tabs.component';
import Upload from '../containers/Upload/Upload.component';
import { selectSports } from '../containers/Sports/Sports.reducers';
import { useGetPlayersQuery } from '../api';
import { useEffect, useState } from 'react';
import { selectContests } from '../containers/Dropdown/Dropdown.reducers';
import { selectProviders } from '../containers/Providers/Providers.reducers';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import {
	selectPlayers,
	setDefaultPlayers,
} from '../containers/Players/Players.reducers';
import Providers from '../containers/Providers/Providers.components';
import Sports from '../containers/Sports/Sports.component';
import IconButton from '../components/global/icon-button';
import Chevron from '../components/icons/chevron';

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
	const { sports, contests, players, providers } = useAppSelector(
		(state) => state
	);
	const dispatch = useAppDispatch();
	const [step, setStep] = useState(1);

	const { data } = useGetPlayersQuery(
		contests.selectedContest
			? {
					id: contests.selectedContest?.id!,
					provider: providers.provider!,
			  }
			: skipToken
	);

	useEffect(() => {
		if (data && providers.provider) {
			const { players } = data;

			dispatch(
				setDefaultPlayers({ players, provider: providers.provider })
			);
		}
	}, [data]);

	const onNext = () => {
		if (step >= Object.keys(steps).length) {
			setStep(step);
		} else {
			setStep(step + 1);
		}
	};

	const onBack = () => {
		if (step < 0) {
			setStep(0);
		} else {
			setStep(step - 1);
		}
	};

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

	return <div className="space-y-3">{steps[step].content}</div>;
};

export default Index;
