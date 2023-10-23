import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @Column()
  username: string

  @Column()
  hashed_password: string

  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
