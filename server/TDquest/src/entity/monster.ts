import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { raid } from "./raid"

@Entity()
export class monster {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  image: string

  @Column()
  kind: string
  
  @Column()
  name: string

  @Column()
  hp: number

  @Column()
  reward: number

  @OneToMany(() => raid, (raid) => raid.monster)
  raids: raid[]

}
