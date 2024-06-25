import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Participant } from './participant.entity';
import { UserRole } from './user-role.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  IdUser?: string;

  @Column({ unique: true, nullable: true }) 
  Username?: string;

  @Column({ nullable: true })
  Name?: string;

  @Column({ nullable: true })
  Lastname?: string;

  @Column({ nullable: true })
  ParticipantID?: string;

  @ManyToOne(() => Participant)
  @JoinColumn({ name: 'ParticipantID' })
  Participant?: Participant;

  @OneToMany(() => UserRole, (userRole) => userRole.User)
  UserRoles?: UserRole[];
}
