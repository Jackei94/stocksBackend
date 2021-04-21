import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stocks {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public value: number;
}
