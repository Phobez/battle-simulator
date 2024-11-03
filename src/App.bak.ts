import { Client } from "boardgame.io/client";
import { BattleSimulator, GameState } from "./Game";
import {
   ClientState,
   _ClientImpl,
} from "boardgame.io/dist/types/src/client/client";
import MapTile from "./model/MapTile";
import { Grid } from "honeycomb-grid";
import * as PIXI from "pixi.js";
import Player from "./model/Player";

class BattleSimulatorClient {
   client: _ClientImpl<GameState>;
   pixiApp: PIXI.Application;
   grid: Grid<MapTile>;
   player: Player;

   constructor(pixiApp: PIXI.Application) {
      this.client = Client({ game: BattleSimulator });
      this.client.start();
      this.pixiApp = pixiApp;
      this.grid = this.createBoard();
      this.player = this.createPlayer();

      this.attachListeners();
      this.client.subscribe((state) => this.update(state));
   }

   createBoard() {
      const initialState = this.client.getInitialState();
      const cells = initialState.G.cells;

      // Temporary code to draw grid here
      const grid = Grid.fromIterable(
         cells.map((cell) => MapTile.create(cell.coordinates, cell.cellNumber))
      );

      grid.forEach((tile) => pixiApp.stage.addChild(tile.render()));
      return grid;
   }

   createPlayer() {
      const initialState = this.client.getInitialState();
      const playerPos = initialState.G.player.position;

      // const player = new Player(playerPos, "blue");
      const player = Player.create(0, this.grid.getHex(playerPos)!, "blue");
      pixiApp.stage.addChild(player.render());
      return player;
   }

   attachListeners() {
      document.addEventListener("click", ({ offsetX, offsetY }) => {
         const tile = this.grid.pointToHex(
            { x: offsetX, y: offsetY },
            { allowOutside: false }
         );

         if (tile !== undefined) {
            this.client.moves.movePlayer({ q: tile.q, r: tile.r });
         }
      });
   }

   update(state: ClientState<GameState>) {
      if (state === null) return;
      this.player.destroy();

      const newPlayerPosition = state.G.player.position;
      const tile = this.grid.getHex(newPlayerPosition)!;
      const player = Player.create(state.G.player.power, tile, "blue");
      pixiApp.stage.addChild(player.render());
      this.player = player;

      tile.cellNumber = 0;
      tile.render();
      // console.log("Before: ", { q: this.player.q, r: this.player.r });
      // console.log("After: ", newPlayerPosition);
      // const cubePosition = toCube(TileHex.settings, newPlayerPosition);
      // const tilePosition = this.grid.getHex(newPlayerPosition);
      // this.player = this.player.translate({
      //    q: cubePosition.q - this.player.q,
      //    r: cubePosition.r - this.player.r,
      // });
   }
}

const pixiApp = new PIXI.Application();
await pixiApp.init({ backgroundAlpha: 0 });

document.body.appendChild(pixiApp.canvas);

// Debug Only
globalThis.__PIXI_APP__ = pixiApp;

const app = new BattleSimulatorClient(pixiApp);
