/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-unused-vars */
import { requestWithAuth, requestWithoutAuth } from './config'
import { IResponseSuccess, Params, RequestOptions } from './config.types'

function createAPI(
	request: <T>(
		url: string,
		params?: Params | FormData,
		options?: RequestOptions,
	) => Promise<IResponseSuccess<T>>,
) {
	return {
		async get<T>(
			url: string,
			params?: Record<string, any>,
			options?: RequestOptions,
		) {
			return request<T>(url, params, { ...options, method: 'GET' })
		},

		async post<T>(
			url: string,
			params?: Record<string, any> | FormData,
			options?: RequestOptions,
		) {
			return request<T>(url, params, { ...options, method: 'POST' })
		},

		async patch<T>(
			url: string,
			params?: Record<string, any> | FormData,
			options?: RequestOptions,
		) {
			return request<T>(url, params, { ...options, method: 'PATCH' })
		},

		async put<T>(
			url: string,
			params?: Record<string, any> | FormData,
			options?: RequestOptions,
		) {
			return request<T>(url, params, { ...options, method: 'PUT' })
		},

		async delete<T>(
			url: string,
			params?: Record<string, any>,
			options?: RequestOptions,
		) {
			return request<T>(url, params, { ...options, method: 'DELETE' })
		},
	}
}

// Create apiWithoutAuth and apiWithAuth objects
export const apiWithoutAuth = createAPI(requestWithoutAuth)

export const apiWithAuth = createAPI(requestWithAuth)
