import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { user } from "./user"

@Entity()
export class todo_list {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  content: string

  @Column()
  kind: string

  @Column()
  is_complete: boolean

  @ManyToOne(() => user, (user) => user.todo_lists)
  user: user
}
