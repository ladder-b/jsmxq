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
class Message {
    constructor(subject, data) {
        this.ttl = 10;
        this.uid = "";
        this.subject = subject;
        this.content = data;
    }
    getSubject() {
        return this.subject;
    }
    getContent() {
        return this.content;
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
class Subscriber {
    constructor(name) {
        this.name = name;
        this.uid = "0";
        this.subjectList = [];
        this.msgSentCount = 0;
        this.msgRecvdCount = 0;
    }
    getName() {
        return this.name;
    }
    getSubjectList() {
        return this.subjectList;
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
            msg.setUid("0");
            this.xchange.post(msg);
            this.msgSentCount++;
        }
        catch (e) {
            console.log(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc214L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9qc214L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzbXgvLi9zcmMvTGlua2VkTGlzdC50cyIsIndlYnBhY2s6Ly9qc214Ly4vc3JjL01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vanNteC8uL3NyYy9TdWJzY3JpYmVyLnRzIiwid2VicGFjazovL2pzbXgvLi9zcmMvWGNoYW5nZS50cyIsIndlYnBhY2s6Ly9qc214Ly4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBYSxLQUFLO0lBUWQsWUFBWSxHQUFXLEVBQUUsU0FB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QUc7UUFDQyxPQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksR0FBRyxHQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFhLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7Q0FFSjtBQWpFRCwwQkFpRUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JFRCxvRkFBc0M7QUFJbEMscUJBSkcsb0JBQVUsQ0FJSDtBQUhkLDJFQUFnQztBQUk1QixrQkFKRyxpQkFBTyxDQUlIIiwiZmlsZSI6ImpzbXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJqc214XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImpzbXhcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIExMT2JqIHtcblxuICAgIHByZXY6IExMT2JqO1xuICAgIG5leHQ6IExMT2JqO1xuICAgIG51bWJlcjogTnVtYmVyO1xuICAgIHByaW9yaXR5OiBOdW1iZXI7XG4gICAgb2JqOiBPYmplY3Q7XG5cbiAgICBjb25zdHJ1Y3RvcihvYmo6IE9iamVjdCwgbnVtYmVyOiBOdW1iZXIgPSAwLCBwcmlvcml0eTogTnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLm51bWJlciA9IG51bWJlcjtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLm9iaiA9IG9iajtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmtlZExpc3Qge1xuXG4gICAgaGVhZDogTExPYmo7XG4gICAgdGFpbDogTExPYmo7XG4gICAgc2l6ZTogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9IDA7XG4gICAgfVxuXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIHB1c2gob2JqOiBPYmplY3QpIHtcbiAgICAgICAgbGV0IGxsT2JqID0gbmV3IExMT2JqKG9iaiwgdGhpcy5zaXplKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbGxPYmo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGxsT2JqO1xuICAgICAgICAgICAgbGxPYmoucHJldiA9IHRoaXMudGFpbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zaXplKys7XG4gICAgICAgIHRoaXMudGFpbCA9IGxsT2JqOyAgICAgICAgXG4gICAgfVxuXG4gICAgcG9wKCkge1xuICAgICAgICBpZih0aGlzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUtLTtcbiAgICAgICAgICAgIGxldCBvYmo6IExMT2JqID0gdGhpcy50YWlsO1xuICAgICAgICAgICAgdGhpcy50YWlsID0gb2JqLnByZXY7XG4gICAgICAgICAgICBpZih0aGlzLnRhaWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFpbC5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYmoucHJldiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIG9iai5uZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG9iai5vYmo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBwb3AoKSBvcGVyYXRpb246IExpbmtlZCBsaXN0IGluIGVtcHR5XCIpXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZSB7XG5cbiAgICBzb3VyY2U6IHN0cmluZztcbiAgICBkc3Q6IHN0cmluZztcbiAgICBzdWJqZWN0OiBzdHJpbmc7XG4gICAgc2VuZFRpbWU6IG51bWJlcjtcbiAgICBkZWxpdmVyVGltZTogbnVtYmVyO1xuICAgIHR0bDogbnVtYmVyO1xuICAgIHVpZDogc3RyaW5nO1xuICAgIGNvbnRlbnQ6IE9iamVjdDtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihzdWJqZWN0OiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAgICAgICB0aGlzLnR0bCA9IDEwO1xuICAgICAgICB0aGlzLnVpZCA9IFwiXCI7XG4gICAgICAgIHRoaXMuc3ViamVjdCA9IHN1YmplY3Q7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGRhdGE7XG4gICAgfVxuXG4gICAgZ2V0U3ViamVjdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0O1xuICAgIH1cblxuICAgIGdldENvbnRlbnQoKTogT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudDtcbiAgICB9XG5cbiAgICBzZXRTZW5kVGltZSh0aW1lOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZW5kVGltZSA9IHRpbWU7XG4gICAgfVxuXG4gICAgc2V0RGVsaXZlclRpbWUodGltZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGVsaXZlclRpbWUgPSB0aW1lO1xuICAgIH1cblxuICAgIHNldFR0bCh0dGw6IG51bWJlcikge1xuICAgICAgICB0aGlzLnR0bCA9IHR0bDtcbiAgICB9XG5cbiAgICBzZXRVaWQodWlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy51aWQgPSB1aWQ7XG4gICAgfSAgIFxufSIsImltcG9ydCBYY2hhbmdlIGZyb20gXCIuL1hjaGFuZ2VcIjtcbmltcG9ydCBNZXNzYWdlIGZyb20gXCIuL01lc3NhZ2VcIjtcbmltcG9ydCBJU3Vic2NyaWJlck9iaiBmcm9tICcuL0lTdWJzY3JpYmVyT2JqJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Vic2NyaWJlciB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHVpZDogc3RyaW5nO1xuICAgIHN1YmplY3RMaXN0OiBBcnJheTxzdHJpbmc+O1xuICAgIG1zZ1NlbnRDb3VudDogbnVtYmVyO1xuICAgIG1zZ1JlY3ZkQ291bnQ6IG51bWJlcjtcbiAgICBzdWJzY3JpYmVyT2JqOiBJU3Vic2NyaWJlck9iajtcbiAgICB4Y2hhbmdlOiBYY2hhbmdlO1xuXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudWlkID0gXCIwXCI7XG4gICAgICAgIHRoaXMuc3ViamVjdExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5tc2dTZW50Q291bnQgPSAwO1xuICAgICAgICB0aGlzLm1zZ1JlY3ZkQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGdldE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbiAgICBnZXRTdWJqZWN0TGlzdCgpOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdExpc3Q7XG4gICAgfVxuXG4gICAgc2V0Q2FsbGJhY2tPYmoob2JqOiBJU3Vic2NyaWJlck9iaikge1xuICAgICAgICB0aGlzLnN1YnNjcmliZXJPYmogPSBvYmo7XG4gICAgfVxuXG4gICAgYWRkU3ViamVjdChzdWJqZWN0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0TGlzdC5wdXNoKHN1YmplY3QpO1xuICAgICAgICBpZih0aGlzLnhjaGFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy54Y2hhbmdlLnN1YnNjcmliZVRvU3ViamVjdCh0aGlzLCBzdWJqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFhjaGFuZ2UoeGNoYW5nZTogWGNoYW5nZSkge1xuICAgICAgICB0aGlzLnhjaGFuZ2UgPSB4Y2hhbmdlOyBcbiAgICB9XG5cbiAgICBwb3N0KHN1YmplY3Q6IHN0cmluZywgZGF0YTogT2JqZWN0LCBkc3Q6IHN0cmluZyA9IHVuZGVmaW5lZCwgdHRsOiBudW1iZXIgPSAxMCkge1xuICAgICAgICBpZih0aGlzLnhjaGFuZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IHN1YnNjcmliZXIgbm90IHJlZ2lzdGVyZWQgdG8gYW55IEV4Y2hhbmdlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBtc2c6IE1lc3NhZ2UgPSBuZXcgTWVzc2FnZShzdWJqZWN0LCBkYXRhKTtcbiAgICAgICAgICAgIG1zZy5zZXRTZW5kVGltZShEYXRlLm5vdygpKTtcbiAgICAgICAgICAgIG1zZy5zZXRUdGwodHRsKTtcbiAgICAgICAgICAgIG1zZy5zZXRVaWQoXCIwXCIpO1xuICAgICAgICAgICAgdGhpcy54Y2hhbmdlLnBvc3QobXNnKTtcbiAgICAgICAgICAgIHRoaXMubXNnU2VudENvdW50Kys7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfX29uTWVzc2FnZVJlY2VpdmUobXNnOiBNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubXNnUmVjdmRDb3VudCsrO1xuXG4gICAgICAgIGlmKHRoaXMuc3Vic2NyaWJlck9iaiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJPYmoub25NZXNzYWdlUmVjZWl2ZShtc2cpO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBMaW5rZWRMaXN0LCB7IExMT2JqIH0gZnJvbSBcIi4vTGlua2VkTGlzdFwiXG5pbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi9NZXNzYWdlXCJcbmltcG9ydCBTdWJzY3JpYmVyIGZyb20gXCIuL1N1YnNjcmliZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYY2hhbmdlIHtcblxuICAgIHN1YnNjcmliZXJNYXA6IE1hcDxzdHJpbmcsIEFycmF5PFN1YnNjcmliZXI+PjtcbiAgICBtc2dROiBMaW5rZWRMaXN0O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8qIG1hcDxzdWJqZWN0LCBzdWJzY3JpYmVyczxBcnJheT4+ICovXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlck1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgLyogbGlua2VkIGxpc3Qgb2YgbWVzc2FnZXMgdG8gYmUgcHJvY2Vzc2VkKi9cbiAgICAgICAgdGhpcy5tc2dRID0gbmV3IExpbmtlZExpc3QoKTtcbiAgICB9XG5cbiAgICAvKnJldHVybiBsaXN0IG9mIHN1YnNjcmliZXJzIHRvIGEgc3ViamVjdCovXG4gICAgZ2V0U3Vic2NyaWJlckxpc3Qoc3ViamVjdDogc3RyaW5nKTogQXJyYXk8U3Vic2NyaWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmVyTWFwLmdldChzdWJqZWN0KTtcbiAgICB9XG5cbiAgICBzdWJzY3JpYmVUb1N1YmplY3Qoc3Vic2NyaWJlcjogU3Vic2NyaWJlciwgc3ViamVjdDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBsaXN0OiBBcnJheTxTdWJzY3JpYmVyPiA9IHRoaXMuZ2V0U3Vic2NyaWJlckxpc3Qoc3ViamVjdCk7XG4gICAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxpc3QgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlck1hcC5zZXQoc3ViamVjdCwgbGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobGlzdC5pbmRleE9mKHN1YnNjcmliZXIpID09PSAtMSkge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXIpIHtcbiAgICAgICAgaWYoc3Vic2NyaWJlci5nZXROYW1lKCkgPT09IHVuZGVmaW5lZCB8fCBzdWJzY3JpYmVyLmdldFN1YmplY3RMaXN0KCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IFN1YnNjcmliZXIgcGFyYW1ldGVyIGVycm9yLCBlaXRoZXIgbmFtZSBvciBzdWJlY3QgaXMgdW5kZWZpbmVkXCIpO1xuICAgICAgICB9XG4gICAgIFxuICAgICAgICBzdWJzY3JpYmVyLnN1YmplY3RMaXN0LmZvckVhY2goc3ViamVjdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZVRvU3ViamVjdChzdWJzY3JpYmVyLCBzdWJqZWN0KTtcbiAgICAgICAgfSlcbiAgICAgICBcbiAgICAgICAgc3Vic2NyaWJlci5zZXRYY2hhbmdlKHRoaXMpO1xuICAgIH1cblxuICAgIHBvc3QobXNnOiBNZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubXNnUS5wdXNoKG1zZyk7XG4gICAgICAgIHRoaXMucnVuKCk7XG4gICAgfVxuXG4gICAgc2VuZChtc2c6IE1lc3NhZ2UpIHtcbiAgICAgICAgaWYobXNnLmdldFN1YmplY3QoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvcjogbWVzc2FnZSBzdWJqZWN0IGlzIHVuZGVmaW5lZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGlzdDogQXJyYXk8U3Vic2NyaWJlcj4gPSB0aGlzLmdldFN1YnNjcmliZXJMaXN0KG1zZy5nZXRTdWJqZWN0KCkpO1xuICAgICAgICBpZihsaXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxpc3QuZm9yRWFjaChzdWJzY3JpYmVyID0+IHtcbiAgICAgICAgICAgICAgICBtc2cuc2V0RGVsaXZlclRpbWUoRGF0ZS5ub3coKSk7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlci5fX29uTWVzc2FnZVJlY2VpdmUobXNnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICB3aGlsZSh0aGlzLm1zZ1EuZ2V0U2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbGV0IG1zZzogTWVzc2FnZSA9IHRoaXMubXNnUS5wb3AoKSBhcyBNZXNzYWdlO1xuICAgICAgICAgICAgdGhpcy5zZW5kKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJpbXBvcnQgU3Vic2NyaWJlciBmcm9tIFwiLi9TdWJzY3JpYmVyXCI7XG5pbXBvcnQgWGNoYW5nZSBmcm9tIFwiLi9YY2hhbmdlXCI7XG5cbmV4cG9ydCB7XG4gICAgU3Vic2NyaWJlcixcbiAgICBYY2hhbmdlXG59Il0sInNvdXJjZVJvb3QiOiIifQ==