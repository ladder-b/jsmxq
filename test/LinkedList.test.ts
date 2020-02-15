import LinkedList from '../src/LinkedList';

var assert = require('assert');

describe('LinkedList tests', function() {
  let ll = new LinkedList();
  let obj = { "msg": "Hello"};
    
  it('Size after inserting one object', function() {
    ll.push(obj);
    assert.equal(ll.getSize(), 1);
  });

  it('Size after removing one object', function() {
    ll.pop();
    assert.equal(ll.getSize(), 0);
  })

  it('Size after inserting 100 object', function() {
    for(let i=0; i<100; i++) {
      ll.push( {"i": i});
    }
    assert.equal(ll.getSize(), 100);
  });

  it('Size after removing 50 objects', function() {
    for(let i=0; i<50; i++) {
      ll.pop();
    }
    assert.equal(ll.getSize(), 50);
  })

  it('Validating 50 objects, first in last out', function() {
    for(let i=0; i<50; i++) {
      let o: any = ll.pop();
      assert.equal(ll.getSize(), 49-i );
      assert.equal(o.i, 49-i);
    }
  })

  it('Validating 50 objects, first in first out', function() {
    for(let i=0; i<50; i++) {
      ll.push( {"i": i});
    }
    for(let i=0; i<50; i++) {
      let o:any = ll.getHead();        
      assert.equal(ll.getSize(), 49-i);
      assert.equal(o.i, i);
    }
  })


  it('Testing remove by index', function() {
    for(let i=0; i<10; i++) {
      ll.push( {"i": i});
    }

    assert.equal(ll.getSize(), 10);
    ll.remove(0);
    assert.equal(ll.getSize(), 9);

    ll.remove(ll.getSize()-1);
    assert.equal(ll.getSize(), 8);

    ll.remove(5);
    assert.equal(ll.getSize(), 7);

    try {
      ll.remove(-1);
      assert.equal(0, 1);
    } catch{
      assert.equal(ll.getSize(), 7);
    }

    try {
      ll.remove(ll.getSize());
      assert.equal(0, 1);
    } catch{
      assert.equal(ll.getSize(), 7);
    }

    for(let i=0; i<7; i++) {
      ll.remove(0);
    }
    assert.equal(ll.getSize(), 0);
  })


  it('Testing random object retrieval', function() {
    for(let i=0; i<10; i++) {
      ll.push( {"i": i});
    }
    let o: any = ll.get(8);
    assert.equal(o.i, 8);
    assert.equal(ll.getSize(), 9);

    o = ll.get(3);
    assert.equal(o.i, 3);
    assert.equal(ll.getSize(), 8);

    o = ll.get(0);
    assert.equal(o.i, 0);
    assert.equal(ll.getSize(), 7);

    o = ll.get(ll.getSize() - 1);
    assert.equal(o.i, 9);
    assert.equal(ll.getSize(), 6);

    try {
      o = ll.get(-1);
      assert.equal(0, 1);
    } catch {
      assert.equal(ll.getSize(), 6);
    }
    
    try {
      o = ll.get(ll.getSize());
      assert.equal(0, 1);
    } catch {
      assert.equal(ll.getSize(), 6);
    }
    
  })
});