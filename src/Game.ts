import { Game } from "boardgame.io";
import { mockBoard, mockPosition } from "./temp/board-mocker";
import { BaseMapTile } from "./types/model/BaseMapTile";
import { HexCoordinates, distance } from "honeycomb-grid";
import { INVALID_MOVE } from "boardgame.io/core";
import BaseHex from "./model/Base/TileHex";

export interface GameState {
   cells: BaseMapTile[][];
   playerPos: HexCoordinates;
}

export const BattleSimulator: Game<GameState> = {
   setup: () => {
      const cells = mockBoard();
      return {
         cells: cells,
         playerPos: mockPosition(cells),
      };
   },
   moves: {
      movePlayer: ({ G }, target: HexCoordinates) => {
         if (distance(BaseHex.settings, G.playerPos, target) > 1)
            return INVALID_MOVE;
         G.playerPos = target;
      },
   },
};
