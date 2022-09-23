import { getAllPokemons, getPokemonbyName } from '../src/services/PokemonService';

describe('Services', () => {
	test('getPokemonbyName Should return a pokemon list', () => {
		return getAllPokemons().then(data => {
			expect(data).not.toBe(null);
			expect(data).toBeInstanceOf(Array);
		})
	});

	test('getPokemonByName should return the specified pokemon', () => {
		return getPokemonbyName('bulbasaur').then(pokemon => {
			expect(pokemon.name).toEqual('bulbasaur');
		})
	})
});