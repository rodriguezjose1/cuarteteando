import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsController } from './events.controller';
import { EventEntity } from './events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
