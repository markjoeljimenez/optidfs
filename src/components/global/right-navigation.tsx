import { IconSettings, IconStack2 } from '@tabler/icons';
import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import React, { MouseEvent, useState } from 'react';

import { OptimizeSettings } from '@/containers/Optimize';

const RightNavigation = () => {
	const [open, setOpen] = useState<string | null>(null);
	const rightNavigationButtonMap = useRightNavigationButtonsMap();

	function onRightNavigationButtonClick(e: MouseEvent<HTMLButtonElement>) {
		const { value } = e.currentTarget;

		if (open === value) {
			setOpen(null);

			return;
		}

		setOpen(value);
	}

	return (
		<div className="bg-white flex sticky right-0">
			<div className="py-8 px-4 space-y-4">
				{[...rightNavigationButtonMap.keys()].map((button) => (
					<button
						key={button}
						className={clsx(
							'block',
							open === button ? 'text-gray-600' : 'text-gray-400',
							'hover:text-gray-600'
						)}
						value={button}
						onClick={onRightNavigationButtonClick}
					>
						{rightNavigationButtonMap.get(button)?.icon}
					</button>
				))}
			</div>

			<div
				className="border-l-[1px] border-gray-200 min-w-[20rem]"
				hidden={open === null}
			>
				<div className="p-8">
					<div>{rightNavigationButtonMap.get(open!)?.content}</div>
				</div>
			</div>
		</div>
	);
};

interface IRightNavigationButtonsMap {
	content: JSX.Element;
	icon: JSX.Element;
}

function useRightNavigationButtonsMap() {
	const flags = useFlags(['stacking', 'test']);

	const map = new Map<string, IRightNavigationButtonsMap>([
		[
			'settings',
			{
				content: <OptimizeSettings />,
				icon: <IconSettings />,
			},
		],
	]);

	if (flags.stacking.enabled) {
		map.set('stacking', {
			content: <>stacking</>,
			icon: <IconStack2 />,
		});
	}

	return map;
}

export default RightNavigation;
