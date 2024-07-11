import { cn } from '@/utils'

const Skeleton = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn('bg-neutral-05 animate-pulse rounded-md', className)}
			{...props}
		/>
	)
}

export { Skeleton }
