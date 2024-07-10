import { apiWithAuth } from '..'
import { UserModels } from './user.models'
import { EditUserBody } from './user.types'

const ENDPOINT = '/user'

const getUserMe = async () =>
	await apiWithAuth.get<UserModels>(`${ENDPOINT}/me`)

const updateUser = async (body: EditUserBody) =>
	await apiWithAuth.patch<UserModels>(ENDPOINT, body)

export const userServices = {
	getUserMe,
	updateUser,
}
