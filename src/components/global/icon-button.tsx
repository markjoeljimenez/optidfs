import clsx from 'clsx';
import { FormEvent, MouseEvent } from 'react';

interface IIconButton {
	onSubmit?(e: FormEvent<HTMLButtonElement>): void;
	onClick?(e: MouseEvent<HTMLButtonElement>): void;
	disabled?: boolean;
	rotate?: number;
	children: JSX.Element;
	width?: number;
	height?: number;
	testId?: string;
	key?: string;
}

const disabledClass = 'bg-gray-300 cursor-default';
const activeClass = 'bg-blue-500 cursor-pointer';

const IconButton = ({
	children,
	height = 30,
	width = 30,
	...props
}: IIconButton) => (
	<button
		key={props.key}
		className={clsx(
			'text-white rounded-full ',
			props.disabled ? disabledClass : activeClass
		)}
		data-testid={props.testId}
		disabled={props.disabled}
		onClick={props.onClick}
		onSubmit={props.onSubmit}
	>
		<div
			className={clsx(
				props.rotate ? `transform rotate-${props.rotate}` : ''
			)}
			style={{
				width: width ? `${width}px` : undefined,
				height: height ? `${height}px` : undefined,
			}}
		>
			{children}
		</div>
		{/* <svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className="fill-current"
			width={30}
			height={30}
		>
			<g data-name="Layer 2">
				<g data-name="chevron-right">
					<rect
						width="24"
						height="24"
						transform="rotate(-90 12 12)"
						opacity="0"
					/>
					<path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z" />
				</g>
			</g>
		</svg> */}
	</button>
);

export default IconButton;
