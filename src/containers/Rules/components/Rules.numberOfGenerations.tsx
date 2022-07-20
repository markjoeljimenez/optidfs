import Input from '../../../components/form/input';
import { useAppDispatch } from '../../../hooks';
import { RULE,setRule } from '../Rules.actions';

const Rule = () => {
	const dispatch = useAppDispatch();
	const max = 20;

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.currentTarget.value);

		if (value > max) {
			e.currentTarget.value = max.toString();

			return;
		}

		dispatch(setRule(RULE.NUMBER_OF_GENERATIONS, undefined, value));
	}

	return (
		<Input
			required
			defaultValue={1}
			id="numberOfGenerations"
			label="Number of generations"
			max={max}
			min={1}
			placeholder="Number of generations"
			type="number"
			onChange={handleChange}
		/>
	);
};

export default Rule;
