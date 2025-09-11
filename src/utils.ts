import type { Direction, ElementData } from "./types";

function directionFromDelta(deltaX: number, deltaY: number): Direction | null {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? 'R' : 'L';
    } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return deltaY > 0 ? 'D' : 'U';
    }
    return null; // No significant movement
}

function patternToElementData(patternData: string | null): ElementData[] {
    const dataSliced = `${patternData}`.split('.');
    while (dataSliced.length < 3) dataSliced.push('0');

    let elData: ElementData[] = [];
    dataSliced.forEach((element, i) => {
        elData.push({
            raw: element || null,
            type: parseInt(element) || 0,
            data: element.replace(/[^a-zA-Z]/g, '') || null,
            spriteIndex: i,
            isEmpty: element === '0' || element === '' ? true : false,
        });
    });

    return elData;
}

function elementDataToPattern(elementData: ElementData[], patternData?: string): string {
    let basePattern = patternData ? `${patternData}`.split('.') : ['0', '0', '0'];
    elementData.forEach(el => {
            basePattern[el.spriteIndex] = el.raw || '0';
    });
    return basePattern.join('.');
}

function everyIn(c: any, arr: any[], callback: (item: any) => void) {
    for (const thing of arr) {
        if(thing instanceof c) {
            //thing.setAnimation('joy-animation');
            callback(thing);
        }
    }
}

function dirToDegrees(dir: Direction): number {
    switch(dir) {
        case 'U': return 0;
        case 'R': return 90;
        case 'D': return 180;
        case 'L': return 270;
        default: return 0;
    }
}

export { directionFromDelta, patternToElementData, elementDataToPattern, everyIn, dirToDegrees };