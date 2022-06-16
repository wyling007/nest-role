import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService } from '@/services';
import { User } from '@/database/entities';
import { IsNotEmpty, IsString, ValidateIf, Equals, IsHash } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

namespace AuthDto {
	/** 登陆请求验证类 */
	export class LoginParams implements Pick<User, 'username' | 'password'> {
		@ApiProperty({
			description: '用户名',
		})
		@IsString({
			message: '$property必须是字符串',
		})
		@IsNotEmpty()
		username: string;

		@ApiProperty({
			description: '密码 md5加密后的32位字符串',
		})
		@IsHash('md5', { message: '$property必须是md5加密后的32位字符串' })
		@IsNotEmpty()
		password: string;
	}
	/** 注册请求参数类型 */
	type RegisterParamsType = Pick<User, 'username' | 'password'> & { confirmPassword: string };
	/** 注册请求验证类 */
	export class RegisterParams extends LoginParams implements RegisterParamsType {
		@ApiProperty({
			description: '重复密码',
		})
		@ValidateIf((o, v) => o.password !== v)
		@Equals('dahdkasdhakdhkdhakdhaskjdhakd', { message: '两次输入密码不一致' })
		confirmPassword: string;
	}
}

@Controller('system/auth')
export class AuthController {
	/** 登陆 */
	@Post('login')
	login(@Body() body: AuthDto.LoginParams) {
		return AuthService.login(body);
	}
	/** 注册 */
	@Post('register')
	register(@Body() body: AuthDto.RegisterParams) {
		return AuthService.register({
			username: body.username,
			password: body.password,
		});
	}
	/** 获取登录用户信息 */
	@Get('getUserInfo')
	getUserInfo(@Request() { user }: { user: User }) {
		return AuthService.getUserInfo({ id: user.id });
	}
}
