export var gMsgCounter: number = 0;

export default class Message {

    source: string;
    dst: string;
    subject: string;
    sentTime: number;
    deliverTime: number;
    ttl: number;
    uid: number;
    content: any;
    /*callback function, if set, will be called after msg is sent*/
    onMessageSent?: (result?: any) => void | undefined;
    
    constructor(subject: string, data: any) {
        this.ttl = 10;
        this.uid = gMsgCounter;
        gMsgCounter++;
        this.subject = subject;
        this.content = data;
        this.source = "";
        this.dst = "";
        this.sentTime = 0;
        this.deliverTime = 0;
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

    getSentTime(): number {
        return this.sentTime;
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
    
    setSentTime(time: number) {
        this.sentTime = time;
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
