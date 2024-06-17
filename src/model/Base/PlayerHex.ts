// Temporary class because player is now rendered using hex
import { defineHex } from "honeycomb-grid";
import gameConfig from "../../../gameConfig";

const PlayerHex = defineHex({ ...gameConfig.hex, dimensions: 30 });

export default PlayerHex;
