import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Color palette for easy reference.
 */
const COLORS = {
  accent: "#ff4081",
  primary: "#1976d2",
  secondary: "#424242",
};

const initialBoard = () => Array(9).fill(null);

/**
 * Calculates the winner and the winning combination, if any.
 * @param {Array} squares - Array of board values
 * @returns {object|null} { winner: 'X' | 'O', line: [index, ...] } or null
 */
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // List of all possible winning lines
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

/**
 * Square component for a cell in the grid.
 */
// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-square${highlight ? " highlight" : ""}`}
      onClick={onClick}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

/**
 * Main App component. Contains state and all logic/UI.
 */
// PUBLIC_INTERFACE
function App() {
  const [board, setBoard] = useState(initialBoard());
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Check board state for winner or draw.
  useEffect(() => {
    const result = calculateWinner(board);
    setWinnerInfo(result);
    setIsDraw(!result && board.every((cell) => cell !== null));
  }, [board]);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winnerInfo) return; // Ignore click if not empty or game over
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(initialBoard());
    setIsXNext(true);
    setWinnerInfo(null);
    setIsDraw(false);
  }

  // Board rendering helpers
  const getWinningSquares = () => (winnerInfo ? winnerInfo.line : []);
  const winningSquares = getWinningSquares();

  // Status message
  let status;
  if (winnerInfo) {
    status = (
      <span>
        Winner:{" "}
        <span style={{ color: COLORS.accent, fontWeight: 600 }}>
          {winnerInfo.winner}
        </span>
      </span>
    );
  } else if (isDraw) {
    status = (
      <span>
        <span style={{ color: COLORS.secondary, fontWeight: 500 }}>Draw!</span>
      </span>
    );
  } else {
    status = (
      <span>
        Next turn:{" "}
        <span
          style={{
            color: isXNext ? COLORS.primary : COLORS.accent,
            fontWeight: 600,
          }}
        >
          {isXNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  return (
    <div className="ttt-outer-container">
      <main className="ttt-main">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-board">
          {board.map((cell, idx) => (
            <Square
              key={idx}
              value={cell}
              onClick={() => handleSquareClick(idx)}
              highlight={winningSquares.includes(idx)}
            />
          ))}
        </div>
        <div className="ttt-status">{status}</div>
        <button className="ttt-restart-btn" onClick={handleRestart}>
          Restart Game
        </button>
      </main>
      <footer className="ttt-footer">
        <span>
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: COLORS.primary, textDecoration: "none" }}
          >
            Powered by React
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
