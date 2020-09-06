import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('longtext')
  error: string;

  @CreateDateColumn()
  createdAt: Date;
}