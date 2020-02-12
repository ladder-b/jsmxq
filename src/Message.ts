export default class Message {

    source: string;
    dst: string;
    subject: string;
    sendTime: number;
    deliverTime: number;
    ttl: number;
    uid: string;
    content: Object;
    
    constructor(subject: string, data: Object) {
        this.ttl = 10;
        this.uid = "";
        this.subject = subject;
        this.content = data;
    }

    getSubject(): string {
        return this.subject;
    }

    getContent(): Object {
        return this.content;
    }

    setSendTime(time: number) {
        this.sendTime = time;
    }

    setDeliverTime(time: number) {
        this.deliverTime = time;
    }

    setTtl(ttl: number) {
        this.ttl = ttl;
    }

    setUid(uid: string) {
        this.uid = uid;
    }   
}