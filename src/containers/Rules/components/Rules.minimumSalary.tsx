import { useAppDispatch } from '../../../hooks';
import { RULE, setRule } from '../Rules.actions';

import InputGroup from '../../../components/form/inputGroup';

const Rule = () => {
	const dispatch = useAppDispatch();

	const handleMinSalaryCapChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value } = e.currentTarget;

		dispatch(setRule(RULE.MINIMUM_SALARY_CAP, undefined, parseInt(value)));
	};

	return (
		<InputGroup label="Minimum salary cap">
			<input
				className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="minSalaryCap"
				placeholder="0"
				type="number"
				min={0}
				step={5000}
				onChange={handleMinSalaryCapChange}
			/>
		</InputGroup>
	);
};

export default Rule;
