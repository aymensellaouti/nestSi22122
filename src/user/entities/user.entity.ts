import { TimestampEntity } from '../../generics/timestamp.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';
export enum UserRoleEnum {
  admin = 'role:admin',
  user = 'role:user',
}
@Entity()
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Cv, (cv) => cv.user, {})
  cvs: Cv[];
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.user,
  })
  role: UserRoleEnum;
}
