import { Launcher } from '@gluttons/launcher';

import { ResponseError } from 'src/Entity/error';

import { User } from './entity';
import { UserInfo } from './Dto/response.dto';

/**
 * 获取用户信息
 * @param user
 */
export function getUserInfo(user: User): UserInfo {
	return {
		id: user.id ? Number(user.id) : null,
		userName: user.userName,
		nickName: user.nickName || '',
		picture: user.picture || '',
		roles: user.roles,
	};
}

/**
 * 用户不存在
 */
export function userNotExist() {
	const { ClientNotFoundError } = Launcher.ResponseCode;
	new ResponseError({
		code: ClientNotFoundError,
		message: `用户不存在`,
	}).thorwError();
}

/**
 * 用户密码错误
 */
export function userPasswordError() {
	const { ClientRefuseError, getDescription } = Launcher.ResponseCode;
	new ResponseError({
		code: ClientRefuseError,
		message: `${getDescription(ClientRefuseError)}，密码错误`,
	}).thorwError();
}
