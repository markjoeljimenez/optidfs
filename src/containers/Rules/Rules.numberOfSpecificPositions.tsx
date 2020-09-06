import { connect } from 'react-redux';
import { useRef } from 'react';
import { RULE, setRule, removeRule } from './Rules.actions';

const Rule = (props: any) => {
	const { positions, rules } = props;

	const numberOfSpecificPositionsSelectRef = useRef<HTMLSelectElement>(null);
	const numberOfSpecificPositionsInputRef = useRef<HTMLInputElement>(null);

	const handleNumberOfSpecificPositionsClick = () => {
		if (
			!numberOfSpecificPositionsSelectRef &&
			!numberOfSpecificPositionsInputRef
		) {
			return;
		}

		const team = numberOfSpecificPositionsSelectRef.current?.value;
		const value = numberOfSpecificPositionsInputRef.current?.value;

		if (team && value) {
			props.setRule(
				RULE.NUMBER_OF_SPECIFIC_POSITIONS,
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
		<div className="input-group">
			Number of specific positions
			<div className="input input-group__input">
				<label htmlFor="numberOfSpecificPositionsSelect">
					<span className="u-hidden">
						Number of specific positions
					</span>
					<select
						ref={numberOfSpecificPositionsSelectRef}
						id="numberOfSpecificPositionsSelect"
					>
						<option value="" disabled selected>
							Select position
						</option>
						{positions.map((position, i) => (
							<option value={position} key={i}>
								{position}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="numberOfSpecificPositions">
					<span className="u-hidden">Number of players</span>
					<input
						ref={numberOfSpecificPositionsInputRef}
						id="numberOfSpecificPositions"
						placeholder="Number of players"
						type="number"
						min={0}
						max={3}
					/>
				</label>

				<button
					type="submit"
					onClick={handleNumberOfSpecificPositionsClick}
				>
					Add
				</button>
			</div>
			{rules.NUMBER_OF_SPECIFIC_POSITIONS &&
				rules.NUMBER_OF_SPECIFIC_POSITIONS.map(({ key, value }, i) => (
					<div key={i}>
						<span>{key}</span>
						{' '}
						-
						<span>{value}</span>
						<button
							type="button"
							onClick={handleRemoveRule}
							value={key}
							data-rule={RULE.NUMBER_OF_SPECIFIC_POSITIONS}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
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
						</button>
					</div>
				))}
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
