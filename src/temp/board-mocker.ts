import { toCube } from "honeycomb-grid";
import TileHex from "../model/Base/TileHex";
import { BaseMapTile } from "../types/model/BaseMapTile";
import { BasePlayer } from "../types/model/BasePlayer";

function getRandomInt(min: number, max: number) {
   const minCeiled = Math.ceil(min);
   const maxFloored = Math.floor(max);
   return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export const mockBoard = (): BaseMapTile[] => {
   return Array.from(Array(10), (_, i) =>
      Array.from(Array(10), (_, j) => ({
         coordinates: toCube(TileHex.settings, { row: i, col: j }),
         cellNumber: Math.random() * 3 < 1 ? 1 : 0,
      }))
   ).flat();
};

export const mockPlayers = (
   board: BaseMapTile[],
   playerCount: number
): BasePlayer[] => {
   const availablePositions = board.filter((tile) => tile.cellNumber === 0);
   const players: BasePlayer[] = [];

   for (let i = 0; i < playerCount; i++) {
      const randomTileIdx = getRandomInt(0, availablePositions.length);
      players.push({
         id: i.toString(),
         power: 0,
         position: availablePositions.splice(randomTileIdx, 1)[0].coordinates,
         isAlive: true,
      });
   }

   return players;
};

export const multiplyMatrix = (mat1: number[][], mat2: number[][]) => {
   const n1 = mat1.length,
      m1 = mat1[0].length,
      n2 = mat2.length,
      m2 = mat2[0].length;
   if (m1 !== n2) throw "Invalid matrix size";

   const res = Array.from(Array(n1), () => Array(m2).fill(0));
   for (let i = 0; i < n1; i++) {
      for (let j = 0; j < m2; j++) {
         let temp = 0;
         for (let k = 0; k < m1; k++) temp += mat1[i][k] * mat2[k][j];
         res[i][j] = temp;
      }
   }

   return res;
};
