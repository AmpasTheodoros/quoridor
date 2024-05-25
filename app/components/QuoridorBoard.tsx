// src/app/components/QuoridorBoard.tsx
import React from 'react';

const BOARD_SIZE = 9;

interface Player {
  id: number;
  position: [number, number];
  walls: number;
}

interface Wall {
  position: [number, number];
  orientation: 'horizontal' | 'vertical';
}

interface QuoridorBoardProps {
  players: Player[];
  currentPlayer: number;
  onMove: (row: number, col: number) => void;
  walls: Wall[];
  placingWall: boolean;
  onWallPlacement: (row: number, col: number, orientation: 'horizontal' | 'vertical') => void;
  getValidMoves: () => [number, number][];
}

const QuoridorBoard: React.FC<QuoridorBoardProps> = ({
  players, currentPlayer, onMove, walls, onWallPlacement, getValidMoves
}) => {
  const validMoves = getValidMoves();

  const renderSquare = (row: number, col: number) => {
    const player = players.find(p => p.position[0] === row && p.position[1] === col);
    const isValidMove = validMoves.some(([validRow, validCol]) => validRow === row && validCol === col);

    return (
      <div 
        key={`${row}-${col}`} 
        className={`bg-white aspect-square flex items-center justify-center cursor-pointer hover:bg-gray-200 relative ${isValidMove ? 'bg-green-200' : ''}`}
        onClick={() => isValidMove && onMove(row, col)}
      >
        {player && (
          <div className={`w-3/4 h-3/4 rounded-full ${player.id === 1 ? 'bg-blue-500' : 'bg-red-500'}`} />
        )}
      </div>
    );
  };

  const renderWalls = () => {
    return walls.map((wall, index) => (
      <div 
        key={index}
        className={`absolute ${wall.orientation === 'horizontal' ? 'w-[calc(22.22%+2px)] h-1' : 'h-[calc(22.22%+2px)] w-1'} bg-yellow-500`}
        style={{
          left: `calc(${wall.position[1]} * 11.11% ${wall.orientation === 'vertical' ? '+ 0.5px' : ''})`,
          top: `calc(${wall.position[0]} * 11.11% ${wall.orientation === 'horizontal' ? '+ 0.5px' : ''})`,
          zIndex: 10,
        }}
      />
    ));
  };

  const renderWallPlaceholders = () => {
    const placeholders = [];
    for (let i = 0; i < BOARD_SIZE - 1; i++) {
      for (let j = 0; j < BOARD_SIZE - 1; j++) {
        placeholders.push(
          <div
            key={`h-${i}-${j}`}
            className="absolute w-[calc(22.22%+2px)] h-1 bg-gray-300 hover:bg-yellow-500 cursor-pointer"
            style={{ left: `calc(${j} * 11.11%)`, top: `calc(${i + 1} * 11.11% + 0.5px)` }}
            onClick={() => onWallPlacement(i + 1, j, 'horizontal')}
          />,
          <div
            key={`v-${i}-${j}`}
            className="absolute w-1 h-[calc(22.22%+2px)] bg-gray-300 hover:bg-yellow-500 cursor-pointer"
            style={{ left: `calc(${j + 1} * 11.11% + 0.5px)`, top: `calc(${i} * 11.11%)` }}
            onClick={() => onWallPlacement(i, j + 1, 'vertical')}
          />
        );
      }
    }
    return placeholders;
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
    <div className="relative grid grid-cols-9 gap-0.5 w-[450px] h-[450px] bg-gray-300 p-0.5">
      {renderBoard()}
      {renderWallPlaceholders()}
      {renderWalls()}
    </div>
  );
};

export default QuoridorBoard;
