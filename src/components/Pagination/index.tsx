'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import {
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as PaginationShad,
} from '@/components/ui/pagination'

interface PaginationComponentProps {
	totalItem?: number
	className?: string
	limit: number
	paramKey?: string
}

const Pagination: React.FC<PaginationComponentProps> = ({
	totalItem = 0,
	className,
	limit,
	paramKey = 'page',
}) => {
	const searchParams = useSearchParams()
	const page = searchParams.get(paramKey) || 1
	const totalPages = Math.ceil(totalItem / limit) || 1
	const pathname = usePathname()

	return (
		<PaginationShad className={className}>
			<PaginationContent>
				{Number(page) === 1 || page === null ? null : (
					<PaginationItem>
						<PaginationPrevious
							href={`${pathname}?${paramKey}=${Number(page) - 1}`}
						/>
					</PaginationItem>
				)}
				{Array.from({ length: totalPages }, (_, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href={`${pathname}?${paramKey}=${index + 1}`}
							isActive={Number(page) === index + 1}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{Number(page) === totalPages || page === null ? null : (
					<PaginationItem>
						<PaginationNext
							href={`${pathname}?${paramKey}=${Number(page) + 1}`}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</PaginationShad>
	)
}

export default Pagination
