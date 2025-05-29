import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Launcher } from '@~crazy/launcher';

import { UserAuthInfoDto } from 'src/Auth/dto';
import { UserService } from 'src/Module/User/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.SECRET_KEY,
		});
	}

	async validate(payload: UserAuthInfoDto) {
		const { Success, ClientProhibitError, getDescription } =
			Launcher.ResponseCode;
		if (payload) {
			try {
				await this.userService.checkUser(payload.id);
				return payload;
			} catch (err) {
				const res: Launcher.Response<typeof err> = {
					data: err.response.data,
					code: ClientProhibitError,
					message: getDescription(ClientProhibitError),
					dateTime: Date.now(),
				};
				throw new HttpException(res, Success);
			}
		} else {
			const res: Launcher.Response<null> = {
				data: null,
				code: ClientProhibitError,
				message: getDescription(ClientProhibitError),
				dateTime: Date.now(),
			};
			throw new HttpException(res, Success);
		}
	}
}
