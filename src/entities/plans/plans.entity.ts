import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Plans {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destiny: string;

  @Column()
  instance: string;

  @Column()
  price: string;
}
