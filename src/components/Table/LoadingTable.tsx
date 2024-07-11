import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'

const LoadingTable = <T,>({
	columns,
	rows = 6,
}: {
	columns: ColumnDef<T>[]
	rows?: number
}) => {
	const table = useReactTable({
		data: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="bg-neutral-06 h-full rounded-md px-3">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{React.Children.toArray(
						Array(rows)
							.fill(1)
							.map(() => (
								<TableRow>
									{React.Children.toArray(
										Array(columns.length)
											.fill(1)
											.map(() => (
												<TableCell className="h-16 p-2">
													<Skeleton className="h-10 w-full px-2" />
												</TableCell>
											)),
									)}
								</TableRow>
							)),
					)}
				</TableBody>
			</Table>
		</div>
	)
}

export default LoadingTable
