import Subscriber from "../src/Subscriber"
import Xchange from "../src/Xchange";
import ISubscriberObj from "../src/ISubscriberObj";
import { expect } from 'chai';
import Message from "../src/Message";

class Sub extends Subscriber implements ISubscriberObj {

    msg: any;

    constructor(name: string) {
        super(name);
    }

    async onMessageReceive(msg: Message) {
        this.msg = msg;
    }
}

class SubWithCallback extends Subscriber implements ISubscriberObj {

    msg: any;

    constructor(name: string) {
        super(name);
    }

    resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 2000);
        });
    }

    async onMessageReceive(msg: Message) {
        this.msg = msg;
        console.log("callback should be called after two seconds");
        await this.resolveAfter2Seconds();
        msg.onMessageSent && msg.onMessageSent("msg from callback");
    }
}

function test_xchange(withCallbackObj = false) {
    let xchange = new Xchange();

    let s1 = new Sub("SUB1");
    if(withCallbackObj) {
        s1.setCallbackObj(s1);
    }
    s1.addSubject("sub1");

    let s2 = new Sub("SUB2");
    if(withCallbackObj) {
        s2.setCallbackObj(s2);
    }
    s2.addSubject("sub2");

    let subMap: Map<string, Array<Subscriber>> = xchange.getSubscriberMap();
    expect(subMap.size).to.equal(0);

    xchange.subscribe(s1);
    xchange.subscribe(s2);

    subMap = xchange.getSubscriberMap();
    expect(subMap.size).to.equal(2);

    let sub1Subscribers = xchange.getSubscriberList("sub1");
    let sub2Subscribers = xchange.getSubscriberList("sub2");
    expect(sub1Subscribers.length).to.equal(1);
    expect(sub1Subscribers).to.eql([s1]);
    expect(sub2Subscribers.length).to.equal(1);
    expect(sub2Subscribers).to.eql([s2]);

    /*send messages from s1 to s2*/
    for(let i=0; i<10; i++) {
        s1.post("sub2", "message from s1: "+i);
    }
    expect(s1.getMsgSentCount()).to.equal(10);
    expect(s2.getMsgRecvdCount()).to.equal(10);

    /*send messages from s2 to s1*/
    for(let i=0; i<10; i++) {
        s2.post("sub1", "message from s2: "+i);
    }
    expect(s2.getMsgSentCount()).to.equal(10);
    expect(s1.getMsgRecvdCount()).to.equal(10);

    s1.post("sub2", "message from s1");
    s2.post("sub1", "message from s2");
    expect(s1.msg.getContent()).to.equal("message from s2");
    expect(s2.msg.getContent()).to.equal("message from s1");


    /*now remove subscriber and test*/
    xchange.unsubscribe(s2);
    s1.post("sub2", "message from s1 after unsubscribe");
    expect(s1.getMsgSentCount()).to.equal(12);
    expect(s2.getMsgRecvdCount()).to.equal(11);
    expect(s2.msg.getContent()).to.equal("message from s1");
    expect(s1.msg.getContent()).to.equal("message from s2");
    subMap = xchange.getSubscriberMap();
    expect(subMap.size).to.equal(1);

    /*TBD routing messages based on dst*/
}

function test_xchange_re(withCallbackObj = false) {
    let xchange = new Xchange();

    let s1 = new Sub("SUB1");
    if(withCallbackObj) {
        s1.setCallbackObj(s1);
    }
    s1.addSubject(/sub1\B/);

    let s2 = new Sub("SUB2");
    if(withCallbackObj) {
        s2.setCallbackObj(s2);
    }
    s2.addSubject(/sub2\B/);

    xchange.subscribe(s1);
    xchange.subscribe(s2);

    /*send messages from s1 to s2*/
    s1.post("sub2_cmd", "message from s1");
    expect(s1.getMsgSentCount()).to.equal(1);
    expect(s2.getMsgRecvdCount()).to.equal(1);
    expect(s2.msg.getContent()).to.equal("message from s1");
    expect(s1.msg).to.equal(undefined);

    /*send messages from s1 with unknown subject*/
    s1.post("sub3_cmd", "message from s1");
    expect(s1.getMsgSentCount()).to.equal(2);
    expect(s2.getMsgRecvdCount()).to.equal(1);
    expect(s2.msg.getContent()).to.equal("message from s1");
    expect(s1.msg).to.equal(undefined);

    /*send messages from s2 to s1*/
    s2.post("sub1_cmd", "message from s2");
    expect(s2.getMsgSentCount()).to.equal(1);
    expect(s1.getMsgRecvdCount()).to.equal(1);
    expect(s2.msg.getContent()).to.equal("message from s1");
    expect(s1.msg.getContent()).to.equal("message from s2");

    /*send messages from s2 with unknown subject*/
    s2.post("sub3_cmd", "message from s2");
    expect(s2.getMsgSentCount()).to.equal(2);
    expect(s1.getMsgRecvdCount()).to.equal(1);
    expect(s2.msg.getContent()).to.equal("message from s1");
    expect(s1.msg.getContent()).to.equal("message from s2");

    /*now remove subscriber and test*/
    xchange.unsubscribe(s2);
    s1.post("sub2_cmd", "message from s1 after unsubscribe");
    expect(s1.getMsgSentCount()).to.equal(3);
    expect(s2.getMsgRecvdCount()).to.equal(1);
    expect(s2.msg.getContent()).to.equal("message from s1");
    expect(s1.msg.getContent()).to.equal("message from s2");
}

let gCallbackTimer: number = 0;
/*when posting a message, a callback can be supplied which will be called after message is sent*/
function test_xchange_callback() {
    let xchange = new Xchange();

    let s1 = new SubWithCallback("SUB1");
    s1.addSubject("sub1");

    let s2 = new SubWithCallback("SUB2");
    s2.addSubject("sub2");

    let subMap: Map<string, Array<Subscriber>> = xchange.getSubscriberMap();
    expect(subMap.size).to.equal(0);

    xchange.subscribe(s1);
    xchange.subscribe(s2);

    subMap = xchange.getSubscriberMap();
    expect(subMap.size).to.equal(2);

    let sub1Subscribers = xchange.getSubscriberList("sub1");
    let sub2Subscribers = xchange.getSubscriberList("sub2");
    expect(sub1Subscribers.length).to.equal(1);
    expect(sub1Subscribers).to.eql([s1]);
    expect(sub2Subscribers.length).to.equal(1);
    expect(sub2Subscribers).to.eql([s2]);

    
    setTimeout( () => gCallbackTimer=2000, 2000);
    s1.post("sub2", "message from s1: ", undefined, (result: string) => {
        expect(result).to.equal("msg from callback");
        expect(gCallbackTimer).to.equal(2000);
    });
}

describe("Xchange tests", function() {

    it("Xchange functionality test", function() {
        test_xchange();
    });

    it("Xchange functionality test with callback obj", function() {
        test_xchange( true );
    });

    it("Xchange functionality test: RE subject", function() {
        test_xchange_re();
    });

    it("Xchange functionality test: onMessageSent() callback", () => {
        test_xchange_callback();
    })
})
