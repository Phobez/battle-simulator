import { Game } from "boardgame.io";
import { mockBoard } from "./temp/board-mocker";
import { BaseMapTile } from "./types/model/BaseMapTile";

export interface GameState {
   cells: BaseMapTile[][];
}

export const BattleSimulator: Game<GameState> = {
   setup: () => ({
      cells: mockBoard(),
   }),
   moves: {},
};
