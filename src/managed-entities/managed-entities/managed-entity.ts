import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class ManagedEntity {
  // ------------------------------ ManagedEntity ------------------------------

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @DeleteDateColumn()
  deleted: Date;
}