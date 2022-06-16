import { Role } from './role';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../common/baseEntity';

@Entity()
export class User extends BaseEntity {
	@Column({
		length: 100,
		comment: '用户名',
	})
	username: string;

	@Column({
		length: 32,
		comment: '密码',
		select: false,
	})
	password: string;

	@Column({
		length: 32,
		default: null,
		comment: '邮箱',
	})
	email: string;

	@Column({
		length: 32,
		default: null,
		comment: '手机',
	})
	phone: string;

	@ManyToMany(() => Role)
	@JoinTable()
	roles: Role[];
}
