import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { CastModule } from './cast/cast.module';
import { CommentsModule } from './comments/comments.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TrailersModule } from './trailers/trailers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      models: [],
      autoLoadModels: true,
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        db: parseInt(process.env.REDIS_DB),
      },
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    CastModule,
    CommentsModule,
    TrailersModule,
  ],
})
export class AppModule {}
