import { useAppDispatch } from '../../../hooks';

import { RULE, setRule } from '../Rules.actions';

import Input from '../../../components/form/input';

const Rule = () => {
	const dispatch = useAppDispatch();

	function handleMinSalaryCapChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		dispatch(setRule(RULE.MINIMUM_SALARY_CAP, undefined, parseInt(value)));
	}

	return (
		<Input label="Minimum salary cap">
			<input
				className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="minSalaryCap"
				placeholder="0"
				type="number"
				min={0}
				step={5000}
				onChange={handleMinSalaryCapChange}
			/>
		</Input>
	);
};

export default Rule;
