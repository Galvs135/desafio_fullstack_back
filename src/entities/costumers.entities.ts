import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import Users from "./users.entities";

@Entity("costumers")
class Costumers {
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

  @ManyToOne(() => Users, (users) => users.costumers)
  userCostumers: Users;
}

export default Costumers;
