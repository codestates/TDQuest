import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { user } from './user'

@Entity()
export class characters {

  @PrimaryGeneratedColumn()
  id: number

  @Column({length: 5000})
  image: string

  @Column()
  totalExp: number

  @Column()
  status_phy: number

  @Column()
  status_int: number

  @Column()
  status_spi: number

  @Column()
  medal: string

  @OneToOne(() => user)
<<<<<<< HEAD
=======

>>>>>>> 0258e8f (pull typescript)
  @JoinColumn()
  user: user
}
