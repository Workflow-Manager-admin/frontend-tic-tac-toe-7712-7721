import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title and player status', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Next turn:/i) ||
    screen.getByText(/Winner:/i) ||
    screen.getByText(/Draw!/i)
  ).toBeInTheDocument();
});

test('allows players to play turn-based and restart', () => {
  render(<App />);
  const squares = screen.getAllByRole('button', { name: /Empty cell/i });
  expect(squares.length).toBe(9);
  // Player X moves
  fireEvent.click(squares[0]);
  expect(squares[0].textContent).toBe('X');
  // Player O moves
  fireEvent.click(squares[1]);
  expect(squares[1].textContent).toBe('O');
  // Test restart
  const restartButton = screen.getByRole('button', { name: /Restart Game/i });
  fireEvent.click(restartButton);
  squares.forEach((sq) => expect(sq.textContent).toBe(''));
});
