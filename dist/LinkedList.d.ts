export declare class LLObj {
    prev: LLObj | undefined;
    next: LLObj | undefined;
    number: Number;
    priority: Number;
    obj: any;
    constructor(obj: any, number?: Number, priority?: Number);
}
export default class LinkedList {
    head: LLObj;
    tail: LLObj;
    size: number;
    constructor();
    getSize(): number;
    push(obj: any): void;
    removeLLObj(obj: LLObj): void;
    remove(idx: number): void;
    getLLObj(idx: number): LLObj;
    get(idx: number): any;
    getHead(): any;
    pop(): any;
}
