import { TodoStatusEnum } from '../todo.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
@Entity({ name: 'todo' })
export class TodoEntity extends TimestampEntity {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 100,
  })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum = TodoStatusEnum.waiting;
}
