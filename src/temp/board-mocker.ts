import { BaseMapTile } from "../types/model/BaseMapTile";

export const mockBoard = (): BaseMapTile[][] => {
   return Array.from(Array(10), (_, i) =>
      Array.from(Array(10), (_, j) => ({
         coordinates: { row: i, col: j },
         cellNumber: Math.random() * 3 < 1 ? 1 : 0,
      }))
   );
};
