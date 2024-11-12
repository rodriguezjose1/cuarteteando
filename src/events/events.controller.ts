import {
  SwaggerCreateResponse,
  SwaggerDeleteResponse,
  SwaggerGetAllResponse,
  SwaggerGetOneResponse,
  SwaggerUpdateResponse,
} from '@common/decorators';
import { LoggerService } from '@common/logger/logger.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EventEntity } from './events.entity';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService, private readonly logger: LoggerService) {
    this.logger.setContext(EventsController.name);
  }

  /**
   * Get all events
   *
   * @return {*}  {Promise<{ events: EventEntity[] }>}
   * @memberof EventsController
   */
  @Get()
  @SwaggerGetAllResponse('Get all events', EventEntity)
  async findAll(): Promise<{ events: EventEntity[] }> {
    this.logger.info('Getting all events');
    const events = await this.eventsService.findAll();

    return {
      events,
    };
  }

  /**
   * Get an event by ID
   *
   * @param {string} id
   * @return {*}  {Promise<{ event: EventEntity }>}
   * @memberof EventsController
   */
  @Get(':id')
  @SwaggerGetOneResponse('Get an event by ID', EventEntity)
  async findOne(@Param('id') id: string): Promise<{ event: EventEntity }> {
    const event = await this.eventsService.findOne(+id);
    return {
      event,
    };
  }

  /**
   * Create a new event
   *
   * @param {Partial<EventEntity>} event
   * @return {*}  {Promise<{ event: EventEntity }>}
   * @memberof EventsController
   */
  @Post()
  @SwaggerCreateResponse('Create a new event', EventEntity)
  async create(@Body() event: Partial<EventEntity>): Promise<{ event: EventEntity }> {
    const newEvent = await this.eventsService.create(event);
    return {
      event: newEvent,
    };
  }

  /**
   * Update an event
   *
   * @param {string} id
   * @param {Partial<EventEntity>} event
   * @return {*}  {Promise<{ event: EventEntity }>}
   * @memberof EventsController
   */
  @Put(':id')
  @SwaggerUpdateResponse('Update an event', EventEntity)
  async update(@Param('id') id: string, @Body() event: Partial<EventEntity>): Promise<{ event: EventEntity }> {
    const eventUpdated = await this.eventsService.update(+id, event);
    return {
      event: eventUpdated,
    };
  }

  /**
   * Delete an event
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof EventsController
   */
  @Delete(':id')
  @SwaggerDeleteResponse('Delete an event', EventEntity)
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(+id);
  }
}
