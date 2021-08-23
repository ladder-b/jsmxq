export var gMsgCounter: number = 0;

export default class Message {

    source: string;
    dst: string;
    subject: string;
    sendTime: number;
    deliverTime: number;
    ttl: number;
    uid: number;
    content: any;
    
    constructor(subject: string, data: any) {
        this.ttl = 10;
        this.uid = gMsgCounter;
        gMsgCounter++;
        this.subject = subject;
        this.content = data;
    }

    getSource(): string {
        return this.source;
    }

    getDst(): string {
        return this.dst;
    }

    getSubject(): string {
        return this.subject;
    }

    getSendTime(): number {
        return this.sendTime;
    }

    getDeleverTime(): number {
        return this.deliverTime;
    }

    getContent(): any {
        return this.content;
    }

    getTtl(): number {
        return this.ttl;
    }

    getUid(): number {
        return this.uid;
    }

    setDst(dst: string) {
        this.dst = dst;
    }

    setSource(src: string) {
        this.source = src;
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

    setUid(uid: number) {
        this.uid = uid;
    }   
}
