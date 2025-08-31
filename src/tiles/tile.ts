import type { SpriteParams, SpriteTypes } from "../types";
import { Base } from "./base/core-base";
import { Entity } from "./entities/core-entity";
import { Obj } from "./objects/core-object";

import { Marble } from "./base/marble";
import { Cat } from "./entities/cat";
import { Lady } from "./entities/lady";
import { Mouse } from "./entities/mouse";
import { Bucket } from "./objects/bucket";
import { Ladyline } from "./objects/ladyline";
import { Paint } from "./objects/paint";
import { Puddle } from "./objects/puddle";
import { Soap } from "./objects/soap";
import { Yarn } from "./objects/yarn";

import { getBaseName, getObjectName, getEntityName } from "../constants";

function invokeSpriteFromType(opts: SpriteParams, spriteType: SpriteTypes): Base | Obj | Entity | null {
    if (!opts.el) return null;
    let spriteClass;
    switch (spriteType) {
        case Base: spriteClass = getBaseName.get(opts.el.type) || null; break;
        case Obj: spriteClass = getObjectName.get(opts.el.type) || null; break;
        case Entity: spriteClass = getEntityName.get(opts.el.type) || null; break;
        default: break;
    }

    if (!spriteClass) return null;
    const classMap: { [key: string]: new (opts: SpriteParams) => Base | Obj | Entity } = {
        Marble: Marble,
        Paint: Paint,
        Yarn: Yarn,
        Soap: Soap,
        Bucket: Bucket,
        Puddle: Puddle,
        Ladyline: Ladyline,
        Cat: Cat,
        Mouse: Mouse,
        Lady: Lady,
    };
    const ctor = classMap[spriteClass];
    if (!ctor) return null;

    return new ctor(opts);
}

export { invokeSpriteFromType };