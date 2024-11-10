import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the event' })
  id: number;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Event name', description: 'The name of the event' })
  name: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Event description', description: 'The description of the event' })
  description: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Event artist', description: 'The artist of the event' })
  artist: string;

  @Column({ type: 'date' })
  @ApiProperty({ example: '2021-12-31', description: 'The date of the event' })
  date: Date;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Event place', description: 'The place of the event' })
  place: string;

  @Column({ type: 'text' })
  @ApiProperty({ example: 'Event image', description: 'The image of the event' })
  image: string;

  @Column({ type: 'json' })
  @ApiProperty({ example: { extra: 'information' }, description: 'Extra information of the event' })
  extraInformation: object;
}
