import LinkedList, { LLObj } from "./LinkedList"
import Message from "./Message"
import Subscriber from "./Subscriber"

/**
 *Regular expression subscriber.
 *Subscribers those have REs as subject.
 *TBD put it it separate file.
 */
class ReSubscriber {
    re: RegExp;
    subscriberList: Array<Subscriber>;

    constructor(re: RegExp) {
        this.re = re;
        this.subscriberList = [];
    }
}

/**
 *Xchange provides following functionalities
 * 1. Register subscribers
 * 2. Receive messages and based on message subject send them to interested subscribers.
 * 
 * Subscribers can use string or regular expression as subject. Subscribers with string as subject 
 * are stored in a js Map<subject, subscriber>.
 * Subscribers with RE as subject are stored in ReSubscribers.
 * A subscriber can show interest in any number of subjects with mix of string/RE.
 */
export default class Xchange {

    /**map to store subscribers with string as subject*/
    subscriberMap: Map<string, Array<Subscriber>>;
    /**ReSubscribers to store subscribers with RE as subject*/
    reSubscribers: Array<ReSubscriber>;
    /**In coming messages are stored in msgQ.*/
    msgQ: LinkedList;

    constructor() {
        /**map<subject, subscribers<Array>> */
        this.subscriberMap = new Map();
        /**subscribers to subject regular expression*/
        this.reSubscribers = [];
        /**linked list of messages to be processed*/
        this.msgQ = new LinkedList();
    }

    /**
     *@returns Returns Map<string, Array<subscriber>>
     */
    getSubscriberMap(): Map<string, Array<Subscriber>> {
        return this.subscriberMap;
    }

    /**
     *Return list of subscribers to a subject.
     *This function returns subscribers those have subject as string only.
     *The subscribers interested in RE subjects are not returned by this function.
     *
     * @param subject: string
     */
    getSubscriberList(subject: string): Array<Subscriber> {
        if(typeof(subject) === 'string' ) {
            return this.subscriberMap.get(subject);
        }
    }

    /**
     *This function adds subscriber to the list of subscribers.
     *@param subscriber: Subscriber - The subscriber to be added
     *@param subject: string|RegExp - The subject in which subscriber is interested.
     */
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

    /**
     *This function registers subscriber and adds it to desired subjects.
     *This function must be called before calling any other function of Xchange.
     *@param subscriber: Subscriber
     */
    subscribe(subscriber: Subscriber) {
        if(subscriber.getName() === undefined) {
            throw new Error("Error: Subscriber name not supplied");
        }
    
        /**Subscriber without subject is also accepted. Such subscribers can only send messages*/
        if(subscriber.subjectList && subscriber.subjectList.length > 0) {
            subscriber.subjectList.forEach(subject => {
                this.subscribeToSubject(subscriber, subject);
            })
        }
       
        subscriber.setXchange(this);
    }

    /**
     *Remove subscriber from subject's subscriber list.
     *If number of subcribers to a subject become zero, that subject is removed
     *from subscribersMap.
     *@param subscriber: Subscriber - the subscriber which should be removed.
     *@param subject: string|RegExp - the subject
     */
    unsubscribeToSubject(subscriber: Subscriber, subject: string | RegExp) {
        if(typeof(subject) === 'string') {
            let list: Array<Subscriber> = this.getSubscriberList(subject);
                        
            if (list !== undefined) {
                let idx: number = list.indexOf(subscriber);
                if( idx >= 0) {
                    list.splice(idx, 1);
                    if(list.length === 0) {
                        this.subscriberMap.delete(subject);
                    }
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

    /**
     *Unregister subscriber from Xchange. After this call subscriber will not be able to take part
     *in messaging.
     *@param subscriber: Subscriber - the subscriber to be removed.
     */
    unsubscribe(subscriber: Subscriber) {
        if(subscriber.getName() === undefined || subscriber.getSubjectList() === undefined) {
            throw new Error("Error: Subscriber parameter error, either name or subect is undefined");
        }
     
        subscriber.subjectList.forEach(subject => {
            this.unsubscribeToSubject(subscriber, subject);
        })
       
        subscriber.setXchange(undefined);
    }

    /**
     *post message in this exchange. Message received is immediately processed for delivery, hence
     *at this moment message reception and delevery is synchrosous.
     *
     * @param msg; Message - message to be posted.
     */
    post(msg: Message) {
        this.msgQ.push(msg);
        this.run();
    }

    /**
     *Send a message wrt RE subscribers.
     *msg subject is compared with each ReSubscriber and if found matching msg is delivered.
     *This function is used internally by send(msg).
     *
     *@param msg: Message = message to be send.
     */
    sendRe(msg: Message) {
        this.reSubscribers.map( (resub) => {
            if(resub.re.test(msg.subject)) {
                msg.setDeliverTime(Date.now());
                resub.subscriberList.map(subscriber => subscriber.__onMessageReceive(msg));
            }
        })
    }

    /**
     *Based on message subject send it to its desired recipients.
     *
     *@param msg: Message - message to be send.
     */
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

    /**
     *Process messages in q.
     *Currently this function is called as soon as a message is received.
     */
    run() {
        while(this.msgQ.getSize() > 0) {
            let msg: Message = this.msgQ.pop() as Message;
            this.send(msg);
        }
    }
}