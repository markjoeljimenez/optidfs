export enum Direction {
	Up = 'up',
	Down = 'down',
	Left = 'left',
	Right = 'right',
}

const directionMap: Map<Direction, number> = new Map([
	[Direction.Up, 0],
	[Direction.Right, 90],
	[Direction.Down, 180],
	[Direction.Left, 270],
]);

interface IChevronTriangle {
	direction?: Direction;
}

const ChevronTriangle = ({ direction }: IChevronTriangle) => (
	<svg
		className="h-5 w-5"
		fill="currentColor"
		style={{
			transform: `rotate(${directionMap.get(direction!)}deg)`,
		}}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g data-name="Layer 2">
			<path
				d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1 2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1zM8 14h7.9L12 9.18z"
				data-name="arrow-up"
			/>
		</g>
	</svg>
);

export default ChevronTriangle;
