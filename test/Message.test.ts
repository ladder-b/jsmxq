import Message from '../src/Message'
import { gMsgCounter } from '../src/Message'
import { expect } from 'chai'

describe('Message tests', function() {    

    it('Message creation test', function() {
        let msg: Message = new Message("test-sub", {"msg":"hello"});
        expect(msg.getSubject()).to.equal("test-sub");
        let data: any = msg.getContent();
        expect(data.msg).to.equal("hello");
        expect(msg.uid).to.equal(gMsgCounter-1);
        expect(msg.getTtl()).to.equal(10);
        expect(msg.getSource()).to.equal("");
        expect(msg.getDst()).to.equal("");
        expect(msg.getSentTime()).to.equal(0);
        expect(msg.getDeleverTime()).to.equal(0);
    });
})
