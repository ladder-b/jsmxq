import LinkedList from "./LinkedList";
import Message from "./Message";
import Subscriber from "./Subscriber";
/**
 *Regular expression subscriber.
 *Subscribers those have REs as subject.
 *TBD put it it separate file.
 */
declare class ReSubscriber {
    re: RegExp;
    subscriberList: Array<Subscriber>;
    constructor(re: RegExp);
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
    constructor();
    /**
     *@returns Returns Map<string, Array<subscriber>>
     */
    getSubscriberMap(): Map<string, Array<Subscriber>>;
    /**
     *Return list of subscribers to a subject.
     *This function returns subscribers those have subject as string only.
     *The subscribers interested in RE subjects are not returned by this function.
     *
     * @param subject: string
     */
    getSubscriberList(subject: string): Array<Subscriber>;
    /**
     *This function adds subscriber to the list of subscribers.
     *@param subscriber: Subscriber - The subscriber to be added
     *@param subject: string|RegExp - The subject in which subscriber is interested.
     */
    subscribeToSubject(subscriber: Subscriber, subject: string | RegExp): void;
    /**
     *This function registers subscriber and adds it to desired subjects.
     *This function must be called before calling any other function of Xchange.
     *@param subscriber: Subscriber
     */
    subscribe(subscriber: Subscriber): void;
    /**
     *Remove subscriber from subject's subscriber list.
     *@param subscriber: Subscriber - the subscriber which should be removed.
     *@param subject: string|RegExp - the subject
     */
    unsubscribeToSubject(subscriber: Subscriber, subject: string | RegExp): void;
    /**
     *Unregister subscriber from Xchange. After this call subscriber will not be able to take part
     *in messaging.
     *@param subscriber: Subscriber - the subscriber to be removed.
     */
    unsubscribe(subscriber: Subscriber): void;
    /**
     *post message in this exchange. Message received is immediately processed for delivery, hence
     *at this moment message reception and delevery is synchrosous.
     *
     * @param msg; Message - message to be posted.
     */
    post(msg: Message): void;
    /**
     *Send a message wrt RE subscribers.
     *msg subject is compared with each ReSubscriber and if found matching msg is delivered.
     *This function is used internally by send(msg).
     *
     *@param msg: Message = message to be send.
     */
    sendRe(msg: Message): void;
    /**
     *Based on message subject send it to its desired recipients.
     *
     *@param msg: Message - message to be send.
     */
    send(msg: Message): void;
    /**
     *Process messages in q.
     *Currently this function is called as soon as a message is received.
     */
    run(): void;
}
export {};
