import { Client } from "boardgame.io/client";
import { BattleSimulator } from "./Game";
import {
   ClientState,
   _ClientImpl,
} from "boardgame.io/dist/types/src/client/client";
import MapTile from "./model/MapTile";
import { Grid } from "honeycomb-grid";
import * as PIXI from "pixi.js";
import Player from "./model/Player";
import { GameState } from "./types/GameState";
import { getObjectFromStateAndCoord } from "./util/board";

class BattleSimulatorClient {
   client: _ClientImpl<GameState>;
   pixiApp: PIXI.Application;
   grid: Grid<MapTile>;
   players: Player[];

   constructor(pixiApp: PIXI.Application) {
      this.client = Client({ game: BattleSimulator });
      this.client.start();
      this.pixiApp = pixiApp;
      this.grid = this.createBoard();
      this.players = this.createPlayers();

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

   createPlayers() {
      const initialState = this.client.getInitialState();
      const players = initialState.G.players;

      return players.map((player, i) => {
         // const player = new Player(playerPos, "blue");
         const playerTile = Player.create(
            0,
            this.grid.getHex(player.position)!,
            i == 0 ? "blue" : "red"
         );
         pixiApp.stage.addChild(playerTile.render());
         return playerTile;
      });
   }

   attachListeners() {
      document.addEventListener("click", ({ offsetX, offsetY }) => {
         const tile = this.grid.pointToHex(
            { x: offsetX, y: offsetY },
            { allowOutside: false }
         );
         const state = this.client.getState();

         if (state == null || tile === undefined) return;

         const coordinate = { q: tile.q, r: tile.r };
         const object = getObjectFromStateAndCoord(state.G, coordinate);

         if (object == null) {
            this.client.moves.movePlayer(coordinate);
            return;
         }

         if (object.id != state.ctx.currentPlayer) {
            this.client.moves.fight(object.id);
         }
      });
   }

   update(state: ClientState<GameState>) {
      if (state === null) return;
      const newPlayers = [];

      for (let i = 0; i < this.players.length; i++) {
         const player = this.players[i];
         player.destroy();

         const playerState = state.G.players[i];
         if (!playerState.isAlive) {
            continue;
         }

         const newPlayerPosition = playerState.position;
         const tile = this.grid.getHex(newPlayerPosition)!;
         const newPlayer = Player.create(
            playerState.power,
            tile,
            i == 0 ? "blue" : "red"
         );
         pixiApp.stage.addChild(newPlayer.render());

         tile.cellNumber = 0;
         tile.render();

         newPlayers.push(newPlayer);
      }

      this.players = newPlayers;

      if (state.ctx.gameover) {
         const textGameOverElement = document.querySelector("#game-over-text")!;
         textGameOverElement.textContent =
            state.ctx.gameover.winner !== undefined
               ? `Player ${state.ctx.gameover.winner} Win!`
               : "It's a Draw!";
      }

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
