import Xchange from "./Xchange";
import Message from "./Message";
import ISubscriberObj from './ISubscriberObj';

export default class Subscriber {
    name: string;
    uid: string;
    subjectList: Array<string>;
    msgSentCount: number;
    msgRecvdCount: number;
    subscriberObj: ISubscriberObj;
    xchange: Xchange;

    constructor(name: string) {
        this.name = name;
        this.uid = "0";
        this.subjectList = [];
        this.msgSentCount = 0;
        this.msgRecvdCount = 0;
    }

    getName(): string {
        return this.name;
    }

    getSubjectList(): Array<string> {
        return this.subjectList;
    }

    setCallbackObj(obj: ISubscriberObj) {
        this.subscriberObj = obj;
    }

    addSubject(subject: string) {
        this.subjectList.push(subject);
        if(this.xchange !== undefined) {
            this.xchange.subscribeToSubject(this, subject);
        }
    }

    setXchange(xchange: Xchange) {
        this.xchange = xchange; 
    }

    post(subject: string, data: Object, dst: string = undefined, ttl: number = 10) {
        if(this.xchange === undefined) {
            throw new Error("Error: subscriber not registered to any Exchange");
        }

        try {
            let msg: Message = new Message(subject, data);
            msg.setSendTime(Date.now());
            msg.setTtl(ttl);
            msg.setUid("0");
            this.xchange.post(msg);
            this.msgSentCount++;
        } catch(e) {
            console.log(e);
        }
    }

    __onMessageReceive(msg: Message) {
        this.msgRecvdCount++;

        if(this.subscriberObj !== undefined) {
            this.subscriberObj.onMessageReceive(msg);
        }
    }
}