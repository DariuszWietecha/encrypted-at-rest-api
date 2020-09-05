import {Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryColumn()
  id: string;

  @Column()
  value: string;
}