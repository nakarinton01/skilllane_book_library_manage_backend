import { Column, Entity, OneToMany } from 'typeorm';

import { ManagedEntity } from 'src/managed-entities/managed-entities/managed-entity';
import { User } from 'src/users/users/user.entity';

export enum RoleName {
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
}

@Entity('role')
export class Role extends ManagedEntity {
  @Column()
  name: string;

  @Column({ type: 'text', default: null, nullable: true })
  description: string;
  
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
