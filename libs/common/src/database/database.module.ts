import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRESQL_HOST'),
        port: configService.getOrThrow('POSTGRESQL_PORT'),
        database: configService.getOrThrow('POSTGRESQL_DATABASE'),
        username: configService.getOrThrow('POSTGRESQL_USERNAME'),
        password: configService.getOrThrow('POSTGRESQL_PASSWORD'),
        synchronize: configService.getOrThrow('POSTGRESQL_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
