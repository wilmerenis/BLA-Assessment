import * as React from "react";
import { render, screen } from "@testing-library/react";
import { PokemonGuessingImage } from "../src/components/PokemonGuesser/components/PokemonGuessingImage";
import { ResultState } from "../src/components/PokemonGuesser/types";

const pokemonGuessingImageProps = {
	pokemon: { id: 1234 },
	state: ResultState.GUESSING
}

describe("<PokemonGuessingImage>", () => {
	test("Should build the url using the given id and the right background black if status is GUESSING", () => {
		render(<PokemonGuessingImage {...pokemonGuessingImageProps} />);
		const pokeImg = screen.getByRole('img') as HTMLImageElement;

		expect(pokeImg).toBeInTheDocument();
		expect(pokeImg).toHaveStyle({ 'background': 'black' });
		expect(pokeImg.src).toEqual(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonGuessingImageProps.pokemon.id}.png`)
	});
});