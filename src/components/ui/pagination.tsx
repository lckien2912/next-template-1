import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { ButtonProps } from '@/components/ui/button'

// import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { cn } from '@/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn('mx-auto flex w-full justify-center', className)}
		{...props}
	/>
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn('flex flex-row items-center gap-2', className)}
		{...props}
	/>
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
	HTMLLIElement,
	React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
	<li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<ButtonProps, 'size'> &
	React.ComponentProps<typeof Link>

const PaginationLink = ({
	className,
	isActive,
	href,
	children,
	...props
}: PaginationLinkProps) => (
	<Link
		scroll={false}
		aria-current={isActive ? 'page' : undefined}
		href={href as string}
		className={cn(
			'group relative block h-11 w-11 rounded-[10px] border-2 border-solid border-neutral-00/20 p-0 hover:bg-primary',
			isActive && 'bg-primary text-black',
			className
		)}
		{...props}
	>
		<span className="heading-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-black">
			{children}
		</span>
	</Link>
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		size="default"
		className={className}
		{...props}
	>
		{/* <ArrowLeftIcon className="absolute left-1/2 top-1/2 h-[22px]  w-[22px] -translate-x-1/2 -translate-y-1/2 fill-white group-hover:fill-black" /> */}
	</PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		size="default"
		className={className}
		{...props}
	>
		{/* <ArrowRightIcon className="absolute left-1/2 top-1/2 h-[22px]  w-[22px] -translate-x-1/2 -translate-y-1/2 fill-white group-hover:fill-black" /> */}
	</PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<'span'>) => (
	<span
		aria-hidden
		className={cn('flex h-9 w-9 items-center justify-center', className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">More pages</span>
	</span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}
