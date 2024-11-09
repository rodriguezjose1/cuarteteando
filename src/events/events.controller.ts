// src/events/events.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Event } from 'src/entities/event.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<{ events: Event[] }> {
    const events = await this.eventsService.findAll();

    return {
      events,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ event: Event }> {
    const event = await this.eventsService.findOne(+id);
    return {
      event,
    };
  }

  @Post()
  async create(@Body() event: Partial<Event>): Promise<{ event: Event }> {
    const newEvent = await this.eventsService.create(event);
    return {
      event: newEvent,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() event: Partial<Event>,
  ): Promise<{ event: Event }> {
    const eventUpdated = await this.eventsService.update(+id, event);
    return {
      event: eventUpdated,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(+id);
  }
}
