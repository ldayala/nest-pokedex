import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[MongooseModule.forFeature([
    {
      name:Pokemon.name, //este name es una propiedad heredada porque extiende de Document
      schema:PokemonSchema}
  ])],
  exports:[
    MongooseModule.forFeature([
      {
        name:Pokemon.name, //este name es una propiedad heredada porque extiende de Document
        schema:PokemonSchema}
    ]),
    PokemonService
  ]
})
export class PokemonModule {}
