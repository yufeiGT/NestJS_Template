import { Controller, Post, Body, Req, Put } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/Auth/public';

import { UserService } from './services';
import {
	EditPasswordParamsDto,
	LoginParamsDto,
	RegisterParamsDto,
} from './Dto/request.dto';

@Controller('/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post('/login')
	login(@Body() body: LoginParamsDto) {
		return this.userService.login(body);
	}

	@Public()
	@Post('/register')
	register(@Body() body: RegisterParamsDto) {
		return this.userService.register(body);
	}

	@Put('/password')
	editPassword(@Req() req: Request, @Body() body: EditPasswordParamsDto) {
		return this.userService.editPassword(req.user as any, body);
	}

}
