import { ROLE_TYPE } from 'src/Decorators/roles';

/**
 * 用户信息
 */
export interface UserInfo {
	/**
	 * 用户ID
	 */
	id: number;
	/**
	 * 用户名
	 */
	userName: string;
	/**
	 * 昵称
	 */
	nickName: string;
	/**
	 * 用户头像
	 */
	picture: string;
	/**
	 * 用户角色列表
	 */
	roles: ROLE_TYPE[];
	/**
	 * 用户令牌
	 */
	token?: string;
}
