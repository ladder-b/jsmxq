import Subscriber from '../src/Subscriber'
import { gSubscriberCounter } from '../src/Subscriber'
import { expect } from 'chai'

describe('Subscriber tests', function() {    

    it('Subscriber creation test', function() {
        let subs: Subscriber = new Subscriber("test-name");
        expect(subs.getName()).to.equal("test-name");
        expect(subs.getUid()).to.equal(gSubscriberCounter - 1);

        subs.addSubject("test-sub1");
        subs.addSubject("test-sub2");
        let subList = subs.getSubjectList();
        expect(subList.length).to.equal(2);
        expect(subList).to.eql(["test-sub1", "test-sub2"]);

        expect(() => subs.post("test-sub1", {'msg': 'hello'})).to.throw("Error");
        let dummyXchange: any = { 'post': (msg: any) => { subs.__onMessageReceive(msg)}};
        subs.setXchange(dummyXchange);
        subs.post("test-sub1", {'msg': 'hello'});
        expect(subs.getMsgSentCount()).to.equal(1);
        expect(subs.getMsgRecvdCount()).to.equal(1);
    });
})