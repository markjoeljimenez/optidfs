import Input from '../../../components/form/input';
import { useAppDispatch } from '../../../hooks';
import { RULE, setRule } from '../Rules.actions';

const Rule = () => {
	const dispatch = useAppDispatch();

	function handleMinSalaryCapChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		dispatch(setRule(RULE.MINIMUM_SALARY_CAP, undefined, parseInt(value)));
	}

	return (
		<Input
			id="minSalaryCap"
			label="Minimum salary cap"
			max={50000}
			min={0}
			onChange={handleMinSalaryCapChange}
			placeholder="0"
			step={5000}
			type="number"
		/>
	);
};

export default Rule;
