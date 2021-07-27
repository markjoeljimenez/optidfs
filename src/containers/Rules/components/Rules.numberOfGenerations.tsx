import { useAppDispatch } from '../../../hooks';

import { setRule, RULE } from '../Rules.actions';

import Input from '../../../components/form/input';

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
		<Input label="Number of generations">
			<label htmlFor="maxRepeatingPlayers">
				<span className="sr-only">Number of generations</span>
				<input
					className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					defaultValue={1}
					id="numberOfGenerations"
					min={1}
					max={max}
					placeholder="Number of generations"
					required
					type="number"
					onChange={handleChange}
				/>
			</label>
		</Input>
	);
};

export default Rule;
