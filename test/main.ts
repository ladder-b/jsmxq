import Subscriber from "../src/Subscriber"
import Xchange from "../src/Xchange";

class Sub extends Subscriber {

    constructor(name: string) {
        super(name);
    }

    onMessageReceive(msg: Object) {
        console.log(this.msgRecvdCount)
        console.log(msg);
    }
}

let xchange = new Xchange();

let s1 = new Sub("SUB1");
s1.addSubject("sub1");

let s2 = new Sub("SUB2");
s2.addSubject("sub2");

xchange.subscribe(s1);
xchange.subscribe(s2);

for(let i=0; i<10; i++) {
    s1.post("sub2", "message from s1: "+i);
}

s2.post("sub1", "message from s2");