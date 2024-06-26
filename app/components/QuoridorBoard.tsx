// src/app/components/QuoridorBoard.tsx
import React from 'react';

const BOARD_SIZE = 9;

interface Player {
  id: number;
  position: [number, number];
}

interface QuoridorBoardProps {
  players: Player[];
  currentPlayer: number;
  onMove: (row: number, col: number) => void;
}

const QuoridorBoard: React.FC<QuoridorBoardProps> = ({ players, currentPlayer, onMove }) => {
    const renderSquare = (row: number, col: number) => {
    const player = players.find(p => p.position[0] === row && p.position[1] === col);
    
    return (
      <div 
        key={`${row}-${col}`} 
        className="bg-white aspect-square flex items-center justify-center cursor-pointer hover:bg-gray-200"
        onClick={() => onMove(row, col)}
      >
        {player && (
          <div className={`w-3/4 h-3/4 rounded-full ${player.id === 1 ? 'bg-blue-500' : 'bg-red-500'}`} />
        )}
      </div>
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        board.push(renderSquare(row, col));
      }
    }
    return board;
  };

  return (
    <div className="grid grid-cols-9 gap-0.5 w-[450px] h-[450px] bg-gray-300 p-0.5">
      {renderBoard()}
    </div>
  );
};

export default QuoridorBoard;