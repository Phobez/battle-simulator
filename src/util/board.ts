import { PartialCubeCoordinates } from "honeycomb-grid";
import { GameState } from "../types/GameState";

export const getObjectFromStateAndCoord = (
   state: GameState,
   coordinate: PartialCubeCoordinates
) => {
   const filtered = state.players.filter(
      (player) =>
         player.position.q === coordinate.q &&
         player.position.r === coordinate.r
   );

   return filtered.length > 0 ? filtered[0] : null;
};
