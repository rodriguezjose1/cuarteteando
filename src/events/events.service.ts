// src/events/events.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOneBy({ id });
  }

  create(event: Partial<Event>): Promise<Event> {
    const newEvent = this.eventsRepository.create(event);
    return this.eventsRepository.save(newEvent);
  }

  async update(id: number, event: Partial<Event>): Promise<Event> {
    await this.eventsRepository.update(id, event);
    return this.eventsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
