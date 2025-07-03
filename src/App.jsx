import { captureOwnerStack, useState } from "react"


export const Square = ({ value, onSquareCLick }) => {

  return (
    <button onClick={onSquareCLick} className="uppercase font-semibold text-4xl border w-18 h-18" >{value}</button>
  )
}

export function App() {

  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isNextX, setIsNextX] = useState(true)
  const [history, setHistory] = useState([])

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    nextSquares[index] = isNextX ? 'X' : 'O'
    setSquares(nextSquares);
    setIsNextX(!isNextX);
  }

  const winner = calculateWinner(squares)
  let status;
  status = winner ? `winner: ${winner}` : `nextMove: ${isNextX ? 'X' : 'O'}`
  console.log(status)

  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <span className="border mb-4 px-4 py-2 text-xl" >{status}</span>
        <div className="row flex items-center">
          <Square
            value={squares[0]}
            onSquareCLick={() => { handleClick(0) }}
          />
          <Square
            value={squares[1]}
            onSquareCLick={() => { handleClick(1) }}
          />
          <Square
            value={squares[2]}
            onSquareCLick={() => { handleClick(2) }}
          />
        </div>
        <div className="row flex items-center">
          <Square
            value={squares[3]}
            onSquareCLick={() => { handleClick(3) }}
          />
          <Square
            value={squares[4]}
            onSquareCLick={() => { handleClick(4) }}
          />
          <Square
            value={squares[5]}
            onSquareCLick={() => { handleClick(5) }}
          />
        </div>
        <div className="row flex items-center">
          <Square
            value={squares[6]}
            onSquareCLick={() => { handleClick(6) }}
          />
          <Square
            value={squares[7]}
            onSquareCLick={() => { handleClick(7) }}
          />
          <Square
            value={squares[8]}
            onSquareCLick={() => { handleClick(8) }}
          />
        </div>
      </div>
    </>
  )
}

export default function Game() {

  return (
    <>
      <div className="game-board">
        <App />
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

