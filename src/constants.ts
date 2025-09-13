const RADIUS = '15px';

const getBaseName = new Map<number, string>([
    [1, 'Marble']
]);

const getObjectName = new Map<number, string>([
    [1, 'Paint'],
    [2, 'Yarn'],
    [3, 'Soap'],
    [4, 'Bucket'],
    [5, 'Puddle'],
    [6, 'Ladyline'],
    [7, 'EmptyBucket']
]);

const getEntityName = new Map<number, string>([
    [1, 'Cat'],
    [2, 'Mouse'],
    [3, 'Lady']
]);

export { RADIUS, getBaseName, getObjectName, getEntityName };
