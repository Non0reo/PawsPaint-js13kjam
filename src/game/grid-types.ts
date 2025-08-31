import type { Base } from "../tiles/base/core-base";
import type { Entity } from "../tiles/entities/core-entity";
import type { Obj } from "../tiles/objects/core-object";
import type { Sprite } from "../tiles/sprite";
import type { Position, Tile } from "../types";

interface GridType {
    getTileAt(pos: Position): Tile;
    setTileAt(pos: Position, sprite: Sprite): void;
    w: number;
    h: number;
    p: number[][];
    bases: Base[];
    objects: Obj[];
    entities: Entity[];
    gEl: HTMLElement | null;
}

export type { GridType };
