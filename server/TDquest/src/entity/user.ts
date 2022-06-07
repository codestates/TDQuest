import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { characters } from "./character"
import { damage_log } from "./damage_log"
<<<<<<< HEAD
import { raid } from "./raid"
=======
>>>>>>> 0258e8f (pull typescript)
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

<<<<<<< HEAD
=======
    @Column()
    logintype: string

    @OneToOne(() => characters, (characters) => characters.user)

>>>>>>> 0258e8f (pull typescript)
    @OneToMany(() => damage_log, (damage_log) => damage_log.user)
    damage_logs: damage_log[]

    @OneToMany(() => todo_list, (todo_list) => todo_list.user)
    todo_lists: todo_list[]

}
