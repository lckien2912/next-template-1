import { apiWithoutAuth } from '..'
import { CheckPublicAddressModel, SignUpModel } from './auth.models'
import { postLogout, postSignIn } from './auth.serverActions'
import { CheckPublicAddressParams, SignUpParams } from './auth.types'

const ENDPOINT = '/auth'

const getPublicAddressAvailability = async (params: CheckPublicAddressParams) =>
	apiWithoutAuth.get<CheckPublicAddressModel>(
		`${ENDPOINT}/public-address-availability`,
		params,
	)

const postSignUp = async (body: SignUpParams) =>
	apiWithoutAuth.post<SignUpModel>(`${ENDPOINT}/sign-up`, body)

export const authServices = {
	getPublicAddressAvailability,
	postSignUp,
	postSignIn,
	postLogout,
}
