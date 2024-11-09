import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  artist: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  place: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'json' })
  extraInformation: object;
}
