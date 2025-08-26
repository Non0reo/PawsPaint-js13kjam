import type { Base, Entity, TileObject } from "./tile";
import type { Position } from "./types";

interface Grid {
    /* gridObject: GridObject; */
    tile(pos: Position): any;
    w: number;
    h: number;
    p: number[][];
    base: Base[];
    objects: TileObject[];
    entities: Entity[];
    gridElement: HTMLElement | null;
}

export type { Grid };
