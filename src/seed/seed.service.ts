import { Injectable } from '@nestjs/common';
import { PokemonService } from '../pokemon/pokemon.service';
import { PokeapiResponse, PokemonToInster } from './interfaces';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly axiosAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this.axiosAdapter.get<PokeapiResponse>(
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
