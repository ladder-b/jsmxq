import LinkedList, { LLObj } from "./LinkedList"
import Message from "./Message"
import Subscriber from "./Subscriber"

/*
 *Regular expression subscriber.
 *Subscribers those have REs as subject.
 */
class ReSubscriber {
    re: RegExp;
    subscriberList: Array<Subscriber>;

    constructor(re: RegExp) {
        this.re = re;
        this.subscriberList = [];
    }
}

export default class Xchange {

    subscriberMap: Map<string, Array<Subscriber>>;
    reSubscribers: Array<ReSubscriber>;
    msgQ: LinkedList;

    constructor() {
        /* map<subject, subscribers<Array>> */
        this.subscriberMap = new Map();
        /* subscribers to subject regular expression*/
        this.reSubscribers = [];
        /* linked list of messages to be processed*/
        this.msgQ = new LinkedList();
    }

    getSubscriberMap(): Map<string, Array<Subscriber>> {
        return this.subscriberMap;
    }

    /*return list of subscribers to a subject*/
    getSubscriberList(subject: string): Array<Subscriber> {
        if(typeof(subject) === 'string' ) {
            return this.subscriberMap.get(subject);
        }
    }

    subscribeToSubject(subscriber: Subscriber, subject: string | RegExp) {        
        if( typeof subject === 'string') {            
            let list: Array<Subscriber> = this.getSubscriberList(subject);
            if (list === undefined) {
                list = [];
                this.subscriberMap.set(subject, list);
            }
            if(list.indexOf(subscriber) === -1) {
                list.push(subscriber);
            }
        } else if(subject instanceof RegExp) {
            let resub = this.reSubscribers.find( resub => resub.re.toString() === subject.toString());
            if (resub === undefined) {
                resub = new ReSubscriber(subject);
                resub.subscriberList.push(subscriber);
                this.reSubscribers.push(resub);
            } else if(resub.subscriberList.indexOf(subscriber) === -1) {
                resub.subscriberList.push(subscriber);      
            }
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

    unsubscribeToSubject(subscriber: Subscriber, subject: string | RegExp) {
        if(typeof(subject) === 'string') {
            let list: Array<Subscriber> = this.getSubscriberList(subject);
                        
            if (list !== undefined) {
                let idx: number = list.indexOf(subscriber);
                if( idx >= 0) {
                    list.splice(idx, 1);
                }
            }
        } else if(subject instanceof RegExp) {
            let resub = this.reSubscribers.find( resub => resub.re.toString() === subject.toString());
            if (resub !== undefined) {
                let idx = resub.subscriberList.indexOf(subscriber);
                if( idx >= 0) {
                    resub.subscriberList.splice(idx, 1);
                }
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

    sendRe(msg: Message) {
        this.reSubscribers.map( (resub) => {
            if(resub.re.test(msg.subject)) {
                msg.setDeliverTime(Date.now());
                resub.subscriberList.map(subscriber => subscriber.__onMessageReceive(msg));
            }
        })
    }

    send(msg: Message) {
        if(msg.getSubject() === undefined) {
            throw new Error("Error: message subject is undefined");
        }
        /*Send message based on string subjects*/
        let list: Array<Subscriber> = this.getSubscriberList(msg.getSubject());
        if(list !== undefined) {
            list.forEach(subscriber => {
                msg.setDeliverTime(Date.now());
                subscriber.__onMessageReceive(msg);
            });
        }

        /*Send message based on RegExp subjects*/
        this.sendRe(msg);
    }

    run() {
        while(this.msgQ.getSize() > 0) {
            let msg: Message = this.msgQ.pop() as Message;
            this.send(msg);
        }
    }
}