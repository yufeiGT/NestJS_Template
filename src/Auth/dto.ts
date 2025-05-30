import { ROLE_TYPE } from 'src/Decorators/roles';

/**
 * 用户授权信息
 */
export class UserAuthInfoDto {
	/**
	 * 用户ID
	 */
	id: number;
	/**
	 * 用户名
	 */
	userName: string;
	/**
	 * 生成时间
	 */
	iat?: number;
	/**
	 * 过期时间
	 */
	exp?: number;
}
