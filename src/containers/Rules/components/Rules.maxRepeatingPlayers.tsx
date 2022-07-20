import Tippy from '@tippyjs/react';

import Input from '../../../components/form/input';
import { useAppDispatch } from '../../../hooks';
import { RULE, setRule } from '../Rules.actions';

const Rule = () => {
	const dispatch = useAppDispatch();

	function handleMaxRepeatingPlayers(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.currentTarget;

		dispatch(
			setRule(RULE.MAX_REPEATING_PLAYERS, undefined, parseInt(value))
		);
	}

	return (
		<Input
			id="maxRepeatingPlayers"
			label="Maximum repeating players"
			min={0}
			placeholder="0"
			tippy={
				<Tippy
					className="bg-white rounded shadow p-4"
					content={
						<div>
							<p>
								<strong>
									Value: <i>n</i>
								</strong>
							</p>

							<p>
								Set this field if you want to make more random
								lineups.
							</p>
						</div>
					}
				>
					<div className="inline-block ml-2 align-top">
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</svg>
					</div>
				</Tippy>
			}
			type="number"
			onChange={handleMaxRepeatingPlayers}
		/>
	);
};

export default Rule;
