import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity()
export class Cv extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne(() => User, (user) => user.cvs, { eager: true })
  user: User;
  @ManyToMany(() => Skill, (skill) => skill.cvs, { eager: true })
  @JoinTable({
    name: 'cv_skills',
    joinColumn: {
      name: 'cv',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[];
}
