import { HexCoordinates, defineHex } from "honeycomb-grid";
import gameConfig from "../../game-config.json";
import * as PIXI from "pixi.js";

class MapTile extends defineHex(gameConfig.hex) {
   cellNumber!: Number;
   graphic!: PIXI.Graphics;

   static create(coordinates: HexCoordinates, cellNumber: Number) {
      const hex = new MapTile(coordinates);
      hex.cellNumber = cellNumber;
      hex.graphic = new PIXI.Graphics();
      return hex;
   }
}

export default MapTile;
