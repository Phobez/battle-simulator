import { Game } from "boardgame.io";
import { mockBoard, mockPlayers } from "./temp/board-mocker";
import { GameState } from "./types/GameState";
import MoveController from "./controller/move-controller";

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
      ...MoveController.publish(),
   },
};
