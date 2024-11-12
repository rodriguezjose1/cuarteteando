import { LoggerService } from '@common/logger/logger.service';
import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    LoggerService,
    {
      provide: DataSource,
      inject: [LoggerService],
      useFactory: async (logger: LoggerService) => {
        logger.setContext('TypeOrmModule');
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false,
            },
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          });
          await dataSource.initialize();
          logger.info('Database connected successfully');
          return dataSource;
        } catch (error) {
          logger.error('Error connecting to database', error.stack);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
