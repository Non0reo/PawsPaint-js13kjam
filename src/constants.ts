import type { Base } from "./tiles/base/core-base";
import { Marble } from "./tiles/base/marble";
import { Cat } from "./tiles/entities/cat";
import type { Entity } from "./tiles/entities/core-entity";
import { Lady } from "./tiles/entities/lady";
import { Mouse } from "./tiles/entities/mouse";
import { Bucket } from "./tiles/objects/bucket";
import type { Obj } from "./tiles/objects/core-object";
import { Ladyline } from "./tiles/objects/ladyline";
import { Paint } from "./tiles/objects/paint";
import { Puddle } from "./tiles/objects/puddle";
import { Soap } from "./tiles/objects/soap";
import { Yarn } from "./tiles/objects/yarn";

const RADIUS = '15px';

const BaseName = new Map<number, typeof Base>([
    //[0, "Empty"],
    [1, Marble]
]);

const ObjectName = new Map<number, typeof Obj>([
    //[0, "Empty"],
    [1, Paint],
    [2, Yarn],
    [3, Soap],
    [4, Bucket],
    [5, Puddle],
    [6, Ladyline]
]);

const EntityName = new Map<number, typeof Entity>([
    //[0, "Empty"],
    [1, Cat],
    [2, Mouse],
    [3, Lady]
]);

export { RADIUS, BaseName, ObjectName, EntityName };
