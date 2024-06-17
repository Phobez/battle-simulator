import * as Config from "../../../colors.json";

export type Player = typeof Config.player;
export type PlayerTeamColor = keyof typeof Config.player;
