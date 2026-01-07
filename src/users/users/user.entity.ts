import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { ManagedEntity } from 'src/managed-entities/managed-entities/managed-entity';
import { Role } from 'src/users/roles/role.entity';
import { Book } from 'src/books/books/book.entity';

@Entity('user')
export class User extends ManagedEntity {

  @Column({ length: 255, unique: true })
  username: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;
  
  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  role: Role;

  @OneToOne(() => Book, (book) => book.users, { nullable: true })
  book: Book
}
