import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

/*
PinoLoggerModule.forRootAsync({
  useFactory: (configService: ConfigService) => {
    const transport = {
      target: undefined,
      options: {
        singleLine: true,
      },
    };
    if (configService.get('NODE_ENV') === 'development') {
      transport.target = 'pino-pretty';
    }
    return {
      pinoHttp: {
        transport,
      },
    };
  },
  inject: [ConfigService],
})
*/

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
