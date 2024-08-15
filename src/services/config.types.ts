/* eslint-disable @typescript-eslint/naming-convention */
export type Params = Record<string, string | number | boolean>

export interface IServerResponseSuccess<T> {
	success: true
	statusCode: number
	message: string
	data: T
	totalRow: number
}

export interface IResponseSuccess<T> {
	data: T
	totalRow?: number
}

export interface RequestOptions extends RequestInit {
	headers?: Record<string, string>
}
