/* eslint-disable react/display-name */
import Image from 'next/image';
import { useMemo } from 'react';
import { Column } from 'react-table';

import { IPlayer } from '@/containers/Players';

import Pill from '../../../components/global/pill';
import { Status, StatusTranslation } from '../../../interfaces/IStatus';
import { MultiSelectColumnFilter } from './filters/StatusFilter';
import Toggle from './Table.lockExclude';

const KEYS = (gameType?: string) =>
	[
		{
			Footer: 'Total',
			Header: () => null,
			accessor: (accessor) => (
				<div
					className="ml-auto mr-auto overflow-hidden"
					style={{
						height: '62px',
						position: 'relative',
						width: '62px',
					}}
				>
					{accessor.image && (
						<Image
							alt={`${accessor.firstName} ${accessor.lastName}`}
							layout="fill"
							objectFit="cover"
							src={accessor.image!}
						/>
					)}
				</div>
			),
			disableFilters: true,
			id: 'profile_picture',
		},
		{
			Cell: (cell) => (
				<Pill status={Status[cell.value]}>
					{StatusTranslation[cell.value]}
				</Pill>
			),
			Filter: MultiSelectColumnFilter,
			Header: 'Status',
			accessor: 'status',
			filter: 'multiple',
		},
		{ Header: 'First Name', accessor: 'firstName', disableFilters: true },
		{ Header: 'Last Name', accessor: 'lastName', disableFilters: true },
		{
			Header: 'Position',
			accessor: (accessor) =>
				gameType?.toLowerCase().includes('showdown')
					? accessor.draftPositions
					: accessor.position,
			disableFilters: true,
		},
		{ Header: 'Team', accessor: 'team', disableFilters: true },
		{
			Cell: (cell) => (
				<div className="text-right">
					{new Intl.NumberFormat('en-US', {
						currency: 'USD',
						minimumFractionDigits: 0,
						style: 'currency',
					}).format(cell.value)}
				</div>
			),
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
							currency: 'USD',
							minimumFractionDigits: 0,
							style: 'currency',
						}).format(total)}
					</div>
				);
			},
			Header: () => <div className="text-right">Salary</div>,

			accessor: 'salary',
			disableFilters: true,
		},
		{
			Cell: (cell) => <div className="text-right">{cell.value}</div>,
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
			Header: () => <div className="text-right">FPPG</div>,
			accessor: 'fppg',
			disableFilters: true,
		},
		{
			Cell: (cell) => {
				return <Toggle id={cell.value} />;
			},
			Header: () => null,
			accessor: 'id',
			disableFilters: true,
		},
		{
			Cell: ({ row }) => (
				<span {...row.getToggleRowExpandedProps()}>
					<svg
						className="h-5 w-5 text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
						/>
					</svg>
				</span>
			),
			Header: () => null,
			id: 'more_actions',
		},
	] as Column<IPlayer>[];

export default KEYS;
