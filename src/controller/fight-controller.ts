import { Move } from "boardgame.io";
import { GameState } from "../types/GameState";
import TileHex from "../model/Base/TileHex";
import { distance } from "honeycomb-grid";
import { INVALID_MOVE } from "boardgame.io/core";

const fight: Move<GameState> = ({ G, playerID }, targetPlayerId: string) => {
   const currentPlayer = G.players[+playerID];
   const targetPlayer = G.players[+targetPlayerId];
   const dist = distance(
      TileHex.settings,
      currentPlayer.position,
      targetPlayer.position
   );
   if (dist > 1) return INVALID_MOVE;

   const high =
      currentPlayer.power > targetPlayer.power ? currentPlayer : targetPlayer;
   const low =
      currentPlayer.power < targetPlayer.power ? currentPlayer : targetPlayer;

   high.power -= low.power;
   low.power = 0;

   if (high.power === 0) high.isAlive = false;
   if (low.power === 0) low.isAlive = false;
};

class FightController {
   static publish() {
      return {
         fight,
      };
   }
}

export default FightController;
