import { Injectable } from '@nestjs/common';
import axios, {AxiosInstance} from 'axios'
import { log } from 'console';
import { PokeResponse } from './interfaces/poke-respo.interface';


@Injectable()
export class SeedService {
  private readonly axios:AxiosInstance=axios; //para mostrar que esto es una dependencia de axios
  async executeSeed() {
    const {data}= await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0')
   data.results.forEach(pok=>{
    const {name,url}=pok
    const nume= +url.split('/')[6]
           
   })

   

    return data.results;
  }

  
}
