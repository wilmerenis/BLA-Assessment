import { setIsLoadingReducer } from "../src/context/reducers/setIsLoadingReducer";
import { updateAllPokemonsReducer } from "../src/context/reducers/updateAllPokemonsReducer";
import { updatePokemonDetailReducer } from "../src/context/reducers/updatePokemonDetailReducer";
import fullReducer from '../src/context/reducer';
import { Actions } from "../src/context/types";

const mockListPokemons = [{
	id: 123,
	height: 20,
	name: "poliware",
	base_experience: 0,
	is_default: false,
}];

const mockIsLoadingReducerProps = {
	action: {
		type: Actions.SET_IS_LOADING,
		payload: true
	},
	states: {
		pokemons: [],
		isLoading: false,
	},
	expectedReturn: {
		pokemons: [],
		isLoading: true,
	}
};

const mockUpdatePokemonDetailReducerProps = {
	action: {
		type: Actions.UPDATE_POKEMON_DETAIL,
		payload: mockListPokemons[0]
	},
	states: {
		pokemons: [{
			id: 123,
			name: "poliware",
			height: 10,
		}],
		isLoading: false,
	},
	expectedReturn: {
		pokemons: mockListPokemons,
		isLoading: false,
	}
};

const mockUpdateAllPokemonReducerProps = {
	action: {
		type: Actions.UPDATE_ALL_POKEMONS,
		payload: mockListPokemons
	},
	states: {
		pokemons: [],
		isLoading: false,
	},
	expectedReturn: {
		pokemons: mockListPokemons,
		isLoading: false,
	}
};

const mockUndefinedActionReducerProps = {
	action: {
		type: undefined,
	},
	states: {
		pokemons: [],
		isLoading: false,
	},
	expectedReturn: {
		pokemons: [],
		isLoading: false,
	}
}
describe("Reducers", () => {
	test("setIsLoadingReducer should return the same payload pass through it instead of the prev state", () => {
		const setIsLoadingReducerReturn = setIsLoadingReducer(
			mockIsLoadingReducerProps.states,
			true
		);

		expect(setIsLoadingReducerReturn).toEqual(mockIsLoadingReducerProps.expectedReturn);
	});

	test("updatePokemonDetailReducer Should return the updated pokemon if met the conditions otherwise return the prev state", () => {
		const updatePokemonDetailReducerReturn = updatePokemonDetailReducer(
			mockUpdatePokemonDetailReducerProps.states,
			mockListPokemons[0] as any
		);
		const updatePokemonDetailReducerNoMetConditionReturn = updatePokemonDetailReducer(
			mockUpdatePokemonDetailReducerProps.states,
			{ ...mockListPokemons[0], name: "example" } as any
		);
	
		expect(updatePokemonDetailReducerReturn).toEqual(mockUpdatePokemonDetailReducerProps.expectedReturn);
		expect(updatePokemonDetailReducerNoMetConditionReturn).toEqual(mockUpdatePokemonDetailReducerProps.states)
	});

	test("updateAllPokemonsReducer should return the same payload pass through it instead of the prev state", () => {
		const updateAllPokemonsReducerReturn = updateAllPokemonsReducer(
			mockUpdateAllPokemonReducerProps.states,
			mockListPokemons
		);

		expect(updateAllPokemonsReducerReturn).toEqual(mockUpdateAllPokemonReducerProps.expectedReturn);
	});

	test.each`
		action                                        | states                                        | expectedReturn
		${mockIsLoadingReducerProps.action}           | ${mockIsLoadingReducerProps.states}           | ${mockIsLoadingReducerProps.expectedReturn}
		${mockUpdatePokemonDetailReducerProps.action} | ${mockUpdatePokemonDetailReducerProps.states} | ${mockUpdatePokemonDetailReducerProps.expectedReturn}
		${mockUpdateAllPokemonReducerProps.action}    | ${mockUpdateAllPokemonReducerProps.states}    | ${mockUpdateAllPokemonReducerProps.expectedReturn}
		${mockUndefinedActionReducerProps.action}     | ${mockUndefinedActionReducerProps.states}     | ${mockUndefinedActionReducerProps.expectedReturn}
	`("fullReducer should return an updated state depending on action=$action", ({
		action, states, expectedReturn
	}) => {
		expect(fullReducer(states, action)).toEqual(expectedReturn);
	});
});
