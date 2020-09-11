import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity()
export class Data {
  constructor(id: string, value: string,) {
    this.id = id;
    this.value = value;
  }

  @PrimaryColumn()
  id: string;

  @Column('text')
  value: string;
}