import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'todo_id',
  })
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'bool',
    default: true,
  })
  isActive: boolean;
}
