import { useRef, MouseEvent } from 'react';
import { connect } from 'react-redux';

import AddFromSelect from '../../../components/form/addFromSelect';

import {
	removeFromSetting,
	setSetting,
	STACKING_POSITION_SETTINGS,
	STACKING_TYPE,
} from '../Stacking.actions';

interface IStackingSetting {
	teams: string[];
	stacking: any;
	setStackingSetting(
		stackingType: string,
		setting: string,
		key: string | undefined,
		value: string[]
	): void;
	removeFromStackingSetting(
		stackingType: string,
		setting: string,
		key: string
	): void;
}

const StackingSetting = ({
	teams,
	stacking,
	setStackingSetting,
	removeFromStackingSetting,
}: IStackingSetting) => {
	const teamsSelectRef = useRef<HTMLSelectElement>(null);
	const currentTeams =
		stacking[STACKING_TYPE.POSITION]?.[
			STACKING_POSITION_SETTINGS.FOR_TEAMS
		];

	function handleAddTeam(e: MouseEvent<HTMLButtonElement>) {
		if (teamsSelectRef.current && teamsSelectRef.current.value !== '') {
			const { value } = teamsSelectRef.current;

			if (currentTeams?.some((team) => team === value)) {
				return;
			}

			const transformedTeams = currentTeams
				? [...currentTeams, value]
				: [value];

			setStackingSetting(
				STACKING_TYPE.POSITION,
				STACKING_POSITION_SETTINGS.FOR_TEAMS,
				undefined,
				transformedTeams
			);
		}
	}

	function handleRemoveTeam(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		removeFromStackingSetting(
			STACKING_TYPE.POSITION,
			STACKING_POSITION_SETTINGS.FOR_TEAMS,
			value
		);
	}

	return (
		<AddFromSelect
			select={{
				id: 'forTeams',
				items: teams,
				label: 'For teams',
				placeholder: 'Select teams',
			}}
			list={{
				items: currentTeams,
				onClick: handleRemoveTeam,
				props: {
					'data-stacking-type': STACKING_TYPE.POSITION,
				},
			}}
			onAdd={handleAddTeam}
			ref={teamsSelectRef}
		/>
	);
};

const mapStateToProps = ({ table, stacking }) => ({
	stacking,
	teams: table.teams,
});

const mapDispatchToProps = (dispatch) => ({
	setStackingSetting: (stackingType, setting, key, value) =>
		dispatch(setSetting(stackingType, setting, key, value)),
	removeFromStackingSetting: (stackingType, setting, key) =>
		dispatch(removeFromSetting(stackingType, setting, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackingSetting);
