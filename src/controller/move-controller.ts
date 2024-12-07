import { PartialCubeCoordinates, distance, toCube } from "honeycomb-grid";
import { INVALID_MOVE } from "boardgame.io/core";
import { Move } from "boardgame.io";
import { GameState } from "../types/GameState";
import TileHex from "../model/Base/TileHex";

const movePlayer: Move<GameState> = (
   { G, playerID },
   target: PartialCubeCoordinates
) => {
   const player = G.players[+playerID];
   const dist = distance(TileHex.settings, player.position, target);
   if (dist > 1 || dist == 0) return INVALID_MOVE;
   player.position = target;

   const currCoordinates = toCube(TileHex.settings, target);
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
};

class MoveController {
   static publish() {
      return {
         movePlayer,
      };
   }
}

export default MoveController;
