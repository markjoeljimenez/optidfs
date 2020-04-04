import React from 'react';
import Tippy from '@tippyjs/react';

interface ITooltip {
	onHidden: () => void;
	handleVisiblity: (e: React.MouseEvent<Element, MouseEvent>) => void;
	handleStatsClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
	visible?: boolean;
	value?: string;
}

const Tooltip = ({
	onHidden,
	handleVisiblity,
	handleStatsClick,
	visible,
	value,
}: ITooltip) => {
	const content = (
		<ul className="tooltip__list">
			<li className="tooltip__item">
				<button
					className="tooltip__button"
					onClick={handleStatsClick}
					type="button"
				>
					View Stats
				</button>
			</li>
			<li className="tooltip__item">
				<button
					className="tooltip__button"
					onClick={handleStatsClick}
					type="button"
				>
					Remove
				</button>
			</li>
			<li className="tooltip__item">
				<button
					className="tooltip__button"
					onClick={handleStatsClick}
					type="button"
				>
					Lock
				</button>
			</li>
		</ul>
	);

	return (
		<Tippy
			className="tooltip"
			content={content}
			onClickOutside={onHidden}
			visible={visible}
			duration={0}
			placement="bottom"
			theme="light"
			interactive
		>
			<button
				type="button"
				className="table__button"
				onClick={handleVisiblity}
				value={value}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="24"
					height="24"
				>
					<g data-name="Layer 2">
						<g data-name="more-vertical">
							<rect
								width="24"
								height="24"
								transform="rotate(-90 12 12)"
								opacity="0"
							/>
							<circle cx="12" cy="12" r="2" />
							<circle cx="12" cy="5" r="2" />
							<circle cx="12" cy="19" r="2" />
						</g>
					</g>
				</svg>
			</button>
		</Tippy>
	);
};

export default Tooltip;
