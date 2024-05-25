// src/app/page.tsx
'use client';

import { useState } from 'react';
import QuoridorBoard from './components/QuoridorBoard';
import { getValidMoves, isValidMove, BOARD_SIZE, Player, Wall } from './utils';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, position: [0, 4], walls: 10 },
    { id: 2, position: [8, 4], walls: 10 },
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [placingWall, setPlacingWall] = useState(false);

  const handleMove = (row: number, col: number) => {
    if (isValidMove(players, walls, currentPlayer, row, col)) {
      setPlayers(players.map(player => 
        player.id === currentPlayer ? { ...player, position: [row, col] } : player
      ));
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const handleWallPlacement = (row: number, col: number, orientation: 'horizontal' | 'vertical') => {
    const currentPlayerObj = players.find(p => p.id === currentPlayer);
    if (!currentPlayerObj || currentPlayerObj.walls <= 0) return;
  
    // Check if wall placement is valid
    const isValidPlacement = !walls.some(w => 
      (w.position[0] === row && w.position[1] === col) ||
      (orientation === 'horizontal' && w.position[0] === row && w.position[1] === col - 1) ||
      (orientation === 'vertical' && w.position[0] === row - 1 && w.position[1] === col)
    );
  
    if (isValidPlacement) {
      setWalls([...walls, { position: [row, col], orientation }]);
      setPlayers(players.map(p => 
        p.id === currentPlayer ? { ...p, walls: p.walls - 1 } : p
      ));
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Quoridor Game</h1>
      <p className="mb-4">Current Player: {currentPlayer}</p>
      <button 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setPlacingWall(!placingWall)}
      >
        {placingWall ? 'Cancel Wall' : 'Place Wall'}
      </button>
      <QuoridorBoard 
        players={players} 
        currentPlayer={currentPlayer} 
        onMove={handleMove}
        walls={walls}
        placingWall={placingWall}
        onWallPlacement={handleWallPlacement}
        getValidMoves={() => getValidMoves(players, walls, currentPlayer)}
      />
    </main>
  );
}
