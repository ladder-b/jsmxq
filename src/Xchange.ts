import LinkedList, { LLObj } from "./LinkedList"
import Message from "./Message"
import Subscriber from "./Subscriber"

export default class Xchange {

    subscriberMap: Map<string, Array<Subscriber>>;
    msgQ: LinkedList;

    constructor() {
        /* map<subject, subscribers<Array>> */
        this.subscriberMap = new Map();
        /* linked list of messages to be processed*/
        this.msgQ = new LinkedList();
    }

    getSubscriberMap(): Map<string, Array<Subscriber>> {
        return this.subscriberMap;
    }

    /*return list of subscribers to a subject*/
    getSubscriberList(subject: string): Array<Subscriber> {
        return this.subscriberMap.get(subject);
    }

    subscribeToSubject(subscriber: Subscriber, subject: string) {
        let list: Array<Subscriber> = this.getSubscriberList(subject);
        if (list === undefined) {
            list = [];
            this.subscriberMap.set(subject, list);
        }
        if(list.indexOf(subscriber) === -1) {
            list.push(subscriber);
        }
    }

    subscribe(subscriber: Subscriber) {
        if(subscriber.getName() === undefined || subscriber.getSubjectList() === undefined) {
            throw new Error("Error: Subscriber parameter error, either name or subect is undefined");
        }
     
        subscriber.subjectList.forEach(subject => {
            this.subscribeToSubject(subscriber, subject);
        })
       
        subscriber.setXchange(this);
    }

    unsubscribeToSubject(subscriber: Subscriber, subject: string) {
        let list: Array<Subscriber> = this.getSubscriberList(subject);
        if (list !== undefined) {
            let idx: number = list.indexOf(subscriber);
            if( idx >= 0) {
                this.subscriberMap.set(subject, list.splice(idx, 1));
            }
        }
    }

    unsubscribe(subscriber: Subscriber) {
        if(subscriber.getName() === undefined || subscriber.getSubjectList() === undefined) {
            throw new Error("Error: Subscriber parameter error, either name or subect is undefined");
        }
     
        subscriber.subjectList.forEach(subject => {
            this.unsubscribeToSubject(subscriber, subject);
        })
       
        subscriber.setXchange(undefined);
    }

    post(msg: Message) {
        this.msgQ.push(msg);
        this.run();
    }

    send(msg: Message) {
        if(msg.getSubject() === undefined) {
            throw new Error("Error: message subject is undefined");
        }
        let list: Array<Subscriber> = this.getSubscriberList(msg.getSubject());
        if(list !== undefined) {
            list.forEach(subscriber => {
                msg.setDeliverTime(Date.now());
                subscriber.__onMessageReceive(msg);
            });
        }
    }

    run() {
        while(this.msgQ.getSize() > 0) {
            let msg: Message = this.msgQ.pop() as Message;
            this.send(msg);
        }
    }

}