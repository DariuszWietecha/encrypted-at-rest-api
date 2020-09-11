import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Log {
  constructor(type: string, error: string,) {
    this.type = type;
    this.error = error;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('text')
  error: string;

  @CreateDateColumn()
  createdAt: Date;
}