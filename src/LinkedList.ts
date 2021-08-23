export class LLObj {
    prev: LLObj;
    next: LLObj;
    number: Number;
    priority: Number;
    obj: any;

    constructor(obj: any, number: Number = 0, priority: Number = 0) {
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

    push(obj: any) {
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

    removeLLObj(obj: LLObj) {
        if(obj.prev !== undefined) {
            obj.prev.next = obj.next;
        }
        if(obj.next !== undefined) {
            obj.next.prev = obj.prev;
        }
        this.size--;
    }

    remove(idx: number) {
        this.removeLLObj(this.getLLObj(idx));
    }

    /*get LLObj object from anywhere in list*/
    getLLObj(idx: number): LLObj {
        if(idx < 0 || idx >= this.size) {
            throw new Error("Error: invalid index");
        }

        let obj: LLObj;
        if(idx < this.size/2) {
           obj = this.head;
            for(let i=0; i<idx; i++) {
                obj = obj.next;
            }
        } else {
            obj = this.tail;
            for(let i=this.size-1; i>idx; i--) {
                 obj = obj.prev;
            }
        }

        return obj;
    }

    get(idx: number) : any {
        let llobj: LLObj = this.getLLObj(idx);
        this.removeLLObj(llobj);
        return llobj.obj;
    }

    getHead(): any {
        if(this.size > 0) {
            let obj: any = this.head.obj;
            this.head = this.head.next;
            this.size--;
            if(this.head) {
                this.head.prev = undefined;
            }
            return obj;
        }
        throw new Error("No objects in list");
    }

    pop() : any {
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
