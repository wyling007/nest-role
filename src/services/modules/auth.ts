import { User } from '@/database/entities';
import { UserService } from './user';
import Jsonwebtoken from 'jsonwebtoken';

/** 权限服务 */
export namespace AuthService {
	/** 登录 */
	export async function login(params: Pick<User, 'username' | 'password'>) {
		// 验证码校验
		// 校验成功后, 返回用户信息及token
		const user = await UserService.getUserInfoByPassword(params);
		return {
			token: generateJWT(user),
			userInfo: user,
		};
	}
	/** 注册 */
	export async function register(params: Pick<User, 'username' | 'password'>) {
		// 验证码校验
		// 校验成功后，创建用户
		const user = await UserService.addUser(params);
		return {
			token: generateJWT(user),
			userInfo: user,
		};
	}
	/** 登出 */
	export async function logout() {
		return true;
	}
	/** 获取用户信息 */
	export async function getUserInfo(params: Pick<User, 'id'>) {
		return await UserService.getUserInfoByID({ id: params.id }, true);
	}
	/** Jwt秘钥 */
	const JWT_SECRET = 'wyling-nest-demo';
	/** 生成Jwt */
	export function generateJWT(user: User) {
		const token = Jsonwebtoken.sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
				phone: user.phone,
			},
			JWT_SECRET,
			{
				expiresIn: '1d',
			}
		);
		return token;
	}
	/** 解析Jwt */
	export function decodeJWT(token: string) {
		return Jsonwebtoken.verify(token, JWT_SECRET);
	}
}
