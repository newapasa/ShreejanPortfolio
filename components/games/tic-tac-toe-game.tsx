"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, User, Cpu, XIcon, Circle } from "lucide-react"

type Player = "X" | "O"
type Cell = Player | null
type GameMode = "player" | "ai" | null
type GameStatus = "playing" | "won" | "draw"

export default function TicTacToeGame() {
  // Game state
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [winner, setWinner] = useState<Player | "draw" | null>(null)
  const [gameMode, setGameMode] = useState<GameMode>(null)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null)
  const [aiThinking, setAiThinking] = useState(false)

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  // Check for winner
  const checkWinner = useCallback(
    (boardState: Cell[]): { winner: Player | "draw" | null; combination: number[] | null } => {
      // Check for winning combinations
      for (const combination of winningCombinations) {
        const [a, b, c] = combination
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return { winner: boardState[a] as Player, combination }
        }
      }

      // Check for draw
      if (boardState.every((cell) => cell !== null)) {
        return { winner: "draw", combination: null }
      }

      return { winner: null, combination: null }
    },
    [winningCombinations],
  )

  // Handle cell click
  const handleCellClick = (index: number) => {
    // Ignore click if cell is already filled or game is over
    if (board[index] !== null || gameStatus !== "playing" || aiThinking) return

    // Update board
    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    // Check for winner
    const { winner, combination } = checkWinner(newBoard)
    if (winner) {
      handleGameEnd(winner, combination)
    } else {
      // Switch player
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  // Handle game end
  const handleGameEnd = (result: Player | "draw", combination: number[] | null) => {
    setWinner(result)
    setWinningCombination(combination)
    setGameStatus(result === "draw" ? "draw" : "won")

    // Update scores
    setScores((prevScores) => ({
      ...prevScores,
      [result]: prevScores[result as keyof typeof prevScores] + 1,
    }))
  }

  // AI move
  useEffect(() => {
    if (gameMode === "ai" && currentPlayer === "O" && gameStatus === "playing") {
      setAiThinking(true)

      // Simulate AI thinking
      const aiMoveTimeout = setTimeout(() => {
        makeAiMove()
        setAiThinking(false)
      }, 700)

      return () => clearTimeout(aiMoveTimeout)
    }
  }, [currentPlayer, gameMode, gameStatus])

  // Make AI move
  const makeAiMove = () => {
    // If game is over, do nothing
    if (gameStatus !== "playing") return

    // Create a copy of the board
    const newBoard = [...board]

    // Check if AI can win in the next move
    const winningMove = findWinningMove(newBoard, "O")
    if (winningMove !== -1) {
      newBoard[winningMove] = "O"
      setBoard(newBoard)
      const { winner, combination } = checkWinner(newBoard)
      if (winner) {
        handleGameEnd(winner, combination)
        return
      }
      setCurrentPlayer("X")
      return
    }

    // Check if player can win in the next move and block
    const blockingMove = findWinningMove(newBoard, "X")
    if (blockingMove !== -1) {
      newBoard[blockingMove] = "O"
      setBoard(newBoard)
      setCurrentPlayer("X")
      return
    }

    // Try to take the center
    if (newBoard[4] === null) {
      newBoard[4] = "O"
      setBoard(newBoard)
      setCurrentPlayer("X")
      return
    }

    // Try to take a corner
    const corners = [0, 2, 6, 8]
    const availableCorners = corners.filter((corner) => newBoard[corner] === null)
    if (availableCorners.length > 0) {
      const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)]
      newBoard[randomCorner] = "O"
      setBoard(newBoard)
      setCurrentPlayer("X")
      return
    }

    // Take any available space
    const availableSpaces = newBoard.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)
    if (availableSpaces.length > 0) {
      const randomSpace = availableSpaces[Math.floor(Math.random() * availableSpaces.length)]
      newBoard[randomSpace] = "O"
      setBoard(newBoard)
      setCurrentPlayer("X")
      return
    }
  }

  // Find winning move for a player
  const findWinningMove = (boardState: Cell[], player: Player): number => {
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === null) {
        // Try this move
        const newBoard = [...boardState]
        newBoard[i] = player

        // Check if this move would win
        const { winner } = checkWinner(newBoard)
        if (winner === player) {
          return i
        }
      }
    }
    return -1
  }

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setWinningCombination(null)
    setGameStatus("playing")
    setAiThinking(false)
  }

  // Reset scores
  const resetScores = () => {
    setScores({ X: 0, O: 0, draw: 0 })
    resetGame()
  }

  // Select game mode
  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode)
    resetGame()
    resetScores()
  }

  // Render cell content
  const renderCell = (value: Cell, index: number) => {
    const isWinningCell = winningCombination?.includes(index)

    return (
      <motion.div
        key={index}
        className={`w-full h-full flex items-center justify-center ${isWinningCell ? "text-green-400" : "text-white"}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {value === "X" && <XIcon className="w-10 h-10 md:w-12 md:h-12" />}
        {value === "O" && <Circle className="w-8 h-8 md:w-10 md:h-10" />}
      </motion.div>
    )
  }

  // If game mode is not selected, show game mode selection
  if (!gameMode) {
    return (
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-white mb-6">Choose Game Mode</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <button
            onClick={() => selectGameMode("player")}
            className="relative overflow-hidden group rounded-lg p-6 bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-white/10 hover:from-cyan-500/20 hover:to-green-500/20 transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col items-center">
              <User className="w-12 h-12 mb-4 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white mb-2">Player vs Player</h4>
              <p className="text-sm text-white/70 text-center">Play against a friend on the same device</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => selectGameMode("ai")}
            className="relative overflow-hidden group rounded-lg p-6 bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-white/10 hover:from-blue-500/20 hover:to-green-500/20 transition-all duration-300"
          >
            <div className="relative z-10 flex flex-col items-center">
              <Cpu className="w-12 h-12 mb-4 text-green-400" />
              <h4 className="text-lg font-semibold text-white mb-2">Player vs AI</h4>
              <p className="text-sm text-white/70 text-center">Challenge the computer in a strategic battle</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      {/* Game header */}
      <div className="w-full mb-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          {gameMode === "player" ? "Player vs Player" : "Player vs AI"}
        </h3>

        {gameStatus === "playing" ? (
          <p className="text-white/80">
            Current Turn:
            <span className={`ml-2 font-bold ${currentPlayer === "X" ? "text-cyan-400" : "text-green-400"}`}>
              {currentPlayer === "X" ? "Player X" : gameMode === "ai" ? "AI" : "Player O"}
              {aiThinking && " (thinking...)"}
            </span>
          </p>
        ) : (
          <p className="text-white/80">
            Game Result:
            <span
              className={`ml-2 font-bold ${
                winner === "X" ? "text-cyan-400" : winner === "O" ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {winner === "X"
                ? "Player X Wins!"
                : winner === "O"
                  ? gameMode === "ai"
                    ? "AI Wins!"
                    : "Player O Wins!"
                  : "It's a Draw!"}
            </span>
          </p>
        )}
      </div>

      {/* Game board */}
      <div className="relative mb-8">
        <div className="relative z-10 p-4 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
          <div className="grid grid-cols-3 gap-2 w-72 h-72 md:w-80 md:h-80">
            {board.map((cell, index) => (
              <motion.button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={cell !== null || gameStatus !== "playing" || (gameMode === "ai" && currentPlayer === "O")}
                className={`relative bg-white/5 rounded-md border border-white/10 flex items-center justify-center transition-all duration-300 ${
                  cell === null && gameStatus === "playing" && !(gameMode === "ai" && currentPlayer === "O")
                    ? "hover:bg-white/10"
                    : ""
                } ${winningCombination?.includes(index) ? "bg-green-500/20 border-green-500/30" : ""}`}
                whileHover={{
                  scale:
                    cell === null && gameStatus === "playing" && !(gameMode === "ai" && currentPlayer === "O")
                      ? 1.05
                      : 1,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">{cell && renderCell(cell, index)}</AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Glass decoration behind the card */}
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
      </div>

      {/* Score board */}
      <div className="relative mb-8">
        <div className="relative z-10 p-4 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-lg border border-white/10">
          <h4 className="text-lg font-bold text-white mb-3 text-center">Score</h4>
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <p className="text-cyan-400 font-bold">Player X</p>
              <p className="text-2xl font-bold text-white">{scores.X}</p>
            </div>
            <div className="text-center">
              <p className="text-yellow-400 font-bold">Draw</p>
              <p className="text-2xl font-bold text-white">{scores.draw}</p>
            </div>
            <div className="text-center">
              <p className={`text-green-400 font-bold`}>{gameMode === "ai" ? "AI" : "Player O"}</p>
              <p className="text-2xl font-bold text-white">{scores.O}</p>
            </div>
          </div>
        </div>

        {/* Glass decoration behind the card */}
        <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 -z-10"></div>
      </div>

      {/* Game controls */}
      <div className="flex gap-3">
        <button
          onClick={resetGame}
          className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/30 to-green-500/30 text-white hover:from-cyan-500/40 hover:to-green-500/40 transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New Game
        </button>
        <button
          onClick={() => setGameMode(null)}
          className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
        >
          Change Mode
        </button>
      </div>
    </div>
  )
}