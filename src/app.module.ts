// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://cuarteteando_dbs_user:MSazDlH3ysAWl21PJ4gY6GeFSTH9bz6O@dpg-csnt46i3esus73ei04v0-a.oregon-postgres.render.com/cuarteteando_dbs',
      ssl: {
        rejectUnauthorized: false, // Acepta el certificado SSL sin validación
      },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventsModule,
  ],
})
export class AppModule {}
