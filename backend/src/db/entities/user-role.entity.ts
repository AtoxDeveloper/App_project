import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class UserRole {
  @PrimaryColumn()
  UserID?: string;

  @PrimaryColumn()
  RoleID?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  User?: User;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'RoleID' })
  Role?: Role;
}
