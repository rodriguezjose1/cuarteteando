import { Injectable } from '@nestjs/common';
import { createLogger, Logger, format, transports } from 'winston';

@Injectable()
export class LoggerService {
  private logger: Logger;
  private contextValue: string;

  constructor() {
    const { combine, timestamp, printf, colorize } = format;

    const myFormat = printf(({ level, message, timestamp, context }) => {
      return `${timestamp} [${context}] ${level}: ${message}`;
    });

    this.logger = createLogger({
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat),
      transports: [
        new transports.Console(),
        ...(process.env.NODE_ENV === 'production'
          ? [
              new transports.File({ filename: 'error.log', level: 'error' }),
              new transports.File({ filename: 'combined.log' }),
            ]
          : []),
      ],
    });
  }

  setContext(context: string) {
    this.contextValue = context;
  }

  debug(message: string) {
    this.logger.debug(message, { context: this.contextValue });
  }

  info(message: string) {
    this.logger.info(message, { context: this.contextValue });
  }

  warn(message: string) {
    this.logger.warn(message, { context: this.contextValue });
  }

  error(message: string, trace?: string) {
    this.logger.error(message, { context: this.contextValue, trace });
  }
}
