import { Game } from "boardgame.io";
import { mockBoard, mockPlayers } from "./temp/board-mocker";
import { BaseMapTile } from "./types/model/BaseMapTile";
import { PartialCubeCoordinates, distance, toCube } from "honeycomb-grid";
import { INVALID_MOVE } from "boardgame.io/core";
import BaseHex from "./model/Base/TileHex";
import { BasePlayer } from "./types/model/BasePlayer";

export interface GameState {
   cells: BaseMapTile[];
   players: BasePlayer[];
}

export const BattleSimulator: Game<GameState> = {
   setup: () => {
      const cells = mockBoard();
      return {
         cells: cells,
         players: mockPlayers(cells, 2),
      };
   },
   minPlayers: 2,
   maxPlayers: 2,
   turn: {
      minMoves: 1,
      maxMoves: 1,
   },
   moves: {
      movePlayer: ({ G, playerID }, target: PartialCubeCoordinates) => {
         const player = G.players[+playerID];
         if (distance(BaseHex.settings, player.position, target) > 1)
            return INVALID_MOVE;
         player.position = target;

         const currCoordinates = toCube(BaseHex.settings, target);
         const targetCell = G.cells.filter((cell) => {
            return (
               currCoordinates.q === cell.coordinates.q &&
               currCoordinates.r === cell.coordinates.r
            );
         })[0];

         if (targetCell.cellNumber > 0) {
            player.power += targetCell.cellNumber;
            targetCell.cellNumber = 0;
         }
      },
   },
};
