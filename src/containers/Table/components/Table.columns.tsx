/* eslint-disable react/display-name */
import { useMemo } from 'react';
import { Column } from 'react-table';
import Pill from '../../../components/global/pill';
import { IPlayer } from '../../../interfaces/IPlayer';
import { StatusTranslation } from '../../../interfaces/IStatus';

import Toggle from './Table.lockExclude';

const KEYS = (gameType?: string) =>
	[
		{
			Header: () => null,
			id: 'profile_picture',
			accessor: (accessor) => (
				<div
					className="text-center overflow-hidden"
					style={{ maxHeight: '62px', maxWidth: '62px' }}
				>
					<img
						src={accessor.image}
						alt={`${accessor.firstName} ${accessor.lastName}`}
					/>
				</div>
			),
			Footer: 'Total',
		},
		{
			Header: 'Status',
			accessor: 'status',
			Cell: (cell) => (
				<Pill status={cell.value}>{StatusTranslation[cell.value]}</Pill>
			),
		},
		{ Header: 'First Name', accessor: 'firstName' },
		{ Header: 'Last Name', accessor: 'lastName' },
		{
			Header: 'Position',
			accessor: (accessor) =>
				gameType?.toLowerCase().includes('showdown')
					? accessor.draftPositions
					: accessor.position,
		},
		{ Header: 'Team', accessor: 'team' },
		{
			Header: () => <div className="text-right">Salary</div>,
			accessor: 'salary',
			Footer: (info) => {
				const total = useMemo(
					() =>
						info.rows.reduce(
							(sum, row) => row.values.salary + sum,
							0
						),
					[info.rows]
				);

				return (
					<div className="text-right">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'USD',
							minimumFractionDigits: 0,
						}).format(total)}
					</div>
				);
			},
			Cell: (cell) => (
				<div className="text-right">
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD',
						minimumFractionDigits: 0,
					}).format(cell.value)}
				</div>
			),
		},
		{
			Header: () => <div className="text-right">FPPG</div>,
			accessor: 'fppg',
			Footer: (info) => {
				const total = useMemo(
					() =>
						info.rows.reduce(
							(sum, row) => parseFloat(row.values.fppg) + sum,
							0
						),
					[info.rows]
				);

				return <div className="text-right">{total.toFixed(2)}</div>;
			},
			Cell: (cell) => <div className="text-right">{cell.value}</div>,
		},
		{
			Header: () => null,
			accessor: 'id',
			Cell: (cell) => {
				return <Toggle id={cell.value} />;
			},
		},
		{
			Header: () => null,
			id: 'more_actions',
			Cell: ({ row }) => (
				<span {...row.getToggleRowExpandedProps()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
						/>
					</svg>
				</span>
			),
		},
	] as Column<IPlayer>[];

export default KEYS;
