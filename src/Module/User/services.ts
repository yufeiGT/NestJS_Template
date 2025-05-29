import { Injectable, HttpException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from 'bcryptjs';
import { Launcher } from '@~crazy/launcher';

import { UserAuthInfoDto } from 'src/Auth/dto';

import { User } from './entity';
import {
	EditPasswordParamsDto,
	LoginParamsDto,
	RegisterParamsDto,
} from './Dto/request.dto';
import { UserInfo } from './Dto/response.dto';
import { getUserInfo, userNotExist, userPasswordError } from './utils';

@Injectable()
export class UserService {
	constructor(
		@Inject(ConfigService) private readonly configService: ConfigService,
		@Inject(JwtService) private readonly jwtService: JwtService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	/**
	 * 用户登录
	 * @param param0
	 * @returns
	 */
	async login({ username, password }: LoginParamsDto) {
		const user = await this.getUserByName(username);
		if (user) {
			if (compareSync(password, user.password)) {
				user.lastLoginDate = new Date();
				await this.userRepository.save(user);
				return {
					...getUserInfo(user),
					token: this.getToken(user.id, user.userName),
				} as UserInfo;
			} else {
				userPasswordError();
			}
		} else {
			userNotExist();
		}
	}

	/**
	 * 用户注册
	 * @param param0
	 * @returns
	 */
	async register(params: RegisterParamsDto) {
		const user = await this.getUserByName(params.username);
		if (user) {
			const { ClientRefuseError, getDescription } = Launcher.ResponseCode;
			throw new HttpException(
				{
					message: `${getDescription(ClientRefuseError)}，用户已存在`,
					statusCode: ClientRefuseError,
				},
				ClientRefuseError
			);
		} else {
			const salt = Number(this.configService.get<string>('SALT'));
			let newUser = new User();
			newUser.founderId = 'SYSTEM';
			newUser.userName = params.username;
			newUser.password = hashSync(params.password, salt);
			if (params.nickName) {
				newUser.nickName = params.nickName;
			}
			if (params.picture) {
				newUser.picture = params.picture;
			}
			newUser = await this.userRepository.save(newUser);
			return {
				...getUserInfo(newUser),
				token: this.getToken(newUser.id, newUser.userName),
			} as UserInfo;
		}
	}

	/**
	 * 修改密码
	 * @param param0
	 * @param param1
	 * @returns
	 */
	async editPassword(
		{ id }: UserAuthInfoDto,
		{ password, newPassword }: EditPasswordParamsDto
	) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (user) {
			if (compareSync(password, user.password)) {
				if (password == newPassword) {
					return false;
				} else {
					const salt = Number(this.configService.get<string>('SALT'));
					const res = await this.userRepository.update(user.id, {
						password: hashSync(newPassword, salt),
					});
					return !!res.affected;
				}
			} else {
				userPasswordError();
			}
		} else {
			userNotExist();
		}
	}

	/**
	 * 根据用户名获取用户
	 * @param userName
	 * @returns
	 */
	async getUserByName(userName: string) {
		return await this.userRepository.findOne({
			where: {
				userName,
			},
		});
	}

	/**
	 * 检查用户合法性
	 * @param id 用户ID
	 * @returns
	 */
	async checkUser(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id,
			},
		});
		if (user) {
			return getUserInfo(user);
		} else {
			const { ClientNotFoundError, getDescription } =
				Launcher.ResponseCode;
			throw new HttpException(
				{
					message: `${getDescription(ClientNotFoundError)}，非法用户`,
					statusCode: ClientNotFoundError,
				},
				ClientNotFoundError
			);
		}
	}

	/**
	 * 获取用户令牌
	 * @param id
	 * @param userName
	 * @returns
	 */
	getToken(id: number, userName: string) {
		return this.jwtService.sign({
			id,
			userName,
		});
	}
}
