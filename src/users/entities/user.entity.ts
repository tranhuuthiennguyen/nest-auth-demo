import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  email: string

  @Column()
  hashed_password: string

  @Column()
  display_name: string
}
