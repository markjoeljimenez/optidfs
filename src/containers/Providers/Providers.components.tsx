import { connect, useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';

import providers from '../../data/providers';
import { setProviderAction, SET_PROVIDER } from './Providers.actions';
import Select, { IValueLabel } from '../../components/form/select';

type Props = {
	setProvider: (provider: string) => void;
};

const Providers = ({ setProvider }: Props) => {
	const dispatch = useDispatch();

	const handleProviderSelection = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget;

		dispatch({
			type: SET_PROVIDER,
			provider: value,
		});
	};

	return (
		<Select
			options={providers.map(
				(sport) =>
					({
						value: sport.id,
						label: sport.name,
					} as IValueLabel)
			)}
			// defaultValue={providers[0].id}
			hideLabel
			id="selectProvider"
			label="Select provider"
			placeholder="Select provider"
			onChange={handleProviderSelection}
		/>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setProvider: (provider: string) => dispatch(setProviderAction(provider)),
});

export default connect(null, mapDispatchToProps)(Providers);
