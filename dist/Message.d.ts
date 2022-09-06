export declare var gMsgCounter: number;
export default class Message {
    source: string;
    dst: string;
    subject: string;
    sentTime: number;
    deliverTime: number;
    ttl: number;
    uid: number;
    content: any;
    onMessageSent?: (result?: any) => void | undefined;
    constructor(subject: string, data: any);
    getSource(): string;
    getDst(): string;
    getSubject(): string;
    getSentTime(): number;
    getDeleverTime(): number;
    getContent(): any;
    getTtl(): number;
    getUid(): number;
    setDst(dst: string): void;
    setSource(src: string): void;
    setSentTime(time: number): void;
    setDeliverTime(time: number): void;
    setTtl(ttl: number): void;
    setUid(uid: number): void;
}
