import { useState } from "react"


const Square = ({ value, onSquareClick }) => {
  return (
    <button
      onClick={onSquareClick}
      className="uppercase font-semibold text-4xl border w-18 h-18" >
      {value}
    </button>
  )
}

function Board({ isNextX, squares, onPlay }) {
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[index] = isNextX ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status;
  status = winner ? `winner: ${winner}` : `nextMove: ${isNextX ? 'X' : 'O'}`

  return (
    <>
      <div className="w-max flex flex-col justify-center items-center">
        <span className="border mb-4 px-4 py-2 text-xl" >{status}</span>
        <div className="row flex items-center">
          <Square
            value={squares[0]}
            onSquareClick={() => { handleClick(0) }}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => { handleClick(1) }}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => { handleClick(2) }}
          />
        </div>
        <div className="row flex items-center">
          <Square
            value={squares[3]}
            onSquareClick={() => { handleClick(3) }}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => { handleClick(4) }}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => { handleClick(5) }}
          />
        </div>
        <div className="row flex items-center">
          <Square
            value={squares[6]}
            onSquareClick={() => { handleClick(6) }}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => { handleClick(7) }}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => { handleClick(8) }}
          />
        </div>
      </div>
    </>
  )
}

export default function Game() {

  
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button className="border mb-1 px-4 py-2 text-xl" onClick={() => jumpTo(move)} >{description}</button>
      </li>
    )
  })

  return (
    <>
      <div className="game w-screen h-screen flex justify-center items-center gap-4">
        <div className="game-board">
          <Board isNextX={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>

      </div>
    </>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (const line of lines) {
    const [a, b, c] = line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

