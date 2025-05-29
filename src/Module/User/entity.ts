import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { System } from 'src/Entity/index';

/**
 * 用户
 */
@Entity()
export class User extends System {
	/**
	 * 用户ID
	 */
	@PrimaryGeneratedColumn({
		type: 'bigint',
	})
	id: number;

	/**
	 * 用户名
	 */
	@Column()
	userName: string;

	/**
	 * 密码
	 */
	@Column()
	password: string;

	/**
	 * 昵称
	 */
	@Column({
		nullable: true,
	})
	nickName: string;

	/**
	 * 用户头像
	 */
	@Column({
		nullable: true,
	})
	picture: string;

	/**
	 * 最后登录时间
	 */
	@Column({
		nullable: true,
	})
	lastLoginDate: Date;
}
