export class LLObj {

    prev: LLObj;
    next: LLObj;
    number: Number;
    priority: Number;
    obj: Object;

    constructor(obj: Object, number: Number = 0, priority: Number = 0) {
        this.number = number;
        this.priority = priority;
        this.obj = obj;
    }
}

export default class LinkedList {

    head: LLObj;
    tail: LLObj;
    size: number;

    constructor() {
        this.size = 0;
    }

    getSize(): number {
        return this.size;
    }

    push(obj: Object) {
        let llObj = new LLObj(obj, this.size);
        
        if(this.size === 0) {
            this.head = llObj;
        } else {
            this.tail.next = llObj;
            llObj.prev = this.tail;
        }
        
        this.size++;
        this.tail = llObj;        
    }

    pop() {
        if(this.size > 0) {
            this.size--;
            let obj: LLObj = this.tail;
            this.tail = obj.prev;
            if(this.tail !== undefined) {
                this.tail.next = undefined;
            }

            obj.prev = undefined;
            obj.next = undefined;
            return obj.obj;
        } else {
            throw new Error("Error pop() operation: Linked list in empty")
        }
    }
}