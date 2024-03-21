import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { FilmModule } from './modules/film/film.module';
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [PrismaModule, UserModule, FilmModule, FavoriteModule],
})
export class AppModule {}
