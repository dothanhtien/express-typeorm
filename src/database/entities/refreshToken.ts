import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("datetime")
  expiry_date: Date;

  @ManyToOne(() => User, (user) => user.refresh_tokens)
  @JoinColumn({ name: "user_id" })
  user: User;
}
