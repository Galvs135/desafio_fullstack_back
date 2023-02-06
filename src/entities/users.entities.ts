import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import Costumers from "./costumers.entities";

@Entity("users")
class Users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ default: true })
  @Exclude()
  isActive: boolean;

  @CreateDateColumn()
  register_date: Date;

  @OneToMany(() => Costumers, (costumers) => costumers.userCostumers, {
    eager: true,
  })
  costumers: Costumers[];
}

export default Users;
