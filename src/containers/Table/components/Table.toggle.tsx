// import { useState } from 'react';
import { IconLock } from '@tabler/icons';
import clsx from 'clsx';

import { setLockedPlayers } from '@/containers/Optimize';

import { useAppDispatch, useAppSelector } from '../../../hooks';
// import {
// 	clearToggle,
// 	excludePlayer,
// 	lockPlayer,
// } from '../../Players/redux/Players.actions';

export enum ETableToggle {
	Locked = 'locked',
	Excluded = 'excluded',
}

interface ILockOrExclude {
	id: string | number;
}

export const TableToggle = ({ id }: ILockOrExclude) => {
	const { optimize } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const locked = optimize.settings?.lockedPlayers?.some((_id) => _id === id);
	// const excluded = players?.excluded?.some((_player) => _player.id === id);

	function handleLockPlayer(e: React.MouseEvent<HTMLInputElement>) {
		if (!locked) {
			dispatch(
				setLockedPlayers([...optimize.settings.lockedPlayers, id])
			);

			return;
		}

		dispatch(
			setLockedPlayers(
				optimize.settings.lockedPlayers!.filter((_id) => _id !== id)
			)
		);
	}

	// function handleExcludePlayer(e: React.MouseEvent<HTMLInputElement>) {
	// 	if (excluded) {
	// 		dispatch(clearToggle(e));
	// 	} else {
	// 		dispatch(excludePlayer(e));
	// 	}
	// }

	return (
		<div className="flex items-center text-xs justify-center">
			<label
				className={clsx(
					'relative hover:bg-blue-900 hover:text-white border border-gray-300 hover:border-blue-900 rounded-l px-2 py-1 mx-0 outline-none focus:shadow-outline cursor-pointer border-r-0',
					locked
						? 'border-blue-900 bg-blue-900 text-white'
						: 'bg-gray-50 hover:bg-blue-900 hover:text-white'
				)}
				htmlFor={`lock-${id}`}
			>
				<input
					checked={locked}
					className="invisible h-0 w-0 absolute"
					data-type={ETableToggle.Locked}
					id={`lock-${id}`}
					name={`lockOrExclude-${id}`}
					type="radio"
					value={id}
					onClick={handleLockPlayer}
				/>
				<span className="sr-only">Lock</span>
				<IconLock height={14} width={14} />
			</label>
			<label
				className={clsx(
					'bg-gray-50 hover:bg-blue-900 hover:text-white border border-gray-300 hover:border-blue-900 rounded-r px-2 py-1 mx-0 outline-none focus:shadow-outline cursor-pointer'
					// excluded
					// 	? 'text-white border-blue-900 bg-blue-900 hover:text-white'
					// 	: ''
				)}
				htmlFor={`exclude-${id}`}
			>
				<input
					// checked={excluded}
					className="invisible h-0 w-0 absolute"
					data-type={ETableToggle.Excluded}
					id={`exclude-${id}`}
					name={`lockOrExclude-${id}`}
					type="radio"
					value={id}
					// onClick={handleExcludePlayer}
				/>
				<span className="sr-only">Exclude</span>
				<svg
					className="fill-current"
					height="14"
					viewBox="0 0 24 24"
					width="14"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g data-name="Layer 2">
						<g data-name="slash">
							<rect height="24" opacity="0" width="24" />
							<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm8 10a7.92 7.92 0 0 1-1.69 4.9L7.1 5.69A7.92 7.92 0 0 1 12 4a8 8 0 0 1 8 8zM4 12a7.92 7.92 0 0 1 1.69-4.9L16.9 18.31A7.92 7.92 0 0 1 12 20a8 8 0 0 1-8-8z" />
						</g>
					</g>
				</svg>
			</label>
		</div>
	);
};
