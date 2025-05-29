import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	VersionColumn,
	Column,
} from 'typeorm';

export class System {
	/**
	 * 创建时间
	 */
	@CreateDateColumn()
	createTime: Date;

	/**
	 * 更新时间
	 */
	@UpdateDateColumn()
	updateTime: Date;

	/**
	 * 删除时间
	 */
	@DeleteDateColumn({
		nullable: true,
	})
	deleteAt?: Date;

	/**
	 * 版本
	 */
	@VersionColumn()
	version: number;

	/**
	 * 创建人ID，系统创建为 SYSTEM
	 */
	@Column()
	founderId: string;
}
