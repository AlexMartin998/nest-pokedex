import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeapiResponse, PokemonToInster } from './interfaces';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeapiResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=450',
    );

    const pokemonsToInsert: PokemonToInster[] = data.results.map(
      ({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments.at(-2);

        return { name, no };
      },
    );

    return await this.pokemonService.populateDB(pokemonsToInsert);
  }
}
