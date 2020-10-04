import { connect } from 'react-redux';
import { useRef } from 'react';

import { RULE, setRule, removeRule } from './Rules.actions';

interface IRule {
	teams: string[];
	rules: any;
	setRule: (rule: string, key: string | undefined, value: number) => void;
	removeRule: (rule: string, value: string) => void;
}

const Rule = (props: IRule) => {
	const { teams, rules } = props;

	const playersFromSameTeamSelectRef = useRef<HTMLSelectElement>(null);
	const playersFromSameTeamInputRef = useRef<HTMLInputElement>(null);

	const handleNumberOfPlayersFromTeamClick = () => {
		if (!playersFromSameTeamSelectRef && !playersFromSameTeamInputRef) {
			return;
		}

		const team = playersFromSameTeamSelectRef.current?.value;
		const value = playersFromSameTeamInputRef.current?.value;

		if (team && value) {
			props.setRule(
				RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM,
				team,
				parseInt(value)
			);
		}
	};

	const handleRemoveRule = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget;
		const rule = e.currentTarget.getAttribute('data-rule');

		if (!value || !rule) {
			return;
		}

		props.removeRule(rule, value);
	};

	return (
		<div>
			<span className="inline-block mb-2 text-xs uppercase font-black">
				Number of players from same team
			</span>
			<div>
				<div className="flex">
					<div className="flex-1">
						<label htmlFor="team">
							<span className="sr-only">
								Number of players from same team
							</span>
							<div>
								<select
									className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									ref={playersFromSameTeamSelectRef}
									id="team"
								>
									<option value="" disabled selected>
										Select team
									</option>
									{teams?.map((team, i) => (
										<option value={team} key={i}>
											{team}
										</option>
									))}
								</select>
							</div>
						</label>
					</div>
					<div className="flex-1 ml-4">
						<label htmlFor="numberOfPlayersPerTeam">
							<span className="sr-only">Number of players</span>
							<input
								className="font-bold cursor-pointer shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								ref={playersFromSameTeamInputRef}
								id="numberOfPlayersPerTeam"
								placeholder="Number of players"
								type="number"
								min={0}
								max={8}
							/>
						</label>
					</div>
					<button
						className="px-6 py-2 ml-4 font-black rounded-lg bg-blue-300 text-blue-900"
						type="submit"
						onClick={handleNumberOfPlayersFromTeamClick}
					>
						Add
					</button>
				</div>

				{rules.NUMBER_OF_PLAYERS_FROM_SAME_TEAM && (
					<div className="flex mt-4">
						{rules.NUMBER_OF_PLAYERS_FROM_SAME_TEAM.map(
							({ key, value }, i) => (
								<div
									key={i}
									className="relative ml-4 first:ml-0"
								>
									<button
										className="py-1 px-3 pr-8 rounded-full text-sm uppercase font-black text-black bg-orange-400"
										type="button"
										onClick={handleRemoveRule}
										value={key}
										data-rule={
											RULE.NUMBER_OF_PLAYERS_FROM_SAME_TEAM
										}
									>
										{key} - {value}
										<div className="absolute inset-y-0 right-0 flex items-center mr-1">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="20"
												height="20"
											>
												<g data-name="Layer 2">
													<g data-name="close">
														<rect
															width="24"
															height="24"
															transform="rotate(180 12 12)"
															opacity="0"
														/>
														<path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
													</g>
												</g>
											</svg>
										</div>
									</button>
								</div>
							)
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = ({ rules }) => ({
	rules,
});

const mapDispatchToProps = (dispatch) => ({
	setRule: (rule, key, value) => dispatch(setRule(rule, key, value)),
	removeRule: (rule, key) => dispatch(removeRule(rule, key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
