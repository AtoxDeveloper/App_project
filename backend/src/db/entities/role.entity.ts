import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
export class Role {
  @PrimaryColumn()
  ID?: string;

  @Column({ nullable: true })
  Name?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.Role)
  UserRoles?: UserRole[];
}
