import { Direction, directionMap } from './chevron-triangle';

interface IChevron {
	direction?: Direction;
}

const Chevron = ({ direction }: IChevron) => (
	<svg
		fill="currentColor"
		style={{
			transform: `rotate(${directionMap.get(direction!)}deg)`,
		}}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g data-name="Layer 2">
			<path
				d="M16 14.5a1 1 0 0 1-.71-.29L12 10.9l-3.3 3.18a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.42l4-3.86a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.42 1 1 0 0 1-.69.28z"
				data-name="chevron-up"
			/>
		</g>
	</svg>
);

export default Chevron;
