export type ClassName = { className?: string }

export type CommonFilter = {
	page?: number
	limit?: number
}

export type CommonFilterWithDate = CommonFilter & {
	fromDate?: string
	toDate?: string
}
