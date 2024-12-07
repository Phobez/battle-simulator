import { PartialCubeCoordinates } from "honeycomb-grid";

export declare type BasePlayer = {
   id: string;
   position: PartialCubeCoordinates;
   power: number;
   isAlive: boolean;
};
