(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsmxq"] = factory();
	else
		root["jsmxq"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/LinkedList.ts":
/*!***************************!*\
  !*** ./src/LinkedList.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class LLObj {
    constructor(obj, number = 0, priority = 0) {
        this.number = number;
        this.priority = priority;
        this.obj = obj;
    }
}
exports.LLObj = LLObj;
class LinkedList {
    constructor() {
        this.size = 0;
    }
    getSize() {
        return this.size;
    }
    push(obj) {
        let llObj = new LLObj(obj, this.size);
        if (this.size === 0) {
            this.head = llObj;
        }
        else {
            this.tail.next = llObj;
            llObj.prev = this.tail;
        }
        this.size++;
        this.tail = llObj;
    }
    removeLLObj(obj) {
        if (obj.prev !== undefined) {
            obj.prev.next = obj.next;
        }
        if (obj.next !== undefined) {
            obj.next.prev = obj.prev;
        }
        this.size--;
    }
    remove(idx) {
        this.removeLLObj(this.getLLObj(idx));
    }
    /*get LLObj object from anywhere in list*/
    getLLObj(idx) {
        if (idx < 0 || idx >= this.size) {
            throw new Error("Error: invalid index");
        }
        let obj;
        if (idx < this.size / 2) {
            obj = this.head;
            for (let i = 0; i < idx; i++) {
                obj = obj.next;
            }
        }
        else {
            obj = this.tail;
            for (let i = this.size - 1; i > idx; i--) {
                obj = obj.prev;
            }
        }
        return obj;
    }
    get(idx) {
        let llobj = this.getLLObj(idx);
        this.removeLLObj(llobj);
        return llobj.obj;
    }
    getHead() {
        if (this.size > 0) {
            let obj = this.head.obj;
            this.head = this.head.next;
            this.size--;
            if (this.head) {
                this.head.prev = undefined;
            }
            return obj;
        }
        throw new Error("No objects in list");
    }
    pop() {
        if (this.size > 0) {
            this.size--;
            let obj = this.tail;
            this.tail = obj.prev;
            if (this.tail !== undefined) {
                this.tail.next = undefined;
            }
            obj.prev = undefined;
            obj.next = undefined;
            return obj.obj;
        }
        else {
            throw new Error("Error pop() operation: Linked list in empty");
        }
    }
}
exports.default = LinkedList;


/***/ }),

/***/ "./src/Message.ts":
/*!************************!*\
  !*** ./src/Message.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gMsgCounter = 0;
class Message {
    constructor(subject, data) {
        this.ttl = 10;
        this.uid = exports.gMsgCounter;
        exports.gMsgCounter++;
        this.subject = subject;
        this.content = data;
    }
    getSource() {
        return this.source;
    }
    getDst() {
        return this.dst;
    }
    getSubject() {
        return this.subject;
    }
    getSendTime() {
        return this.sendTime;
    }
    getDeleverTime() {
        return this.deliverTime;
    }
    getContent() {
        return this.content;
    }
    getTtl() {
        return this.ttl;
    }
    getUid() {
        return this.uid;
    }
    setDst(dst) {
        this.dst = dst;
    }
    setSource(src) {
        this.source = src;
    }
    setSendTime(time) {
        this.sendTime = time;
    }
    setDeliverTime(time) {
        this.deliverTime = time;
    }
    setTtl(ttl) {
        this.ttl = ttl;
    }
    setUid(uid) {
        this.uid = uid;
    }
}
exports.default = Message;


/***/ }),

/***/ "./src/Subscriber.ts":
/*!***************************!*\
  !*** ./src/Subscriber.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __webpack_require__(/*! ./Message */ "./src/Message.ts");
exports.gSubscriberCounter = 0;
class Subscriber {
    constructor(name) {
        this.name = name;
        this.uid = exports.gSubscriberCounter;
        exports.gSubscriberCounter++;
        this.subjectList = [];
        this.msgSentCount = 0;
        this.msgRecvdCount = 0;
    }
    getName() {
        return this.name;
    }
    getUid() {
        return this.uid;
    }
    getSubjectList() {
        return this.subjectList;
    }
    getMsgSentCount() {
        return this.msgSentCount;
    }
    getMsgRecvdCount() {
        return this.msgRecvdCount;
    }
    setCallbackObj(obj) {
        this.subscriberObj = obj;
    }
    addSubject(subject) {
        this.subjectList.push(subject);
        if (this.xchange !== undefined) {
            this.xchange.subscribeToSubject(this, subject);
        }
    }
    setXchange(xchange) {
        this.xchange = xchange;
    }
    post(subject, data, dst = undefined, ttl = 10) {
        if (this.xchange === undefined) {
            throw new Error("Error: subscriber not registered to any Exchange");
        }
        try {
            let msg = new Message_1.default(subject, data);
            msg.setSendTime(Date.now());
            msg.setTtl(ttl);
            msg.setDst(dst);
            msg.setSource(this.getName());
            this.xchange.post(msg);
            this.msgSentCount++;
        }
        catch (e) {
            throw (e);
        }
    }
    __onMessageReceive(msg) {
        this.msgRecvdCount++;
        if (this.subscriberObj !== undefined) {
            this.subscriberObj.onMessageReceive(msg);
        }
    }
}
exports.default = Subscriber;


/***/ }),

/***/ "./src/Xchange.ts":
/*!************************!*\
  !*** ./src/Xchange.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = __webpack_require__(/*! ./LinkedList */ "./src/LinkedList.ts");
class Xchange {
    constructor() {
        /* map<subject, subscribers<Array>> */
        this.subscriberMap = new Map();
        /* linked list of messages to be processed*/
        this.msgQ = new LinkedList_1.default();
    }
    getSubscriberMap() {
        return this.subscriberMap;
    }
    /*return list of subscribers to a subject*/
    getSubscriberList(subject) {
        return this.subscriberMap.get(subject);
    }
    subscribeToSubject(subscriber, subject) {
        let list = this.getSubscriberList(subject);
        if (list === undefined) {
            list = [];
            this.subscriberMap.set(subject, list);
        }
        if (list.indexOf(subscriber) === -1) {
            list.push(subscriber);
        }
    }
    subscribe(subscriber) {
        if (subscriber.getName() === undefined || subscriber.getSubjectList() === undefined) {
            throw new Error("Error: Subscriber parameter error, either name or subect is undefined");
        }
        subscriber.subjectList.forEach(subject => {
            this.subscribeToSubject(subscriber, subject);
        });
        subscriber.setXchange(this);
    }
    unsubscribeToSubject(subscriber, subject) {
        let list = this.getSubscriberList(subject);
        if (list !== undefined) {
            let idx = list.indexOf(subscriber);
            if (idx >= 0) {
                this.subscriberMap.set(subject, list.splice(idx, 1));
            }
        }
    }
    unsubscribe(subscriber) {
        if (subscriber.getName() === undefined || subscriber.getSubjectList() === undefined) {
            throw new Error("Error: Subscriber parameter error, either name or subect is undefined");
        }
        subscriber.subjectList.forEach(subject => {
            this.unsubscribeToSubject(subscriber, subject);
        });
        subscriber.setXchange(undefined);
    }
    post(msg) {
        this.msgQ.push(msg);
        this.run();
    }
    send(msg) {
        if (msg.getSubject() === undefined) {
            throw new Error("Error: message subject is undefined");
        }
        let list = this.getSubscriberList(msg.getSubject());
        if (list !== undefined) {
            list.forEach(subscriber => {
                msg.setDeliverTime(Date.now());
                subscriber.__onMessageReceive(msg);
            });
        }
    }
    run() {
        while (this.msgQ.getSize() > 0) {
            let msg = this.msgQ.pop();
            this.send(msg);
        }
    }
}
exports.default = Xchange;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Subscriber_1 = __webpack_require__(/*! ./Subscriber */ "./src/Subscriber.ts");
exports.Subscriber = Subscriber_1.default;
const Xchange_1 = __webpack_require__(/*! ./Xchange */ "./src/Xchange.ts");
exports.Xchange = Xchange_1.default;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc214cS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vanNteHEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNteHEvLi9zcmMvTGlua2VkTGlzdC50cyIsIndlYnBhY2s6Ly9qc214cS8uL3NyYy9NZXNzYWdlLnRzIiwid2VicGFjazovL2pzbXhxLy4vc3JjL1N1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vanNteHEvLi9zcmMvWGNoYW5nZS50cyIsIndlYnBhY2s6Ly9qc214cS8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQWEsS0FBSztJQU9kLFlBQVksR0FBVyxF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QUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDL0IsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsR0FBRztRQUNDLE9BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEdBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQWEsQ0FBQztZQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztDQUVKO0FBM0ZELDBCQTJGQzs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZELG9GQUFzQztBQUlsQyxxQkFKRyxvQkFBVSxDQUlIO0FBSGQsMkVBQWdDO0FBSTVCLGtCQUpHLGlCQUFPLENBSUgiLCJmaWxlIjoianNteHEtZGV2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wianNteHFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wianNteHFcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIExMT2JqIHtcbiAgICBwcmV2OiBMTE9iajtcbiAgICBuZXh0OiBMTE9iajtcbiAgICBudW1iZXI6IE51bWJlcjtcbiAgICBwcmlvcml0eTogTnVtYmVyO1xuICAgIG9iajogT2JqZWN0O1xuXG4gICAgY29uc3RydWN0b3Iob2JqOiBPYmplY3QsIG51bWJlcjogTnVtYmVyID0gMCwgcHJpb3JpdHk6IE51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5udW1iZXIgPSBudW1iZXI7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5vYmogPSBvYmo7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rZWRMaXN0IHtcbiAgICBoZWFkOiBMTE9iajtcbiAgICB0YWlsOiBMTE9iajtcbiAgICBzaXplOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICB9XG5cbiAgICBnZXRTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnNpemU7XG4gICAgfVxuXG4gICAgcHVzaChvYmo6IE9iamVjdCkge1xuICAgICAgICBsZXQgbGxPYmogPSBuZXcgTExPYmoob2JqLCB0aGlzLnNpemUpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBsbE9iajtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFpbC5uZXh0ID0gbGxPYmo7XG4gICAgICAgICAgICBsbE9iai5wcmV2ID0gdGhpcy50YWlsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNpemUrKztcbiAgICAgICAgdGhpcy50YWlsID0gbGxPYmo7ICAgICAgICBcbiAgICB9XG5cbiAgICByZW1vdmVMTE9iaihvYmo6IExMT2JqKSB7XG4gICAgICAgIGlmKG9iai5wcmV2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9iai5wcmV2Lm5leHQgPSBvYmoubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZihvYmoubmV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmoubmV4dC5wcmV2ID0gb2JqLnByZXY7ICAgXG4gICAgICAgIH0gICAgXG4gICAgICAgIHRoaXMuc2l6ZS0tOyBcbiAgICB9XG5cbiAgICByZW1vdmUoaWR4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMTE9iaih0aGlzLmdldExMT2JqKGlkeCkpO1xuICAgIH1cblxuICAgIC8qZ2V0IExMT2JqIG9iamVjdCBmcm9tIGFueXdoZXJlIGluIGxpc3QqL1xuICAgIGdldExMT2JqKGlkeDogbnVtYmVyKTogTExPYmoge1xuICAgICAgICBpZihpZHggPCAwIHx8IGlkeCA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBpbnZhbGlkIGluZGV4XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9iajogTExPYmo7XG4gICAgICAgIGlmKGlkeCA8IHRoaXMuc2l6ZS8yKSB7XG4gICAgICAgICAgIG9iaiA9IHRoaXMuaGVhZDtcbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPGlkeDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gb2JqLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSB0aGlzLnRhaWw7XG4gICAgICAgICAgICBmb3IobGV0IGk9dGhpcy5zaXplLTE7IGk+aWR4OyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgb2JqID0gb2JqLnByZXY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGdldChpZHg6IG51bWJlcikgOiBPYmplY3Qge1xuICAgICAgICBsZXQgbGxvYmo6IExMT2JqID0gdGhpcy5nZXRMTE9iaihpZHgpO1xuICAgICAgICB0aGlzLnJlbW92ZUxMT2JqKGxsb2JqKTtcbiAgICAgICAgcmV0dXJuIGxsb2JqLm9iajtcbiAgICB9XG5cbiAgICBnZXRIZWFkKCk6IE9iamVjdCB7XG4gICAgICAgIGlmKHRoaXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHRoaXMuaGVhZC5vYmo7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dDtcbiAgICAgICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICAgICAgaWYodGhpcy5oZWFkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkLnByZXYgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIG9iamVjdHMgaW4gbGlzdFwiKTtcbiAgICB9XG5cbiAgICBwb3AoKSA6IE9iamVjdCB7XG4gICAgICAgIGlmKHRoaXMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICAgICAgbGV0IG9iajogTExPYmogPSB0aGlzLnRhaWw7XG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBvYmoucHJldjtcbiAgICAgICAgICAgIGlmKHRoaXMudGFpbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YWlsLm5leHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9iai5wcmV2ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgb2JqLm5leHQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG9iai5vYmo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBwb3AoKSBvcGVyYXRpb246IExpbmtlZCBsaXN0IGluIGVtcHR5XCIpXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IHZhciBnTXNnQ291bnRlcjogbnVtYmVyID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZSB7XG5cbiAgICBzb3VyY2U6IHN0cmluZztcbiAgICBkc3Q6IHN0cmluZztcbiAgICBzdWJqZWN0OiBzdHJpbmc7XG4gICAgc2VuZFRpbWU6IG51bWJlcjtcbiAgICBkZWxpdmVyVGltZTogbnVtYmVyO1xuICAgIHR0bDogbnVtYmVyO1xuICAgIHVpZDogbnVtYmVyO1xuICAgIGNvbnRlbnQ6IE9iamVjdDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgICAgICB0aGlzLnR0bCA9IDEwO1xuICAgICAgICB0aGlzLnVpZCA9IGdNc2dDb3VudGVyO1xuICAgICAgICBnTXNnQ291bnRlcisrO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBkYXRhO1xuICAgIH1cblxuICAgIGdldFNvdXJjZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zb3VyY2U7XG4gICAgfVxuXG4gICAgZ2V0RHN0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRzdDtcbiAgICB9XG5cbiAgICBnZXRTdWJqZWN0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YmplY3Q7XG4gICAgfVxuXG4gICAgZ2V0U2VuZFRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFRpbWU7XG4gICAgfVxuXG4gICAgZ2V0RGVsZXZlclRpbWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsaXZlclRpbWU7XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudCgpOiBPYmplY3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZW50O1xuICAgIH1cblxuICAgIGdldFR0bCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy50dGw7XG4gICAgfVxuXG4gICAgZ2V0VWlkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBzZXREc3QoZHN0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kc3QgPSBkc3Q7XG4gICAgfVxuXG4gICAgc2V0U291cmNlKHNyYzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gc3JjO1xuICAgIH1cbiAgICBcbiAgICBzZXRTZW5kVGltZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZW5kVGltZSA9IHRpbWU7XG4gICAgfVxuXG4gICAgc2V0RGVsaXZlclRpbWUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGVsaXZlclRpbWUgPSB0aW1lO1xuICAgIH1cblxuICAgIHNldFR0bCh0dGw6IG51bWJlcikge1xuICAgICAgICB0aGlzLnR0bCA9IHR0bDtcbiAgICB9XG5cbiAgICBzZXRVaWQodWlkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy51aWQgPSB1aWQ7XG4gICAgfSAgIFxufSIsImltcG9ydCBYY2hhbmdlIGZyb20gXCIuL1hjaGFuZ2VcIjtcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuL01lc3NhZ2VcIjtcbmltcG9ydCBJU3Vic2NyaWJlck9iaiBmcm9tICcuL0lTdWJzY3JpYmVyT2JqJztcblxuZXhwb3J0IHZhciBnU3Vic2NyaWJlckNvdW50ZXI6IG51bWJlciA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YnNjcmliZXIge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB1aWQ6IG51bWJlcjtcbiAgICBzdWJqZWN0TGlzdDogQXJyYXk8c3RyaW5nPjtcbiAgICBtc2dTZW50Q291bnQ6IG51bWJlcjtcbiAgICBtc2dSZWN2ZENvdW50OiBudW1iZXI7XG4gICAgc3Vic2NyaWJlck9iajogSVN1YnNjcmliZXJPYmo7XG4gICAgeGNoYW5nZTogWGNoYW5nZTtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnVpZCA9IGdTdWJzY3JpYmVyQ291bnRlcjtcbiAgICAgICAgZ1N1YnNjcmliZXJDb3VudGVyKys7XG4gICAgICAgIHRoaXMuc3ViamVjdExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dTZW50Q291bnQgPSAwO1xuICAgICAgICB0aGlzLm1zZ1JlY3ZkQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXRVaWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudWlkO1xuICAgIH1cblxuICAgIGdldFN1YmplY3RMaXN0KCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0TGlzdDtcbiAgICB9XG5cbiAgICBnZXRNc2dTZW50Q291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXNnU2VudENvdW50O1xuICAgIH1cbiAgICAgXG4gICAgZ2V0TXNnUmVjdmRDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tc2dSZWN2ZENvdW50O1xuICAgIH1cblxuICAgIHNldENhbGxiYWNrT2JqKG9iajogSVN1YnNjcmliZXJPYmopIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyT2JqID0gb2JqO1xuICAgIH1cblxuICAgIGFkZFN1YmplY3Qoc3ViamVjdDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc3ViamVjdExpc3QucHVzaChzdWJqZWN0KTtcbiAgICAgICAgaWYodGhpcy54Y2hhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMueGNoYW5nZS5zdWJzY3JpYmVUb1N1YmplY3QodGhpcywgc3ViamVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRYY2hhbmdlKHhjaGFuZ2U6IFhjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy54Y2hhbmdlID0geGNoYW5nZTsgXG4gICAgfVxuXG4gICAgcG9zdChzdWJqZWN0OiBzdHJpbmcsIGRhdGE6IE9iamVjdCwgZHN0OiBzdHJpbmcgPSB1bmRlZmluZWQsIHR0bDogbnVtYmVyID0gMTApIHtcbiAgICAgICAgaWYodGhpcy54Y2hhbmdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBzdWJzY3JpYmVyIG5vdCByZWdpc3RlcmVkIHRvIGFueSBFeGNoYW5nZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgbXNnOiBNZXNzYWdlID0gbmV3IE1lc3NhZ2Uoc3ViamVjdCwgZGF0YSk7XG4gICAgICAgICAgICBtc2cuc2V0U2VuZFRpbWUoRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICBtc2cuc2V0VHRsKHR0bCk7XG4gICAgICAgICAgICBtc2cuc2V0RHN0KGRzdCk7XG4gICAgICAgICAgICBtc2cuc2V0U291cmNlKHRoaXMuZ2V0TmFtZSgpKTtcbiAgICAgICAgICAgIHRoaXMueGNoYW5nZS5wb3N0KG1zZyk7XG4gICAgICAgICAgICB0aGlzLm1zZ1NlbnRDb3VudCsrO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHRocm93KGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX19vbk1lc3NhZ2VSZWNlaXZlKG1zZzogTWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1zZ1JlY3ZkQ291bnQrKztcblxuICAgICAgICBpZih0aGlzLnN1YnNjcmliZXJPYmogIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyT2JqLm9uTWVzc2FnZVJlY2VpdmUobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgTGlua2VkTGlzdCwgeyBMTE9iaiB9IGZyb20gXCIuL0xpbmtlZExpc3RcIlxuaW1wb3J0IE1lc3NhZ2UgZnJvbSBcIi4vTWVzc2FnZVwiXG5pbXBvcnQgU3Vic2NyaWJlciBmcm9tIFwiLi9TdWJzY3JpYmVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWGNoYW5nZSB7XG5cbiAgICBzdWJzY3JpYmVyTWFwOiBNYXA8c3RyaW5nLCBBcnJheTxTdWJzY3JpYmVyPj47XG4gICAgbXNnUTogTGlua2VkTGlzdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiBtYXA8c3ViamVjdCwgc3Vic2NyaWJlcnM8QXJyYXk+PiAqL1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qIGxpbmtlZCBsaXN0IG9mIG1lc3NhZ2VzIHRvIGJlIHByb2Nlc3NlZCovXG4gICAgICAgIHRoaXMubXNnUSA9IG5ldyBMaW5rZWRMaXN0KCk7XG4gICAgfVxuXG4gICAgZ2V0U3Vic2NyaWJlck1hcCgpOiBNYXA8c3RyaW5nLCBBcnJheTxTdWJzY3JpYmVyPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmVyTWFwO1xuICAgIH1cblxuICAgIC8qcmV0dXJuIGxpc3Qgb2Ygc3Vic2NyaWJlcnMgdG8gYSBzdWJqZWN0Ki9cbiAgICBnZXRTdWJzY3JpYmVyTGlzdChzdWJqZWN0OiBzdHJpbmcpOiBBcnJheTxTdWJzY3JpYmVyPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZXJNYXAuZ2V0KHN1YmplY3QpO1xuICAgIH1cblxuICAgIHN1YnNjcmliZVRvU3ViamVjdChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyLCBzdWJqZWN0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGxpc3Q6IEFycmF5PFN1YnNjcmliZXI+ID0gdGhpcy5nZXRTdWJzY3JpYmVyTGlzdChzdWJqZWN0KTtcbiAgICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyTWFwLnNldChzdWJqZWN0LCBsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihsaXN0LmluZGV4T2Yoc3Vic2NyaWJlcikgPT09IC0xKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goc3Vic2NyaWJlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcikge1xuICAgICAgICBpZihzdWJzY3JpYmVyLmdldE5hbWUoKSA9PT0gdW5kZWZpbmVkIHx8IHN1YnNjcmliZXIuZ2V0U3ViamVjdExpc3QoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogU3Vic2NyaWJlciBwYXJhbWV0ZXIgZXJyb3IsIGVpdGhlciBuYW1lIG9yIHN1YmVjdCBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgXG4gICAgICAgIHN1YnNjcmliZXIuc3ViamVjdExpc3QuZm9yRWFjaChzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlVG9TdWJqZWN0KHN1YnNjcmliZXIsIHN1YmplY3QpO1xuICAgICAgICB9KVxuICAgICAgIFxuICAgICAgICBzdWJzY3JpYmVyLnNldFhjaGFuZ2UodGhpcyk7XG4gICAgfVxuXG4gICAgdW5zdWJzY3JpYmVUb1N1YmplY3Qoc3Vic2NyaWJlcjogU3Vic2NyaWJlciwgc3ViamVjdDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxTdWJzY3JpYmVyPiA9IHRoaXMuZ2V0U3Vic2NyaWJlckxpc3Qoc3ViamVjdCk7XG4gICAgICAgIGlmIChsaXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBpZHg6IG51bWJlciA9IGxpc3QuaW5kZXhPZihzdWJzY3JpYmVyKTtcbiAgICAgICAgICAgIGlmKCBpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlck1hcC5zZXQoc3ViamVjdCwgbGlzdC5zcGxpY2UoaWR4LCAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bnN1YnNjcmliZShzdWJzY3JpYmVyOiBTdWJzY3JpYmVyKSB7XG4gICAgICAgIGlmKHN1YnNjcmliZXIuZ2V0TmFtZSgpID09PSB1bmRlZmluZWQgfHwgc3Vic2NyaWJlci5nZXRTdWJqZWN0TGlzdCgpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBTdWJzY3JpYmVyIHBhcmFtZXRlciBlcnJvciwgZWl0aGVyIG5hbWUgb3Igc3ViZWN0IGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICBcbiAgICAgICAgc3Vic2NyaWJlci5zdWJqZWN0TGlzdC5mb3JFYWNoKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZVRvU3ViamVjdChzdWJzY3JpYmVyLCBzdWJqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICBcbiAgICAgICAgc3Vic2NyaWJlci5zZXRYY2hhbmdlKHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcG9zdChtc2c6IE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tc2dRLnB1c2gobXNnKTtcbiAgICAgICAgdGhpcy5ydW4oKTtcbiAgICB9XG5cbiAgICBzZW5kKG1zZzogTWVzc2FnZSkge1xuICAgICAgICBpZihtc2cuZ2V0U3ViamVjdCgpID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yOiBtZXNzYWdlIHN1YmplY3QgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxTdWJzY3JpYmVyPiA9IHRoaXMuZ2V0U3Vic2NyaWJlckxpc3QobXNnLmdldFN1YmplY3QoKSk7XG4gICAgICAgIGlmKGxpc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKHN1YnNjcmliZXIgPT4ge1xuICAgICAgICAgICAgICAgIG1zZy5zZXREZWxpdmVyVGltZShEYXRlLm5vdygpKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLl9fb25NZXNzYWdlUmVjZWl2ZShtc2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydW4oKSB7XG4gICAgICAgIHdoaWxlKHRoaXMubXNnUS5nZXRTaXplKCkgPiAwKSB7XG4gICAgICAgICAgICBsZXQgbXNnOiBNZXNzYWdlID0gdGhpcy5tc2dRLnBvcCgpIGFzIE1lc3NhZ2U7XG4gICAgICAgICAgICB0aGlzLnNlbmQobXNnKTtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImltcG9ydCBTdWJzY3JpYmVyIGZyb20gXCIuL1N1YnNjcmliZXJcIjtcbmltcG9ydCBYY2hhbmdlIGZyb20gXCIuL1hjaGFuZ2VcIjtcblxuZXhwb3J0IHtcbiAgICBTdWJzY3JpYmVyLFxuICAgIFhjaGFuZ2Vcbn0iXSwic291cmNlUm9vdCI6IiJ9