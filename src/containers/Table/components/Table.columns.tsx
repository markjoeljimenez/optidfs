import { createColumnHelper, Row } from '@tanstack/react-table';
import { useFlags } from 'flagsmith/react';
import Image from 'next/image';

import { IPlayer } from '@/containers/Players';

import Pill from '../../../components/global/pill';
import { Status, StatusTranslation } from '../../../interfaces/IStatus';
import Toggle from './Table.lockExclude';

const columnHelper = createColumnHelper<IPlayer>();

function useColumns() {
	const { stacking } = useFlags(['stacking']);

	const columns = [
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
			enableColumnFilter: false,
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
			enableColumnFilter: true,
			filterFn: 'arrIncludesSome',
			// filterFn: (
			// 	row: Row<IPlayer>,
			// 	columnId: string,
			// 	filterValue: any
			// ) => {
			// 	console.log(row, columnId, filterValue);
			// 	return true;
			// },
		}),
		columnHelper.accessor('firstName', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
		}),
		columnHelper.accessor('lastName', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
		}),
		columnHelper.accessor('position', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
		}),
		columnHelper.accessor('team', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
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
			enableColumnFilter: false,
		}),
		columnHelper.accessor('fppg', {
			cell: (info) => <div className="text-right">{info.getValue()}</div>,
			enableColumnFilter: false,
		}),
	];

	if (stacking.enabled) {
		columns.push(
			columnHelper.accessor('id', {
				cell: (info) => <Toggle id={info.getValue()} />,
				enableColumnFilter: false,
				header: '',
			}) as any
		);
	}

	return columns;
}

export default useColumns;
