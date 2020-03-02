# jsmxq
JavaScript Message Xchange

### Introduction:
`jsmxq` is very simple messaging library written in Typescript. It provides subject based message routing between objects. It was developed to be used with `reactjs`, but can be used with any project which needs power of messaging.

When used with react, it can enable components to receive and send messages. For more information on how to use with react pl check [jsmxq-react](https://github.com/ladder-b/jsmxq-react/), which is small glue between jsmxq and react.
Ancd also [jsmxq-react-todo](https://github.com/ladder-b/jsmxq-react-todo/

### Basics:
`jsmxq` provides Xchange and Subscriber classes to be used in an application.

Xchange takes care of storing received messages in a linked list and then sending them to desired listeners.
Xchange expects each message to contain a *subject* and *body*. it finds the subscribers interested in message subject and calls *onMessageReceive* function, thus users can process messages in this function. A user can create any number of Xchange objects in application.

Subscriber is the class which receives message from user objects, transformss them into desired format and forward to Xchange. Any class which desires to receive and send messages must extend Subscriber class. A Subscriber must subscribe to Xchange to take part in messaging.

### The code:
```
import Subscriber from "../src/Subscriber"
import Xchange from "../src/Xchange";
import ISubscriberObj from "../src/ISubscriberObj";

/*
 * Sub extends Subscribr class. Sub will take part in
 * messaging.
 */
class Sub extends Subscriber {
    msg: any;

    constructor(name: string) {
        super(name);
    }

    onMessageReceive(msg: Object) {
        console.log(msg);
    }
}

let xchange = new Xchange();

//create subscriber s1 with name SUB1
let s1 = new Sub("SUB1");
//s1 wants to receive messages with subject sub1
s1.addSubject("sub1");

//create subscriber s2 with name SUB2
let s2 = new Sub("SUB2");
//s2 wants to receive messages with subject sub2
s2.addSubject("sub2");

//s1 and s2 both subscribe to xchange
xchange.subscribe(s1);
xchange.subscribe(s2);

/*s1 send messages with subject sub2, which will be received by s2*/
for(let i=0; i<10; i++) {
    s1.post("sub2", "message from s1: "+i);
}

/*s2 send messages with subject sub2*/
for(let i=0; i<10; i++) {
    s2.post("sub1", "message from s2: "+i);
}

```