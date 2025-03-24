"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GamepadIcon as GameController, X } from "lucide-react";
import TicTacToeGame from "./tic-tac-toe-game";

type GameType = "tictactoe" | null;

export default function GameLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [activeGame, setActiveGame] = useState<GameType>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGameSelect = (game: GameType) => {
    setActiveGame(game);
  };

  const handleClose = () => {
    setActiveGame(null);
    setIsOpen(false);
  };

  return (
    <>
      {/* Game Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="absolute inset-0.5 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <GameController className="w-6 h-6 text-white" />
                )}
              </span>

              {!isOpen && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && !activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Choose a Game
                </h2>
                <p className="text-white/70">Play against AI and have fun!</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => handleGameSelect("tictactoe")}
                  className="relative overflow-hidden group rounded-lg p-4 bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-white/10 hover:from-cyan-500/20 hover:to-green-500/20 transition-all duration-300"
                >
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Tic-Tac-Toe
                    </h3>
                    <p className="text-sm text-white/70">
                      Play against AI or a friend!
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Tic-Tac-Toe</h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-auto">
                <TicTacToeGame />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}