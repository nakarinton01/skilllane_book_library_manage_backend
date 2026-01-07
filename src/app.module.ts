import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { dataSourceOptions } from 'src/database/data-sources/data-source-options';
import { UsersModule } from './users/users.module';
import { ManagedEntity } from './managed-entities/managed-entities/managed-entity';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('dataSource Options are required');
        }

        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ManagedEntity,
    UsersModule,
    AuthModule,
    BooksModule,
  ],
})
export class AppModule {}
