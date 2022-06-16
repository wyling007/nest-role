import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services';
import { HttpException } from '@nestjs/common';

/** jwt鉴权中间件 */
export const JwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	//白名单
	if (['/system/auth/register', '/system/auth/login'].includes(req.path)) {
		next();
		return;
	}
	//获取token
	const { authorization } = req.headers;
	//验证token
	if (!authorization) {
		//没有token
		next(new HttpException('请登录', 401));
	} else {
		//解析token
		try {
			//解析token
			const user = AuthService.decodeJWT(authorization);
			//设置用户信息
			Reflect.set(req, 'user', user);
			next();
		} catch (error) {
			//验证失败
			next(new HttpException({ code: 500, msg: '无效token' }, 401));
		}
	}
};
