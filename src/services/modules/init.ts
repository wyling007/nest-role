import { AppDataSource, DatabaseRepository } from '@/database';
import { Role, User } from '@/database/entities';

/** 初始化服务 */
export namespace InitService {
	/** 初始化数据库 */
	export async function initDatabase() {
		//初始化数据库连接
		await AppDataSource.initialize();
		//初始化超级管理员角色
		let role = await DatabaseRepository.RolesRepository.findOne({
			where: { roleName: '超级管理员' },
		});
		if (!role) {
			role = await DatabaseRepository.RolesRepository.save({
				...new Role(),
				roleName: '超级管理员',
			});
		}
		//初始化老板角色
		let role2 = await DatabaseRepository.RolesRepository.findOne({
			where: { roleName: '老板' },
		});
		if (!role2) {
			role2 = await DatabaseRepository.RolesRepository.save({
				...new Role(),
				roleName: '老板',
			});
		}
		//初始化超级管理员用户
		const user = await DatabaseRepository.UsersRepository.findOne({
			where: { username: 'superAdmin' },
		});
		const roles = await DatabaseRepository.RolesRepository.find();
		if (!user) {
			await DatabaseRepository.UsersRepository.save({
				...new User(),
				username: 'superAdmin',
				password: 'e10adc3949ba59abbe56e057f20f883e',
				roles: roles,
			});
		}
		//初始化超级管理员2用户
		const user2 = await DatabaseRepository.UsersRepository.findOne({
			where: { username: 'superAdmin2' },
		});
		if (!user2) {
			await DatabaseRepository.UsersRepository.save({
				...new User(),
				username: 'superAdmin2',
				password: 'e10adc3949ba59abbe56e057f20f883e',
				roles: roles,
			});
		}
	}
}
