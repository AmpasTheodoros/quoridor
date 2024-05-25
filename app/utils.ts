// src/app/utils.ts
export const BOARD_SIZE = 9;

export interface Player {
  id: number;
  position: [number, number];
  walls: number;
}

export interface Wall {
  position: [number, number];
  orientation: 'horizontal' | 'vertical';
}

export const getValidMoves = (players: Player[], walls: Wall[], playerId: number): [number, number][] => {
  const player = players.find(p => p.id === playerId);
  if (!player) return [];

  const [currentRow, currentCol] = player.position;
  const potentialMoves = [
    [currentRow - 1, currentCol], // Up
    [currentRow + 1, currentCol], // Down
    [currentRow, currentCol - 1], // Left
    [currentRow, currentCol + 1], // Right
  ];

  return potentialMoves.filter(([newRow, newCol]) => isValidMove(players, walls, playerId, newRow, newCol));
};

export const isValidMove = (players: Player[], walls: Wall[], playerId: number, newRow: number, newCol: number): boolean => {
  const player = players.find(p => p.id === playerId);
  if (!player) return false;

  const [currentRow, currentCol] = player.position;

  // Ensure new position is within bounds
  if (newRow < 0 || newRow >= BOARD_SIZE || newCol < 0 || newCol >= BOARD_SIZE) return false;

  // Ensure move is only one block in any direction
  const isOneBlockMove = (Math.abs(newRow - currentRow) === 1 && newCol === currentCol) || 
                         (Math.abs(newCol - currentCol) === 1 && newRow === currentRow);
  if (!isOneBlockMove) return false;

  // Check if there's a wall blocking the move
  const isBlocked = walls.some(w => {
    if (w.orientation === 'horizontal') {
      // Block vertical movements (up or down)
      return (
        (w.position[0] === Math.min(currentRow, newRow) && (w.position[1] === currentCol || w.position[1] === currentCol - 1))
      );
    }
    if (w.orientation === 'vertical') {
      // Block horizontal movements (left or right)
      return (
        (w.position[1] === Math.min(currentCol, newCol) && (w.position[0] === currentRow || w.position[0] === currentRow - 1))
      );
    }
    return false;
  });

  return !isBlocked;
};
