'use server'

import { cookies } from 'next/headers'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/variables'

const getAccessToken = () => cookies().get(ACCESS_TOKEN)?.value

const getRefreshToken = () => cookies().get(REFRESH_TOKEN)?.value

const setAccessToken = (accessToken: string) =>
	cookies().set(ACCESS_TOKEN, accessToken)

const setRefreshToken = (refreshToken: string) =>
	cookies().set(REFRESH_TOKEN, refreshToken)

const deleteAccessToken = () => cookies().delete(ACCESS_TOKEN)

const deleteRefreshToken = () => cookies().delete(REFRESH_TOKEN)

export const TokenServices = {
	getAccessToken,
	getRefreshToken,
	setAccessToken,
	setRefreshToken,
	deleteAccessToken,
	deleteRefreshToken,
}
