import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      return this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // id
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // MongoID
    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    // name
    if (!pokemon)
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon with id, name or no '${term}' not found`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      return this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    // return { msg: `Pokemon '${id}' was successfully deleted` };

    // Con 1 sola consulta
    const result = await this.pokemonModel.findByIdAndDelete(id);
    if (!result)
      throw new NotFoundException(`Pokemon with id: '${id}' not found`);

    return { msg: `Pokemon with ID: '${id}' was successfully deleted` };
  }

  private handleExceptions(error) {
    // Lo hacemos asi para EVITAR consultar la DB para verificar si existe tanto el name y el no
    if (+error.code === 11000)
      throw new BadRequestException(
        `Pokemon already exist in db: ${JSON.stringify(error.keyValue)}`,
      );
    console.log(error);
    throw new InternalServerErrorException("Can't update Pokemon!");
  }
}