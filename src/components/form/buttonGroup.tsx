import clsx from 'clsx';
import { MouseEvent, ReactElement } from 'react';

export interface IButtonGroupButton {
	content: string | ReactElement;
	onClick(e: MouseEvent<HTMLButtonElement>): void;
	disabled?: boolean;
	value?: string;
}

interface IButtonGroup {
	buttons: IButtonGroupButton[];
	className?: string;
}

const ButtonGroup = ({ buttons, className }: IButtonGroup) => (
	<div className={clsx('shadow flex text-white', className)}>
		{buttons.map(({ content, disabled, value }, i) => (
			<button
				key={`button-group-${value ?? i}`}
				className={clsx(
					'px-4 py-2 hover:bg-indigo-600 bg-indigo-500',
					i === 0 && 'rounded-l-md',
					i !== 0 && 'border-l border-indigo-100',
					i === buttons.length - 1 && 'rounded-r-md'
				)}
				disabled={disabled}
			>
				{content}
			</button>
		))}
	</div>
);

export default ButtonGroup;
