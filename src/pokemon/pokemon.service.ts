import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PokeResponse } from 'src/seed/interfaces/poke-respo.interface';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit=10, offset=0 } = paginationDto
    return await this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no:'asc'
      })
      .select('-__v' )// para que no muestre el campo __v



  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    let condition: object = { name: term } //asiganamos que por defecto el termino de busqueda sea el
    if (!isNaN(+term)) {
      condition = { no: term }//conprobamos si el termino es un numero
    } else if (isValidObjectId(term)) {//mongoid
      condition = {
        _id: term
      }
    }
    pokemon = await this.pokemonModel.findOne(condition)

    if (!pokemon) throw new NotFoundException(`that pokemon with term ${term} do not exits in DB`)

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true })
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string) {
    //const pokemonDelete= await this.findOne(id)
    //await pokemonDelete.deleteOne()
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException(`not fount a pokemon with this id: ${id}`)
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exits in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create pokemon - check server logs`)
  }


}
