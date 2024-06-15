import { Client } from "boardgame.io/client";
import { BattleSimulator, GameState } from "./Game";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";
import MapTile from "./model/MapTile";
import { Grid } from "honeycomb-grid";
import * as PIXI from "pixi.js";

class BattleSimulatorClient {
   client: _ClientImpl<GameState>;
   pixiApp: PIXI.Application;

   constructor(pixiApp: PIXI.Application) {
      this.client = Client({ game: BattleSimulator });
      this.client.start();
      this.pixiApp = pixiApp;
      this.createBoard();
   }

   createBoard() {
      const initialState = this.client.getInitialState();
      const cells = initialState.G.cells;

      // Temporary code to draw grid here
      const grid = Grid.fromIterable(
         cells.flatMap((row) =>
            row.map((cell) => MapTile.create(cell.coordinates, cell.cellNumber))
         )
      );

      grid.forEach((tile) => pixiApp.stage.addChild(tile.render()));
   }
}

const pixiApp = new PIXI.Application();
await pixiApp.init({ backgroundAlpha: 0 });

document.body.appendChild(pixiApp.canvas);

// Debug Only
globalThis.__PIXI_APP__ = pixiApp;

const app = new BattleSimulatorClient(pixiApp);
