export declare class LLObj {
    prev: LLObj;
    next: LLObj;
    number: Number;
    priority: Number;
    obj: Object;
    constructor(obj: Object, number?: Number, priority?: Number);
}
export default class LinkedList {
    head: LLObj;
    tail: LLObj;
    size: number;
    constructor();
    getSize(): number;
    push(obj: Object): void;
    removeLLObj(obj: LLObj): void;
    remove(idx: number): void;
    getLLObj(idx: number): LLObj;
    get(idx: number): Object;
    getHead(): Object;
    pop(): Object;
}
