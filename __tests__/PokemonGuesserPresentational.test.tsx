import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultState } from '../src/components/PokemonGuesser/types';
import { PokemonGuesserPresentational } from '../src/components/PokemonGuesser/PokemonGuesserPresentational';
import userEvent from '@testing-library/user-event';

const mockOnCheck = jest.fn();
const mockOnRetry = jest.fn();
const presentationalProps = {
	state: ResultState.GUESSING,
	pokemon: { name: 'poliware', id: 123 },
	onRetry: mockOnRetry,
	onCheck: mockOnCheck,
	isLoading: false,
}
describe('<PokemonGuesserPresentational>', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('Should show the spinner when isLoading true', () => {
		const presentationalPropsWithLoadingTrue = { ...presentationalProps, isLoading: true};
		render(<PokemonGuesserPresentational {...presentationalPropsWithLoadingTrue} />)
		
		expect(screen.getByTestId('infinity-spin-path-2')).toBeInTheDocument();
	});

	test('Should show the initial view in PokemonGuesser', () => {
		render(<PokemonGuesserPresentational {...presentationalProps} />)
		const pokeImg = screen.getByRole('img');
		
		expect(screen.getByPlaceholderText(/Who's that Pokemon?/i)).toBeInTheDocument();
		expect(screen.getByText(/Check/i)).toBeInTheDocument();
		expect(pokeImg).toBeInTheDocument();
		expect(pokeImg).toHaveStyle({ 'background': 'black' })
	});

	test('Should be able to fill in the input and submit when state is GUESSING', () => {
		render(<PokemonGuesserPresentational {...presentationalProps} />)
		const checkBtn = screen.getByText(/Check/i);

		expect(checkBtn).toBeInTheDocument();

		userEvent.click(checkBtn);

		expect(mockOnCheck).toBeCalledTimes(1);
	});

	test('Should show error message and a clickable try again btn when state is ERROR', async () => {
		const presentationalPropsWithError = { ...presentationalProps, state: ResultState.ERROR };

		render(<PokemonGuesserPresentational {...presentationalPropsWithError} />)
		const tryAgainBtn = screen.getByText(/Try again/i);

		expect(screen.getByText(/Oops, That's wrong/i)).toBeInTheDocument();
		expect(tryAgainBtn).toBeInTheDocument();

		userEvent.click(tryAgainBtn);

		expect(mockOnRetry).toBeCalledTimes(1);
	});

	test('Should show the success view when pokemon name has been guessed', () => {
		const presentationalPropsWithSuccess = { ...presentationalProps, state: ResultState.SUCCESS };

		render(<PokemonGuesserPresentational {...presentationalPropsWithSuccess} />)
		const keepPlayingBtn = screen.getByText(/Keep playing/i)

		expect(screen.getByText(/Excellent!!/i)).toBeInTheDocument();
		expect(keepPlayingBtn).toBeInTheDocument();

		userEvent.click(keepPlayingBtn);
		expect(mockOnRetry).toBeCalledTimes(1);
	})
})