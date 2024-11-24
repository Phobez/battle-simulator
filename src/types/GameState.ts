import { BaseMapTile } from "./model/BaseMapTile";
import { BasePlayer } from "./model/BasePlayer";

export declare type GameState = {
   cells: BaseMapTile[];
   players: BasePlayer[];
};
