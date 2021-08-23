import Xchange from "./Xchange";
import Message from "./Message";
import ISubscriberObj from './ISubscriberObj';
/**
 *Currently we use gSubscriberCounter to generate uid for subscriber.
 *It is incremented each time Subscriber object is created.
 */
export declare var gSubscriberCounter: number;
export default class Subscriber implements ISubscriberObj {
    name: string;
    uid: number;
    subjectList: Array<string | RegExp>;
    msgSentCount: number;
    msgRecvdCount: number;
    subscriberObj: ISubscriberObj;
    xchange: Xchange;
    constructor(name: string);
    /**
     *Returns name on subcriber. Currently is not used.
     *We may use it in future when source/destination based routing is implemented.
     */
    getName(): string;
    /**
     *Returns uid of subscriber.
     */
    getUid(): number;
    /**
     *Get list of subjects to which subscriber wants to receive message.
     */
    getSubjectList(): Array<string | RegExp>;
    /**
     *Returns total message count sent by this subscriber.
     */
    getMsgSentCount(): number;
    /**
     *Returns total message count received by this subscriber.
     */
    getMsgRecvdCount(): number;
    /**
     *By default, whenever a message is received, onMessageReceive(msg) function of subscriber is called.
     *If you register callback object using this function, onMessageReceive(msg) of that object will be called.
     *
     *@param obj - This object must have function onMessageReceive(msg)
     */
    setCallbackObj(obj: ISubscriberObj): void;
    /**
     *Add subject to the list of subjects of interest. Subject could be a string or JS regular expresion object.
     *
     * @param subject string|RegExp - subject to be added.
     */
    addSubject(subject: string | RegExp): void;
    /**
     *set exchange of this subscriber.
     *To be used internally only.
     */
    setXchange(xchange: Xchange): void;
    /**
     *post a message to registered Xchange.
     *
     * @param subject: string - The subject of message. When posting subject must a string only.
     * @param data: any - the data which will be posted. This data will be available at msg.content to receiver.
     * @param dst: string - specify destination to which data should be delivered. At present not used.
     * @param ttl: number - time to live. If message is not delivered, how much time should it live in system. At present not used.
     */
    post(subject: string, data: any, dst?: string, ttl?: number): void;
    /**
     *This function is called whenever a message it to be delivered.
     *Override this function in your parent object.
     *
     *@param msg: Message - msg to be delivered
     */
    onMessageReceive(msg: Message): void;
    /**
     *Used internally by Xchange to deliver message.
     *
     * *@param msg: Message - msg to be delivered
     */
    __onMessageReceive(msg: Message): void;
}
