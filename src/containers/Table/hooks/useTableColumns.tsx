import { createColumnHelper } from '@tanstack/react-table';
import Image from 'next/image';

import Pill from '@/components/global/pill';
import { IPlayer, PlayerStatusMap } from '@/containers/Players';

const columnHelper = createColumnHelper<IPlayer>();

function useTableColumns() {
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
			enableGlobalFilter: false,
			enableSorting: false,
			header: '',
		}),
		columnHelper.accessor('status', {
			cell: (info) => {
				const status = PlayerStatusMap.get(info.getValue());

				if (status) {
					return (
						<div className="text-center">
							<Pill status={status.color}>
								{status.translation}
							</Pill>
						</div>
					);
				}

				return <></>;
			},
			enableColumnFilter: true,
			enableGlobalFilter: false,
			enableSorting: false,
			filterFn: 'arrIncludesSome',
		}),
		columnHelper.accessor('firstName', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
			enableGlobalFilter: true,
			enableSorting: false,
		}),
		columnHelper.accessor('lastName', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
			enableGlobalFilter: true,
			enableSorting: false,
		}),
		columnHelper.accessor('position', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
			enableGlobalFilter: true,
			enableSorting: false,
		}),
		columnHelper.accessor('team', {
			cell: (info) => info.getValue(),
			enableColumnFilter: false,
			enableGlobalFilter: true,
			enableSorting: false,
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
			enableGlobalFilter: false,
			enableSorting: true,
		}),
		columnHelper.accessor('fppg', {
			cell: (info) => <div className="text-right">{info.getValue()}</div>,
			enableColumnFilter: false,
			enableGlobalFilter: false,
			enableSorting: true,
		}),
	];

	return columns;
}

export default useTableColumns;
