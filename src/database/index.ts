import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, Role, AppPermission } from './entities';
import path from 'path';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: path.resolve(__dirname, './wyling.db'),
	entities: [User, Role, AppPermission],
	synchronize: true,
});

export namespace DatabaseRepository {
	/** 用户表 */
	export const UsersRepository = AppDataSource.getRepository(User);
	/** 角色表 */
	export const RolesRepository = AppDataSource.getRepository(Role);
	/** 权限表 */
	export const AppPermissionRepository = AppDataSource.getRepository(AppPermission);
}
