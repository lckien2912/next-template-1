import { apiWithAuth } from '..'
import { UserModel } from './user.models'
import { EditUserBody } from './user.types'

const ENDPOINT = '/user'

const getUserMe = async () => await apiWithAuth.get<UserModel>(`${ENDPOINT}/me`)

const updateUser = async (body: EditUserBody) =>
	await apiWithAuth.patch<UserModel>(ENDPOINT, body)

export const userServices = {
	getUserMe,
	updateUser,
}
