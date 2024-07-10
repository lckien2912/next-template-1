import queryString from 'query-string'

import { ISignInModel } from './auth/auth.models'
import {
	deleteRefreshToken,
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
} from './auth/auth.serverActions'

export const BASE_URL = process.env.NEXT_PUBLIC_API
const HTTP_METHOD_GET = 'GET'
const CONTENT_TYPE_JSON = 'application/json'

export interface Params {
	[key: string]: string | number | boolean
}

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

// Base request function
export async function baseRequest<T>(
	url: string,
	params?: Params | FormData,
	options?: RequestOptions
): Promise<IResponseSuccess<T>> {
	try {
		const defaultOptions: RequestOptions = {
			method: HTTP_METHOD_GET,
			headers: {
				Accept: CONTENT_TYPE_JSON,
			},
		}

		const requestOptions: RequestOptions = {
			...defaultOptions,
			...options,
			headers: {
				...defaultOptions.headers,
				...options?.headers,
			},
		}

		// Handle check Content-Type
		if (params) {
			const isFormData = params instanceof FormData

			if (requestOptions.method === HTTP_METHOD_GET) {
				const queryStringParams = queryString.stringify(params, {
					skipEmptyString: true,
					skipNull: true,
				})
				url += '?' + queryStringParams
			} else {
				if (!isFormData) {
					requestOptions.headers = {
						...requestOptions.headers,
						'Content-Type': CONTENT_TYPE_JSON,
					}
				}
				requestOptions.body = isFormData ? params : JSON.stringify(params)
			}
		}

		const response = await fetch(`${BASE_URL}/api/v1${url}`, requestOptions)
		const resData: IServerResponseSuccess<T> = await response.json()

		if (!resData.success) {
			if (resData.statusCode === 401) {
				const oldRefreshToken = await getRefreshToken()

				const res = await fetch(BASE_URL + '/api/v1/auth/refresh-token', {
					method: 'POST',
					headers: { Authorization: `Bearer ${oldRefreshToken}` },
				})

				deleteRefreshToken()
				const data: IServerResponseSuccess<ISignInModel> = await res.json()

				if (data.success) {
					setAccessToken(data.data.accessToken)
					setRefreshToken(data.data.refreshToken)

					const retryRequest = await fetch(`${BASE_URL}/api/v1${url}`, {
						...requestOptions,
						headers: {
							...requestOptions.headers,
							Authorization: `Bearer ${data.data.accessToken}`,
						},
					})
					const resRetry: IServerResponseSuccess<T> = await retryRequest.json()

					return { data: resRetry.data, totalRow: resRetry.totalRow }
				}
			}

			throw new Error(resData.message)
		}

		const { data, totalRow } = resData

		return { data, totalRow }
	} catch (error) {
		throw new Error((error as Error).message as string)
	}
}

// Function for requests without Authorization
export async function requestWithoutAuth<T>(
	url: string,
	params?: Params | FormData,
	options?: RequestOptions
): Promise<IResponseSuccess<T>> {
	return await baseRequest(url, params, options)
}

// Function for requests with Authorization
export async function requestWithAuth<T>(
	url: string,
	params?: Params | FormData,
	options?: RequestOptions
): Promise<IResponseSuccess<T>> {
	const accessToken = await getAccessToken()

	return await baseRequest(url, params, {
		...options,
		headers: { ...options?.headers, Authorization: `Bearer ${accessToken}` },
	})
}
