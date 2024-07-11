import { UserModel } from './user.models'

export type EditUserBody = Pick<
	UserModel,
	'email' | 'discord' | 'twitter' | 'telegram'
>
