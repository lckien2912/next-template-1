'use server'

import { cookies } from 'next/headers'

import { apiWithAuth, apiWithoutAuth } from '..'
import { SignInModel } from './auth.models'
import { SignInParams } from './auth.types'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/variables'

const ENDPOINT = '/auth'

export const postSignIn = async (body: SignInParams) => {
	try {
		const { data } = await apiWithoutAuth.post<SignInModel>(
			`${ENDPOINT}/sign-in`,
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
			`${ENDPOINT}/logout`,
		)

		return isLogout
	} catch (e) {
		throw new Error((e as Error).message)
	} finally {
		cookies().delete(ACCESS_TOKEN)
		cookies().delete(REFRESH_TOKEN)
	}
}
