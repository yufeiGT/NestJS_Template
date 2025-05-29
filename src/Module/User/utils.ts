import { HttpException } from '@nestjs/common';
import { Launcher } from '@~crazy/launcher';

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
	};
}

/**
 * 用户不存在
 */
export function userNotExist() {
	const { ClientNotFoundError } = Launcher.ResponseCode;
	throw new HttpException(
		{
			message: `用户不存在`,
			statusCode: ClientNotFoundError,
		},
		ClientNotFoundError
	);
}

/**
 * 用户密码错误
 */
export function userPasswordError() {
	const { ClientRefuseError, getDescription } = Launcher.ResponseCode;
	throw new HttpException(
		{
			message: `${getDescription(ClientRefuseError)}，密码错误`,
			statusCode: ClientRefuseError,
		},
		ClientRefuseError
	);
}
