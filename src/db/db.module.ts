import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [ ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: +configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: 'admin',
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/entities/**'],
            migrations: [__dirname + '/migrations/*.ts'],
            synchronize: false
        })
    })]
})
export class DbModule {}
