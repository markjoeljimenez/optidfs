import { connect, useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';

import providersData from '../../data/providers';
import { setProviderAction, SET_PROVIDER } from './Providers.actions';
import Select, { IValueLabel } from '../../components/form/select';
import { RESET_SELECTED_SPORT } from '../Sports/Sports.actions';
import { useAppSelector } from '../../hooks';

type Props = {
	setProvider: (provider: string) => void;
};

const Providers = ({ setProvider }: Props) => {
	const { sports, providers } = useAppSelector((state) => state);
	const dispatch = useDispatch();

	const handleProviderSelection = (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.currentTarget;

		dispatch({
			type: SET_PROVIDER,
			provider: value,
		});

		dispatch({
			type: RESET_SELECTED_SPORT,
		});
	};

	return (
		<Select
			options={providersData.map((sport) => ({
				value: sport.id,
				label: sport.name,
			}))}
			value={providers.provider || ''}
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
