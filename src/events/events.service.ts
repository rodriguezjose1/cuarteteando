// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  findAll(): Promise<EventEntity[]> {
    return this.eventsRepository.find();
  }

  findOne(id: number): Promise<EventEntity> {
    return this.eventsRepository.findOneBy({ id });
  }

  create(event: Partial<EventEntity>): Promise<EventEntity> {
    const newEvent = this.eventsRepository.create(event);
    return this.eventsRepository.save(newEvent);
  }

  async update(id: number, event: Partial<EventEntity>): Promise<EventEntity> {
    await this.eventsRepository.update(id, event);
    return this.eventsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
