import { Column, Entity, OneToOne } from 'typeorm';

import { ManagedEntity } from 'src/managed-entities/managed-entities/managed-entity';
import { User } from 'src/users/users/user.entity';

@Entity('book')
export class Book extends ManagedEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column({ type: 'int', width: 4 })
  publication_year: number;

  @Column({ type: 'text', default: null, nullable: true })
  image: string;

  @OneToOne(() => User, (user) => user.book, { nullable: true })
  users: User;
}
