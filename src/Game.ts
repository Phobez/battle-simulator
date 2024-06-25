import { Game } from "boardgame.io";
import { mockBoard, mockPosition } from "./temp/board-mocker";
import { BaseMapTile } from "./types/model/BaseMapTile";
import { PartialCubeCoordinates, distance, toCube } from "honeycomb-grid";
import { INVALID_MOVE } from "boardgame.io/core";
import BaseHex from "./model/Base/TileHex";
import { BasePlayer } from "./types/model/BasePlayer";

export interface GameState {
   cells: BaseMapTile[];
   player: BasePlayer;
}

export const BattleSimulator: Game<GameState> = {
   setup: () => {
      const cells = mockBoard();
      return {
         cells: cells,
         player: {
            position: mockPosition(cells),
            power: 0,
         },
      };
   },
   moves: {
      movePlayer: ({ G }, target: PartialCubeCoordinates) => {
         if (distance(BaseHex.settings, G.player.position, target) > 1)
            return INVALID_MOVE;
         G.player.position = target;

         const currCoordinates = toCube(BaseHex.settings, target);
         const targetCell = G.cells.filter((cell) => {
            return (
               currCoordinates.q === cell.coordinates.q &&
               currCoordinates.r === cell.coordinates.r
            );
         })[0];

         if (targetCell.cellNumber > 0) {
            G.player.power += targetCell.cellNumber;
            targetCell.cellNumber = 0;
         }
      },
   },
};
