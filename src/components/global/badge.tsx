import clsx from 'clsx';

export enum BadgeColor {
	Yellow = 'bg-yellow-300',
}

type Data = {
	[key: string]: string;
};

interface IBadge {
	text: string;
	color: BadgeColor;
	data?: Data;
	value?: string | number;

	onClick?(e: React.MouseEvent<HTMLButtonElement>): void;
}

const Badge = ({ text, color, value, data, onClick }: IBadge) => (
	<button
		className={clsx(
			'relative px-3 py-2 rounded-full text-xs uppercase',
			color,
			onClick && 'pr-6'
		)}
		type="button"
		onClick={onClick}
		value={value}
		{...data}
	>
		{text}

		{onClick && (
			<div className="absolute inset-y-0 right-1 flex items-center mr-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-3 w-3"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
		)}
	</button>
);

export default Badge;
