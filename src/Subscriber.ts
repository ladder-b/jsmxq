import Xchange from "./Xchange";
import Message from "./Message";
import ISubscriberObj from './ISubscriberObj';

/**
 *Currently we use gSubscriberCounter to generate uid for subscriber.
 *It is incremented each time Subscriber object is created.
 */
export var gSubscriberCounter: number = 0;

export default class Subscriber implements ISubscriberObj {
    name: string;
    uid: number;
    subjectList: Array<string | RegExp>;
    msgSentCount: number;
    msgRecvdCount: number;
    subscriberObj: ISubscriberObj;
    xchange: Xchange | undefined;

    constructor(name: string) {
        /**Name of subscriber. In future may be used to implement src/dst based message rules */
        this.name = name;
        /**Unique Id for each subscriber object*/
        this.uid = gSubscriberCounter;
        gSubscriberCounter++;
        /**Subject list of interest */
        this.subjectList = [];
        /**Total messages sent by us */
        this.msgSentCount = 0;
        /**Total messages received by us */
        this.msgRecvdCount = 0;
        /**Object whose onMessageReceive will be called */
        this.subscriberObj = this;
    }

    /**
     *Returns name on subcriber. Currently is not used.
     *We may use it in future when source/destination based routing is implemented.
     */
    getName(): string {
        return this.name;
    }

    /**
     *Returns uid of subscriber.
     */
    getUid(): number {
        return this.uid;
    }

    /**
     *Get list of subjects to which subscriber wants to receive message.
     */
    getSubjectList(): Array<string | RegExp> {
        return this.subjectList;
    }

    /**
     *Returns total message count sent by this subscriber.
     */
    getMsgSentCount(): number {
        return this.msgSentCount;
    }
     
    /**
     *Returns total message count received by this subscriber.
     */
    getMsgRecvdCount(): number {
        return this.msgRecvdCount;
    }

    /**
     *By default, whenever a message is received, onMessageReceive(msg) function of subscriber is called.
     *If you register callback object using this function, onMessageReceive(msg) of that object will be called.
     *
     *@param obj - This object must have function onMessageReceive(msg)
     */
    setCallbackObj(obj: ISubscriberObj) {
        this.subscriberObj = obj;
    }

    /**
     *Add subject to the list of subjects of interest. Subject could be a string or JS regular expresion object.
     *
     * @param subject string|RegExp - subject to be added.
     */
    addSubject(subject: string | RegExp) {
        this.subjectList.push(subject);
        if(this.xchange !== undefined) {
            this.xchange.subscribeToSubject(this, subject);
        }
    }

    /**
     * unsubscribe from xchange.
     */
    unsubscribe() {
      if(this.xchange !== undefined) {
        this.xchange.unsubscribe(this);
      }
    }

    /**
     * remove subejct.
     */
    removeSubject(subject: string | RegExp) {
      this.xchange.unsubscribeToSubject(this, subject);
    }

    /**
     *set exchange of this subscriber.
     *To be used internally only.
     */
    setXchange(xchange: Xchange) {
        this.xchange = xchange; 
    }

    /**
     *post a message to registered Xchange.
     *
     * @param subject: string - The subject of message. When posting subject must a string only.
     * @param data: any - the data which will be posted. This data will be available at msg.content to receiver.
     * @param dst: string - specify destination to which data should be delivered. At present not used.
     * @param ttl: number - time to live. If message is not delivered, how much time should it live in system. At present not used.
     */
    post(subject: string, data: any, dst: string = undefined, ttl: number = 10) {
        if(this.xchange === undefined) {
            throw new Error("Error: subscriber not registered to any Exchange");
        }

        try {
            let msg: Message = new Message(subject, data);
            msg.setSentTime(Date.now());
            msg.setTtl(ttl);
            msg.setDst(dst);
            msg.setSource(this.getName());
            this.xchange.post(msg);
            this.msgSentCount++;
        } catch(e) {
            throw(e);
        }
    }

    /**
     *This function is called whenever a message it to be delivered.
     *Override this function in your parent object.
     *
     *@param msg: Message - msg to be delivered
     */
    onMessageReceive(msg: Message) {
    }

    /**
     *Used internally by Xchange to deliver message.
     *
     * *@param msg: Message - msg to be delivered
     */
    __onMessageReceive(msg: Message) {
        this.msgRecvdCount++;

        if(this.subscriberObj !== undefined) {
            this.subscriberObj.onMessageReceive(msg);
        }
    }
}
