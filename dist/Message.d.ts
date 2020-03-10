export declare var gMsgCounter: number;
export default class Message {
    source: string;
    dst: string;
    subject: string;
    sendTime: number;
    deliverTime: number;
    ttl: number;
    uid: number;
    content: Object;
    constructor(subject: string, data: Object);
    getSource(): string;
    getDst(): string;
    getSubject(): string;
    getSendTime(): number;
    getDeleverTime(): number;
    getContent(): Object;
    getTtl(): number;
    getUid(): number;
    setDst(dst: string): void;
    setSource(src: string): void;
    setSendTime(time: number): void;
    setDeliverTime(time: number): void;
    setTtl(ttl: number): void;
    setUid(uid: number): void;
}
