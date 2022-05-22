import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { damage_log } from "./damage_log"
import { monster } from "./monster"
import { user } from "./user"

@Entity()
export class raid {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  hit_damage: number

  @OneToMany(() => damage_log, (damage_log) => damage_log.user)
  damage_logs: damage_log[]

  @ManyToOne(() => monster, (monster) => monster.raids)
  monster: monster
}
