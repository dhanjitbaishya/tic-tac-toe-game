import { useState, useEffect } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [scorePlayerOne, setScorePlayerOne] = useState(0);
  const [scorePlayerTwo, setScorePlayerTwo] = useState(0);

  useEffect(() => {
    if (!playerOne && !playerTwo) {
      const p1 = prompt("Enter Player One's name:");
      const p2 = prompt("Enter Player Two's name:");
      setPlayerOne(p1 || "Player One");
      setPlayerTwo(p2 || "Player Two");
    }
  }, [playerOne, playerTwo]);
  
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      if (winner === "X") {
        setScorePlayerOne(scorePlayerOne + 1);
      } else {
        setScorePlayerTwo(scorePlayerTwo + 1);
      }
    }
  }, [squares]);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
  
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(false);
  }

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);
  let status;
  if (winner) {
    status = (winner === "X" ? playerOne : playerTwo) + " wins!";
  } 
  else if (isBoardFull) {
    status = "Tied!";
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O") + " (" + (xIsNext ? playerOne : playerTwo) + ")";
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="player-container">
      <div className="player-one">{playerOne}</div>
      <div className="center"></div>
      <div className="player-two">{playerTwo}</div>
      </div>
      <div className="player-score">
      <div className="player-one-score">{scorePlayerOne}</div>
      <div className="player-center"></div>
      <div className="player-two-score">{scorePlayerTwo}</div>
      </div>
      <div className="board">
      <div className="board-container">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      </div>
      </div>
      <div className="button">
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}