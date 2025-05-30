import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/**
 * 登录参数
 */
export class LoginParamsDto {
	/**
	 * 用户名
	 */
	@IsNotEmpty()
	@IsString()
	username: string;

	/**
	 * 密码，需要使用 md5 进行加密（32位大）
	 */
	@IsNotEmpty()
	@IsString()
	password: string;
}

/**
 * 注册参数
 */
export class RegisterParamsDto {
	/**
	 * 用户名
	 */
	@IsNotEmpty()
	@IsString()
	username: string;

	/**
	 * 密码，需要使用 md5 进行加密（32位大）
	 */
	@IsNotEmpty()
	@IsString()
	password: string;

	/**
	 * 昵称
	 */
	@IsOptional()
	@IsString()
	nickName?: string;

	/**
	 * 用户头像
	 */
	@IsOptional()
	@IsString()
	picture?: string;
}

/**
 * 修改密码参数
 */
export class EditPasswordParamsDto {
	/**
	 * 密码，需要使用 md5 进行加密（32位大）
	 */
	@IsNotEmpty()
	@IsString()
	password: string;

	/**
	 * 新密码，需要使用 md5 进行加密（32位大）
	 */
	@IsNotEmpty()
	@IsString()
	newPassword: string;
}

/**
 * 删除或冻结用户参数
 */
export class DeleteOrFreezeUserParamsDto {
	/**
	 * 用户ID
	 */
	@IsNotEmpty()
	@IsInt()
	userId: number;
}
