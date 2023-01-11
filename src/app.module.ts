import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    PokemonModule,

    // // Servir static content
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),

    MongooseModule.forRoot('mongodb://localhost:2717/nest-pokemon'),

    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
