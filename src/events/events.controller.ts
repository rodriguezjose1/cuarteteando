import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventEntity } from './events.entity';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll(): Promise<{ events: EventEntity[] }> {
    const events = await this.eventsService.findAll();

    return {
      events,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ event: EventEntity }> {
    const event = await this.eventsService.findOne(+id);
    return {
      event,
    };
  }

  @Post()
  async create(@Body() event: Partial<EventEntity>): Promise<{ event: EventEntity }> {
    const newEvent = await this.eventsService.create(event);
    return {
      event: newEvent,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() event: Partial<EventEntity>,
  ): Promise<{ event: EventEntity }> {
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
