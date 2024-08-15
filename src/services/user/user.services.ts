import { apiWithAuth } from '..'
import { UserModel } from './user.models'

const ENDPOINT = '/user'

const getUserMe = async () => apiWithAuth.get<UserModel>(`${ENDPOINT}/me`)

const updateUser = async (body: UserModel) =>
	apiWithAuth.patch<UserModel>(ENDPOINT, body)

export const userServices = {
	getUserMe,
	updateUser,
}
