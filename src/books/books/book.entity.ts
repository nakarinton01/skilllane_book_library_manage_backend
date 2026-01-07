import { Column, Entity, ManyToOne } from 'typeorm';

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

  @Column({ type: 'longtext' })
  image: string;

  @ManyToOne(() => User, (user) => user.book, { eager: true, nullable: true })
  users: User | null;
}
