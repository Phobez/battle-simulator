import { Client } from "boardgame.io/client";
import { BattleSimulator } from "./Game";
import { _ClientImpl } from "boardgame.io/dist/types/src/client/client";

class BattleSimulatorClient {
   client: _ClientImpl;
   rootElement: HTMLElement;

   constructor(rootElement: HTMLElement) {
      this.client = Client({ game: BattleSimulator });
      this.client.start();
      this.rootElement = rootElement;
      this.createBoard();
   }

   createBoard() {}
}

const appElement = document.getElementById("app")!;
const app = new BattleSimulatorClient(appElement);
