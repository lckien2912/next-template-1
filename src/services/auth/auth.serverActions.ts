'use server'

import { cookies } from 'next/headers'

import { apiWithAuth, apiWithoutAuth } from '..'
import { SignInModel } from './auth.models'
import { SignInParams } from './auth.types'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/variables'

const ENDPOINT = '/auth'

export const getAccessToken = () => {
	return cookies().get(ACCESS_TOKEN)?.value
}

export const getRefreshToken = () => {
	return cookies().get(REFRESH_TOKEN)?.value
}

export const setAccessToken = (accessToken: string) => {
	return cookies().set(ACCESS_TOKEN, accessToken)
}

export const setRefreshToken = (refreshToken: string) => {
	return cookies().set(REFRESH_TOKEN, refreshToken)
}

export const deleteRefreshToken = () => {
	cookies().delete(REFRESH_TOKEN)
}

export const postSignIn = async (body: SignInParams) => {
	try {
		const { data } = await apiWithoutAuth.post<SignInModel>(
			ENDPOINT + '/sign-in',
			body,
		)
		const { accessToken, refreshToken } = data

		cookies().set(ACCESS_TOKEN, accessToken)
		cookies().set(REFRESH_TOKEN, refreshToken)

		return true
	} catch (e) {
		throw new Error((e as Error).message)
	}
}

export const postLogout = async () => {
	try {
		const { data: isLogout } = await apiWithAuth.post<boolean>(
			ENDPOINT + '/logout',
		)

		return isLogout
	} catch (e) {
		throw new Error((e as Error).message)
	} finally {
		cookies().delete(ACCESS_TOKEN)
		cookies().delete(REFRESH_TOKEN)
	}
}
