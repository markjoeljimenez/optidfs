/* eslint-disable react/display-name */
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';
import { useMemo } from 'react';

import { IPlayer } from '@/containers/Players';

import Pill from '../../../components/global/pill';
import { Status, StatusTranslation } from '../../../interfaces/IStatus';
import { MultiSelectColumnFilter } from './filters/StatusFilter';
import Toggle from './Table.lockExclude';

const columnHelper = createColumnHelper<IPlayer>();

const KEYS = [
	columnHelper.accessor('image', {
		cell: (info) => (
			<div
				className="ml-auto mr-auto overflow-hidden rounded-full"
				style={{
					height: '40px',
					position: 'relative',
					width: '40px',
				}}
			>
				{info.getValue() && (
					<Image
						alt={`${info.row.original.firstName} ${info.row.original.firstName}`}
						layout="fill"
						objectFit="cover"
						src={info.getValue()!}
					/>
				)}
			</div>
		),
		header: '',
	}),
	columnHelper.accessor('status', {
		cell: (info) => (
			<div className="text-center">
				<Pill status={Status[info.getValue()]}>
					{StatusTranslation[info.getValue()]}
				</Pill>
			</div>
		),
	}),
	columnHelper.accessor('firstName', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('lastName', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('position', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('team', {
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('salary', {
		cell: (info) => (
			<div className="text-right">
				{new Intl.NumberFormat('en-US', {
					currency: 'USD',
					minimumFractionDigits: 0,
					style: 'currency',
				}).format(info.getValue())}
			</div>
		),
	}),
	columnHelper.accessor('fppg', {
		cell: (info) => <div className="text-right">{info.getValue()}</div>,
	}),
	columnHelper.accessor('id', {
		cell: (info) => <Toggle id={info.getValue()} />,
		header: '',
	}),
];

export default KEYS;
