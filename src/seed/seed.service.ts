import { Injectable } from '@nestjs/common';


import { PokeResponse } from './interfaces/poke-respo.interface';
import { Model } from 'mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { AxiosAdapter } from './../common/adapters/axios.adapter';




@Injectable()
export class SeedService {

  constructor(
    //para mostrar que esto es una dependencia de axios
  @InjectModel(Pokemon.name)
  private readonly pokemonModel: Model<Pokemon>,
  private readonly http: AxiosAdapter
  ){}
  



  async executeSeed() {
    await this.pokemonModel.deleteMany({})

   
    
    const pokemonInser: { name: string, no: number }[] = []

    const  data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0')

    console.log('siiii');

    data.results.forEach(pok => {
      const { name, url } = pok
      const no = +url.split('/')[6]
      pokemonInser.push({ name, no })
    })
    await this.pokemonModel.insertMany(pokemonInser)
    return `SEED excecuted correctly`;

  }


}



