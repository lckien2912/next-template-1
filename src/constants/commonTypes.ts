export type CommonFilterType = {
	page?: number
	limit?: number
}

export type CommonFilterWithDateType = CommonFilterType & {
	fromDate?: string
	toDate?: string
}
