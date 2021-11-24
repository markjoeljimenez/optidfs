import clsx from 'clsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import {
	lockPlayer,
	excludePlayer,
	clearToggle,
} from '../../Players/Players.actions';

export enum ELockOrExclude {
	Locked = 'locked',
	Excluded = 'excluded',
}

interface ILockOrExclude {
	id: number;
}

const LockOrExclude = ({ id }: ILockOrExclude) => {
	const players = useAppSelector((state) => state.players);
	const dispatch = useAppDispatch();

	const locked = players?.locked?.some((_player) => _player.id === id);
	const excluded = players?.excluded?.some((_player) => _player.id === id);

	function handleLockPlayer(e: React.MouseEvent<HTMLInputElement>) {
		if (locked) {
			dispatch(clearToggle(e));
		} else {
			dispatch(lockPlayer(e));
		}
	}

	function handleExcludePlayer(e: React.MouseEvent<HTMLInputElement>) {
		if (excluded) {
			dispatch(clearToggle(e));
		} else {
			dispatch(excludePlayer(e));
		}
	}

	return (
		<div className="toggle flex items-center text-xs">
			<label
				className={clsx(
					'bg-gray-100 hover:bg-blue-900 hover:text-white border border-gray-400 hover:border-blue-900 rounded-l-full px-2 py-1 mx-0 outline-none focus:shadow-outline cursor-pointer border-r-0',
					locked
						? 'text-white border-blue-900 bg-blue-900 hover:text-white'
						: ''
				)}
				htmlFor={`lock-${id}`}
			>
				<input
					checked={locked}
					data-type={ELockOrExclude.Locked}
					id={`lock-${id}`}
					name={`lockOrExclude-${id}`}
					onClick={handleLockPlayer}
					type="radio"
					value={id}
				/>
				<span className="sr-only">Lock</span>
				<svg
					className="fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="14"
					height="14"
				>
					<g data-name="Layer 2">
						<g data-name="lock">
							<rect width="24" height="24" opacity="0" />
							<path d="M17 8h-1V6.11a4 4 0 1 0-8 0V8H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-7-1.89A2.06 2.06 0 0 1 12 4a2.06 2.06 0 0 1 2 2.11V8h-4zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z" />
							<path d="M12 12a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
						</g>
					</g>
				</svg>
			</label>
			<label
				className={clsx(
					'bg-gray-100 hover:bg-blue-900 hover:text-white border border-gray-400 hover:border-blue-900 rounded-r-full px-2 py-1 mx-0 outline-none focus:shadow-outline cursor-pointer',
					excluded
						? 'text-white border-blue-900 bg-blue-900 hover:text-white'
						: ''
				)}
				htmlFor={`exclude-${id}`}
			>
				<input
					checked={excluded}
					data-type={ELockOrExclude.Excluded}
					id={`exclude-${id}`}
					name={`lockOrExclude-${id}`}
					onClick={handleExcludePlayer}
					type="radio"
					value={id}
				/>
				<span className="sr-only">Exclude</span>
				<svg
					className="fill-current"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="14"
					height="14"
				>
					<g data-name="Layer 2">
						<g data-name="slash">
							<rect width="24" height="24" opacity="0" />
							<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm8 10a7.92 7.92 0 0 1-1.69 4.9L7.1 5.69A7.92 7.92 0 0 1 12 4a8 8 0 0 1 8 8zM4 12a7.92 7.92 0 0 1 1.69-4.9L16.9 18.31A7.92 7.92 0 0 1 12 20a8 8 0 0 1-8-8z" />
						</g>
					</g>
				</svg>
			</label>
			{/* {locked || excluded ? (
				<button
					type="button"
					className="ml-4 text-xs uppercase font-bold text-red-700 hover:underline"
					onClick={handleClearSelection}
					value={id}
				>
					Clear
				</button>
			) : (
				<></>
			)} */}
		</div>
	);
};

export default LockOrExclude;
