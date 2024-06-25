import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Participant {
  @PrimaryColumn()
  ID?: string;

  @Column({ nullable: true })
  Name?: string;

  @Column({ nullable: true })
  LogoURL?: string;

  @Column({ nullable: true })
  Address?: string;

  @Column({ nullable: true })
  WebUrl?: string;

  @Column({ nullable: true })
  Email?: string;

  @OneToMany(() => User, (user) => user.Participant)
  Users?: User[];
}
