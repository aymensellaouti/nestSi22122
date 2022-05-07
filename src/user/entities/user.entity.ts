import { TimestampEntity } from '../../generics/timestamp.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

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
}
