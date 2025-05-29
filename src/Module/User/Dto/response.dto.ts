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
	 * 用户令牌
	 */
	token?: string;
}
