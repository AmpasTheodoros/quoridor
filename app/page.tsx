// src/app/page.tsx
'use client';

import { useState } from 'react';
import QuoridorBoard from './components/QuoridorBoard';

export default function Home() {
  const [players, setPlayers] = useState([
    { id: 1, position: [0, 4] },
    { id: 2, position: [8, 4] },
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const isValidMove = (playerId: number, newRow: number, newCol: number) => {
    const player = players.find(p => p.id === playerId);
    if (!player) return false;

    const [currentRow, currentCol] = player.position;
    const rowDiff = Math.abs(newRow - currentRow);
    const colDiff = Math.abs(newCol - currentCol);

    // Check if the move is one square orthogonally
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  };

  const handleMove = (row: number, col: number) => {
    if (isValidMove(currentPlayer, row, col)) {
      setPlayers(players.map(player => 
        player.id === currentPlayer ? { ...player, position: [row, col] } : player
      ));
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Quoridor Game</h1>
      <p className="mb-4">Current Player: {currentPlayer}</p>
      <QuoridorBoard players={players} currentPlayer={currentPlayer} onMove={handleMove} />
    </main>
  );
}