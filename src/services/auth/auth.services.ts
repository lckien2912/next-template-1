import { apiWithoutAuth } from '..'
import { ICheckPublicAddressModel, ISignUpModel } from './auth.models'
import { postLogout, postSignIn } from './auth.serverActions'
import { ICheckPublicAddressParams, ISignUpParams } from './auth.types'

const ENDPOINT = '/auth'

const getPublicAddressAvailability = async (
	params: ICheckPublicAddressParams
) =>
	await apiWithoutAuth.get<ICheckPublicAddressModel>(
		ENDPOINT + '/public-address-availability',
		params
	)

const postSignUp = async (body: ISignUpParams) =>
	await apiWithoutAuth.post<ISignUpModel>(ENDPOINT + '/sign-up', body)

export const authServices = {
	getPublicAddressAvailability,
	postSignUp,
	postSignIn,
	postLogout,
}
