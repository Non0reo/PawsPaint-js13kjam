import type { Base } from "./tiles/base/core-base";
import type { Entity } from "./tiles/entities/core-entity";
import type { TileObject } from "./tiles/objects/core-object";
import type { Position, Tile } from "./types";

interface Grid {
    /* gridObject: GridObject; */
    getTileAt(pos: Position): Tile;
    w: number;
    h: number;
    p: number[][];
    bases: Base[];
    objects: TileObject[];
    entities: Entity[];
    gridElement: HTMLElement | null;
}

export type { Grid };
