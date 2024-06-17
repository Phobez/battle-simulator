import PlayerHex from "./Base/PlayerHex";
import MapTile from "./MapTile";
import * as PIXI from "pixi.js";
import { player as playerColor } from "../../colors.json";
import { PlayerTeamColor } from "../types/config/colors";
import { multiplyMatrix } from "../temp/board-mocker";

// class Player {
class Player extends PlayerHex {
   power!: number;
   positionTile!: MapTile;
   colorKey!: PlayerTeamColor;
   graphic!: PIXI.Graphics;

   // constructor(initialTile: MapTile, colorKey: string) {
   //    this.power = 0;
   //    this.positionTile = initialTile;
   //    this.colorKey = colorKey;
   // }

   // Temporary Create function for Hex Player
   static create(initialTile: MapTile, colorKey: PlayerTeamColor) {
      const hex = new Player({ q: initialTile.q, r: initialTile.r });
      hex.power = 0;
      hex.positionTile = initialTile;
      hex.colorKey = colorKey;
      hex.graphic = new PIXI.Graphics();
      return hex;
   }

   render() {
      this.graphic.clear();

      const color = playerColor[this.colorKey].active;

      // TODO: Turns original hex corner into shrinked corner
      //    => Linear Transformation - Scaling
      // https://gamemath.com/book/matrixtransforms.html

      // Get Original corner points then
      //    Standardize each corner point by substracting it from the hex center
      const originalCorners = this.corners.map((p) => [
         p.x - this.x,
         p.y - this.y,
      ]);

      // Scale matrix
      const scale = 4 / 5;
      const sm = [
         [scale, 0],
         [0, scale],
      ];

      const newCorners = multiplyMatrix(originalCorners, sm).map((p) => ({
         x: p[0] + this.x,
         y: p[1] + this.y,
      }));

      this.graphic
         .poly(newCorners)
         .fill({ color })
         .stroke({ width: 1, color: "#999999" });

      this.graphic.removeChildren();

      const text = new PIXI.Text({ text: this.power });
      text.x = this.x - text.width / 2;
      text.y = this.y - text.height / 2;
      this.graphic.addChild(text);

      return this.graphic;
   }

   destroy() {
      this.graphic.removeChildren();
      this.graphic.clear();
      this.graphic.destroy();
   }
}

export default Player;
