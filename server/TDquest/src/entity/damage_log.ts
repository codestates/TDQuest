import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { user } from './user'
import { raid } from "./raid"

@Entity()
export class damage_log {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  log: number

  @ManyToOne(() => user, (user) => user.damage_logs)
  user: user

  @ManyToOne(() => raid, (raid) => raid.damage_logs)
  raid: raid
}
