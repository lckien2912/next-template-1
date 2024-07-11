'use client'

import Link from 'next/link'
import * as React from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import PaginationComponent from '../Pagination'
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table'

interface DataTableProps<T> {
	data: T[]
	columns: ColumnDef<T>[]
	limit?: number
	totalRow?: number
	paginationKey?: string
}

const DataTable: React.FC<DataTableProps<any>> = ({
	data,
	columns,
	limit = 12,
	totalRow = 20,
	paginationKey = 'page',
}) => {
	const [sorting, setSorting] = React.useState<SortingState>([])

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)

	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		initialState: {
			pagination: {
				pageSize: limit,
			},
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className="bg-neutral-06 h-full w-full rounded-md px-3">
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
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="relative">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
										{row.original?.url && (
											<Link
												href={row.original?.url}
												className="absolute left-0 top-0 z-10 h-full w-full"
											/>
										)}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="heading-5 body-2 text-neutral-04 w-full items-center justify-center gap-1 py-[130px] pr-0"
							>
								<div className="flex items-center justify-center gap-1">
									<span className="">No result</span>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="flex items-center justify-end space-x-2 py-4">
				<PaginationComponent
					limit={limit}
					totalItem={totalRow}
					paramKey={paginationKey}
				/>
			</div>
		</div>
	)
}

export default DataTable
