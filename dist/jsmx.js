(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsmx"] = factory();
	else
		root["jsmx"] = factory();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc214L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9qc214L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzbXgvLi9zcmMvTGlua2VkTGlzdC50cyIsIndlYnBhY2s6Ly9qc214Ly4vc3JjL01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vanNteC8uL3NyYy9TdWJzY3JpYmVyLnRzIiwid2VicGFjazovL2pzbXgvLi9zcmMvWGNoYW5nZS50cyIsIndlYnBhY2s6Ly9qc214Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBYSxLQUFLO0lBT2QsWUFBWSxHQUFXLEVBQUUsU0FB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RTtZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QixHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQixVQUFVLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxHQUFHO1FBQ0MsT0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLEdBQUcsR0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBYSxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDTCxDQUFDO0NBRUo7QUEzRkQsMEJBMkZDOzs7Ozs7Ozs7Ozs7Ozs7QUMvRkQsb0ZBQXNDO0FBSWxDLHFCQUpHLG9CQUFVLENBSUg7QUFIZCwyRUFBZ0M7QUFJNUIsa0JBSkcsaUJBQU8sQ0FJSCIsImZpbGUiOiJqc214LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wianNteFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJqc214XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMTE9iaiB7XG4gICAgcHJldjogTExPYmo7XG4gICAgbmV4dDogTExPYmo7XG4gICAgbnVtYmVyOiBOdW1iZXI7XG4gICAgcHJpb3JpdHk6IE51bWJlcjtcbiAgICBvYmo6IE9iamVjdDtcblxuICAgIGNvbnN0cnVjdG9yKG9iajogT2JqZWN0LCBudW1iZXI6IE51bWJlciA9IDAsIHByaW9yaXR5OiBOdW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMubnVtYmVyID0gbnVtYmVyO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMub2JqID0gb2JqO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkTGlzdCB7XG4gICAgaGVhZDogTExPYmo7XG4gICAgdGFpbDogTExPYmo7XG4gICAgc2l6ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIHB1c2gob2JqOiBPYmplY3QpIHtcbiAgICAgICAgbGV0IGxsT2JqID0gbmV3IExMT2JqKG9iaiwgdGhpcy5zaXplKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbGxPYmo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGxsT2JqO1xuICAgICAgICAgICAgbGxPYmoucHJldiA9IHRoaXMudGFpbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zaXplKys7XG4gICAgICAgIHRoaXMudGFpbCA9IGxsT2JqOyAgICAgICAgXG4gICAgfVxuXG4gICAgcmVtb3ZlTExPYmoob2JqOiBMTE9iaikge1xuICAgICAgICBpZihvYmoucHJldiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmoucHJldi5uZXh0ID0gb2JqLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYob2JqLm5leHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqLm5leHQucHJldiA9IG9iai5wcmV2OyAgIFxuICAgICAgICB9ICAgIFxuICAgICAgICB0aGlzLnNpemUtLTsgXG4gICAgfVxuXG4gICAgcmVtb3ZlKGlkeDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTExPYmoodGhpcy5nZXRMTE9iaihpZHgpKTtcbiAgICB9XG5cbiAgICAvKmdldCBMTE9iaiBvYmplY3QgZnJvbSBhbnl3aGVyZSBpbiBsaXN0Ki9cbiAgICBnZXRMTE9iaihpZHg6IG51bWJlcik6IExMT2JqIHtcbiAgICAgICAgaWYoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogaW52YWxpZCBpbmRleFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYmo6IExMT2JqO1xuICAgICAgICBpZihpZHggPCB0aGlzLnNpemUvMikge1xuICAgICAgICAgICBvYmogPSB0aGlzLmhlYWQ7XG4gICAgICAgICAgICBmb3IobGV0IGk9MDsgaTxpZHg7IGkrKykge1xuICAgICAgICAgICAgICAgIG9iaiA9IG9iai5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqID0gdGhpcy50YWlsO1xuICAgICAgICAgICAgZm9yKGxldCBpPXRoaXMuc2l6ZS0xOyBpPmlkeDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgIG9iaiA9IG9iai5wcmV2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBnZXQoaWR4OiBudW1iZXIpIDogT2JqZWN0IHtcbiAgICAgICAgbGV0IGxsb2JqOiBMTE9iaiA9IHRoaXMuZ2V0TExPYmooaWR4KTtcbiAgICAgICAgdGhpcy5yZW1vdmVMTE9iaihsbG9iaik7XG4gICAgICAgIHJldHVybiBsbG9iai5vYmo7XG4gICAgfVxuXG4gICAgZ2V0SGVhZCgpOiBPYmplY3Qge1xuICAgICAgICBpZih0aGlzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB0aGlzLmhlYWQub2JqO1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHQ7XG4gICAgICAgICAgICB0aGlzLnNpemUtLTtcbiAgICAgICAgICAgIGlmKHRoaXMuaGVhZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZC5wcmV2ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBvYmplY3RzIGluIGxpc3RcIik7XG4gICAgfVxuXG4gICAgcG9wKCkgOiBPYmplY3Qge1xuICAgICAgICBpZih0aGlzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUtLTtcbiAgICAgICAgICAgIGxldCBvYmo6IExMT2JqID0gdGhpcy50YWlsO1xuICAgICAgICAgICAgdGhpcy50YWlsID0gb2JqLnByZXY7XG4gICAgICAgICAgICBpZih0aGlzLnRhaWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbC5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYmoucHJldiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG9iai5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBvYmoub2JqO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgcG9wKCkgb3BlcmF0aW9uOiBMaW5rZWQgbGlzdCBpbiBlbXB0eVwiKVxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCB2YXIgZ01zZ0NvdW50ZXI6IG51bWJlciA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2Uge1xuXG4gICAgc291cmNlOiBzdHJpbmc7XG4gICAgZHN0OiBzdHJpbmc7XG4gICAgc3ViamVjdDogc3RyaW5nO1xuICAgIHNlbmRUaW1lOiBudW1iZXI7XG4gICAgZGVsaXZlclRpbWU6IG51bWJlcjtcbiAgICB0dGw6IG51bWJlcjtcbiAgICB1aWQ6IG51bWJlcjtcbiAgICBjb250ZW50OiBPYmplY3Q7XG4gICAgXG4gICAgY29uc3RydWN0b3Ioc3ViamVjdDogc3RyaW5nLCBkYXRhOiBPYmplY3QpIHtcbiAgICAgICAgdGhpcy50dGwgPSAxMDtcbiAgICAgICAgdGhpcy51aWQgPSBnTXNnQ291bnRlcjtcbiAgICAgICAgZ01zZ0NvdW50ZXIrKztcbiAgICAgICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdDtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gZGF0YTtcbiAgICB9XG5cbiAgICBnZXRTb3VyY2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlO1xuICAgIH1cblxuICAgIGdldERzdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kc3Q7XG4gICAgfVxuXG4gICAgZ2V0U3ViamVjdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0O1xuICAgIH1cblxuICAgIGdldFNlbmRUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRUaW1lO1xuICAgIH1cblxuICAgIGdldERlbGV2ZXJUaW1lKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGl2ZXJUaW1lO1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgICB9XG5cbiAgICBnZXRUdGwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHRsO1xuICAgIH1cblxuICAgIGdldFVpZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy51aWQ7XG4gICAgfVxuXG4gICAgc2V0RHN0KGRzdDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZHN0ID0gZHN0O1xuICAgIH1cblxuICAgIHNldFNvdXJjZShzcmM6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNvdXJjZSA9IHNyYztcbiAgICB9XG4gICAgXG4gICAgc2V0U2VuZFRpbWUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2VuZFRpbWUgPSB0aW1lO1xuICAgIH1cblxuICAgIHNldERlbGl2ZXJUaW1lKHRpbWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRlbGl2ZXJUaW1lID0gdGltZTtcbiAgICB9XG5cbiAgICBzZXRUdGwodHRsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy50dGwgPSB0dGw7XG4gICAgfVxuXG4gICAgc2V0VWlkKHVpZDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudWlkID0gdWlkO1xuICAgIH0gICBcbn0iLCJpbXBvcnQgWGNoYW5nZSBmcm9tIFwiLi9YY2hhbmdlXCI7XG5pbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi9NZXNzYWdlXCI7XG5pbXBvcnQgSVN1YnNjcmliZXJPYmogZnJvbSAnLi9JU3Vic2NyaWJlck9iaic7XG5cbmV4cG9ydCB2YXIgZ1N1YnNjcmliZXJDb3VudGVyOiBudW1iZXIgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJzY3JpYmVyIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdWlkOiBudW1iZXI7XG4gICAgc3ViamVjdExpc3Q6IEFycmF5PHN0cmluZz47XG4gICAgbXNnU2VudENvdW50OiBudW1iZXI7XG4gICAgbXNnUmVjdmRDb3VudDogbnVtYmVyO1xuICAgIHN1YnNjcmliZXJPYmo6IElTdWJzY3JpYmVyT2JqO1xuICAgIHhjaGFuZ2U6IFhjaGFuZ2U7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy51aWQgPSBnU3Vic2NyaWJlckNvdW50ZXI7XG4gICAgICAgIGdTdWJzY3JpYmVyQ291bnRlcisrO1xuICAgICAgICB0aGlzLnN1YmplY3RMaXN0ID0gW107XG4gICAgICAgIHRoaXMubXNnU2VudENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5tc2dSZWN2ZENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBnZXROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfVxuXG4gICAgZ2V0VWlkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnVpZDtcbiAgICB9XG5cbiAgICBnZXRTdWJqZWN0TGlzdCgpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdExpc3Q7XG4gICAgfVxuXG4gICAgZ2V0TXNnU2VudENvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1zZ1NlbnRDb3VudDtcbiAgICB9XG4gICAgIFxuICAgIGdldE1zZ1JlY3ZkQ291bnQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubXNnUmVjdmRDb3VudDtcbiAgICB9XG5cbiAgICBzZXRDYWxsYmFja09iaihvYmo6IElTdWJzY3JpYmVyT2JqKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlck9iaiA9IG9iajtcbiAgICB9XG5cbiAgICBhZGRTdWJqZWN0KHN1YmplY3Q6IHN0cmluZykge1xuICAgICAgICB0aGlzLnN1YmplY3RMaXN0LnB1c2goc3ViamVjdCk7XG4gICAgICAgIGlmKHRoaXMueGNoYW5nZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnhjaGFuZ2Uuc3Vic2NyaWJlVG9TdWJqZWN0KHRoaXMsIHN1YmplY3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0WGNoYW5nZSh4Y2hhbmdlOiBYY2hhbmdlKSB7XG4gICAgICAgIHRoaXMueGNoYW5nZSA9IHhjaGFuZ2U7IFxuICAgIH1cblxuICAgIHBvc3Qoc3ViamVjdDogc3RyaW5nLCBkYXRhOiBPYmplY3QsIGRzdDogc3RyaW5nID0gdW5kZWZpbmVkLCB0dGw6IG51bWJlciA9IDEwKSB7XG4gICAgICAgIGlmKHRoaXMueGNoYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogc3Vic2NyaWJlciBub3QgcmVnaXN0ZXJlZCB0byBhbnkgRXhjaGFuZ2VcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IG1zZzogTWVzc2FnZSA9IG5ldyBNZXNzYWdlKHN1YmplY3QsIGRhdGEpO1xuICAgICAgICAgICAgbXNnLnNldFNlbmRUaW1lKERhdGUubm93KCkpO1xuICAgICAgICAgICAgbXNnLnNldFR0bCh0dGwpO1xuICAgICAgICAgICAgbXNnLnNldERzdChkc3QpO1xuICAgICAgICAgICAgbXNnLnNldFNvdXJjZSh0aGlzLmdldE5hbWUoKSk7XG4gICAgICAgICAgICB0aGlzLnhjaGFuZ2UucG9zdChtc2cpO1xuICAgICAgICAgICAgdGhpcy5tc2dTZW50Q291bnQrKztcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICB0aHJvdyhlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9fb25NZXNzYWdlUmVjZWl2ZShtc2c6IE1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tc2dSZWN2ZENvdW50Kys7XG5cbiAgICAgICAgaWYodGhpcy5zdWJzY3JpYmVyT2JqICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlck9iai5vbk1lc3NhZ2VSZWNlaXZlKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IExpbmtlZExpc3QsIHsgTExPYmogfSBmcm9tIFwiLi9MaW5rZWRMaXN0XCJcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuL01lc3NhZ2VcIlxuaW1wb3J0IFN1YnNjcmliZXIgZnJvbSBcIi4vU3Vic2NyaWJlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFhjaGFuZ2Uge1xuXG4gICAgc3Vic2NyaWJlck1hcDogTWFwPHN0cmluZywgQXJyYXk8U3Vic2NyaWJlcj4+O1xuICAgIG1zZ1E6IExpbmtlZExpc3Q7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyogbWFwPHN1YmplY3QsIHN1YnNjcmliZXJzPEFycmF5Pj4gKi9cbiAgICAgICAgdGhpcy5zdWJzY3JpYmVyTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAvKiBsaW5rZWQgbGlzdCBvZiBtZXNzYWdlcyB0byBiZSBwcm9jZXNzZWQqL1xuICAgICAgICB0aGlzLm1zZ1EgPSBuZXcgTGlua2VkTGlzdCgpO1xuICAgIH1cblxuICAgIGdldFN1YnNjcmliZXJNYXAoKTogTWFwPHN0cmluZywgQXJyYXk8U3Vic2NyaWJlcj4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlck1hcDtcbiAgICB9XG5cbiAgICAvKnJldHVybiBsaXN0IG9mIHN1YnNjcmliZXJzIHRvIGEgc3ViamVjdCovXG4gICAgZ2V0U3Vic2NyaWJlckxpc3Qoc3ViamVjdDogc3RyaW5nKTogQXJyYXk8U3Vic2NyaWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmVyTWFwLmdldChzdWJqZWN0KTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVUb1N1YmplY3Qoc3Vic2NyaWJlcjogU3Vic2NyaWJlciwgc3ViamVjdDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxTdWJzY3JpYmVyPiA9IHRoaXMuZ2V0U3Vic2NyaWJlckxpc3Qoc3ViamVjdCk7XG4gICAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlck1hcC5zZXQoc3ViamVjdCwgbGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobGlzdC5pbmRleE9mKHN1YnNjcmliZXIpID09PSAtMSkge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYoc3Vic2NyaWJlci5nZXROYW1lKCkgPT09IHVuZGVmaW5lZCB8fCBzdWJzY3JpYmVyLmdldFN1YmplY3RMaXN0KCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IFN1YnNjcmliZXIgcGFyYW1ldGVyIGVycm9yLCBlaXRoZXIgbmFtZSBvciBzdWJlY3QgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgIFxuICAgICAgICBzdWJzY3JpYmVyLnN1YmplY3RMaXN0LmZvckVhY2goc3ViamVjdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU3ViamVjdChzdWJzY3JpYmVyLCBzdWJqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICBcbiAgICAgICAgc3Vic2NyaWJlci5zZXRYY2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHVuc3Vic2NyaWJlVG9TdWJqZWN0KHN1YnNjcmliZXI6IFN1YnNjcmliZXIsIHN1YmplY3Q6IHN0cmluZykge1xuICAgICAgICBsZXQgbGlzdDogQXJyYXk8U3Vic2NyaWJlcj4gPSB0aGlzLmdldFN1YnNjcmliZXJMaXN0KHN1YmplY3QpO1xuICAgICAgICBpZiAobGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsZXQgaWR4OiBudW1iZXIgPSBsaXN0LmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiggaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJNYXAuc2V0KHN1YmplY3QsIGxpc3Quc3BsaWNlKGlkeCwgMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5zdWJzY3JpYmUoc3Vic2NyaWJlcjogU3Vic2NyaWJlcikge1xuICAgICAgICBpZihzdWJzY3JpYmVyLmdldE5hbWUoKSA9PT0gdW5kZWZpbmVkIHx8IHN1YnNjcmliZXIuZ2V0U3ViamVjdExpc3QoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogU3Vic2NyaWJlciBwYXJhbWV0ZXIgZXJyb3IsIGVpdGhlciBuYW1lIG9yIHN1YmVjdCBpcyB1bmRlZmluZWRcIik7XG4gICAgICAgIH1cbiAgICAgXG4gICAgICAgIHN1YnNjcmliZXIuc3ViamVjdExpc3QuZm9yRWFjaChzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmVUb1N1YmplY3Qoc3Vic2NyaWJlciwgc3ViamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgXG4gICAgICAgIHN1YnNjcmliZXIuc2V0WGNoYW5nZSh1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHBvc3QobXNnOiBNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubXNnUS5wdXNoKG1zZyk7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuXG4gICAgc2VuZChtc2c6IE1lc3NhZ2UpIHtcbiAgICAgICAgaWYobXNnLmdldFN1YmplY3QoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogbWVzc2FnZSBzdWJqZWN0IGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8U3Vic2NyaWJlcj4gPSB0aGlzLmdldFN1YnNjcmliZXJMaXN0KG1zZy5nZXRTdWJqZWN0KCkpO1xuICAgICAgICBpZihsaXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChzdWJzY3JpYmVyID0+IHtcbiAgICAgICAgICAgICAgICBtc2cuc2V0RGVsaXZlclRpbWUoRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5fX29uTWVzc2FnZVJlY2VpdmUobXNnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICB3aGlsZSh0aGlzLm1zZ1EuZ2V0U2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbGV0IG1zZzogTWVzc2FnZSA9IHRoaXMubXNnUS5wb3AoKSBhcyBNZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5zZW5kKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgU3Vic2NyaWJlciBmcm9tIFwiLi9TdWJzY3JpYmVyXCI7XG5pbXBvcnQgWGNoYW5nZSBmcm9tIFwiLi9YY2hhbmdlXCI7XG5cbmV4cG9ydCB7XG4gICAgU3Vic2NyaWJlcixcbiAgICBYY2hhbmdlXG59Il0sInNvdXJjZVJvb3QiOiIifQ==