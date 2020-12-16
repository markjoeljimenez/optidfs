import { useRef, MouseEvent } from 'react';
import { connect } from 'react-redux';

import AddFromSelect from '../../components/form/addFromSelect';

import {
	removeFromSetting,
	setSetting,
	STACKING_TEAM_SETTINGS,
	STACKING_TYPE,
} from './Stacking.actions';

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
	removeFromStackingSetting,
	setStackingSetting,
}: IStackingSetting) => {
	const teamSelectRef = useRef<HTMLSelectElement>(null);
	const currentTeams =
		stacking[STACKING_TYPE.TEAM]?.[STACKING_TEAM_SETTINGS.FROM_TEAMS];

	function handleAddTeam(e: MouseEvent<HTMLButtonElement>) {
		if (teamSelectRef.current && teamSelectRef.current.value !== '') {
			const { value } = teamSelectRef.current;

			if (!value || currentTeams?.some((team) => team === value)) {
				return;
			}

			const transformedTeams = currentTeams
				? [...currentTeams, value]
				: [value];

			setStackingSetting(
				STACKING_TYPE.TEAM,
				STACKING_TEAM_SETTINGS.FROM_TEAMS,
				undefined,
				transformedTeams
			);
		}
	}

	function handleRemoveTeam(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		removeFromStackingSetting(
			STACKING_TYPE.TEAM,
			STACKING_TEAM_SETTINGS.FROM_TEAMS,
			value
		);
	}

	return (
		<div className="mt-6">
			<AddFromSelect
				select={{
					id: 'teamStacking',
					items: teams,
					label: 'Teams',
					placeholder: 'Select team',
				}}
				list={{
					items: currentTeams,
					onClick: handleRemoveTeam,
					props: {
						'data-stacking-type': STACKING_TYPE.TEAM,
					},
				}}
				onAdd={handleAddTeam}
				ref={teamSelectRef}
			/>
		</div>
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
