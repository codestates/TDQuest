import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { characters } from "./character"
import { damage_log } from "./damage_log"
import { raid } from "./raid"
import { todo_list } from "./todo_list"

@Entity()
export class user {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nickname: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => damage_log, (damage_log) => damage_log.user)
    damage_logs: damage_log[]

    @OneToMany(() => todo_list, (todo_list) => todo_list.user)
    todo_lists: todo_list[]

}
