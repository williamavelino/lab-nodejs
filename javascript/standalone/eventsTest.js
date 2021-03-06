// nodeEventsTest.js

/*
  references: 

  - Emitting Custom Events in Node.js
  http://venodesigns.net/2011/04/16/emitting-custom-events-in-node-js/

  - Node.js Events Docs
  http://nodejs.org/api/events.html

*/
//-----------------------------------------------------------------------

//var events = require('events');  // 1
//var EventEmitter = require('events').EventEmitter;  // 2

var Test = (function() {

  var Test = function () {};

  //Test.prototype = new events.EventEmitter();  // 1
  //Test.prototype.__proto__ = EventEmitter.prototype;  // 2
  Test.prototype.__proto__ = require('events').EventEmitter.prototype;  // 3

  Test.prototype.dispatch = function(eventName, data) {
    var self = this;
    self.emit(eventName, data);
  };

  return Test;
})();

//-----------------------------------------------------------------------

function helloEventHandler(data) {
  console.log('this is helloEventHandler');
  if(data) console.log(data);
}

function customEventHandler() {
  console.log('this is customEventHandler');
}

//-----------------------------------------------------------------------

var test = new Test();

// register events listeners
test.on('helloEvent', helloEventHandler);
test.on('customEvent', customEventHandler);

// dispatchers
test.dispatch('helloEvent');
test.dispatch('helloEvent', {hello: 'hello world'});
test.emit('helloEvent', {hello: 'hello world'});

test.dispatch('customEvent');
test.emit('customEvent');

// remove events listeners
test.removeListener('helloEvent', helloEventHandler);
test.removeListener('customEvent', customEventHandler);

//-----------------------------------------------------------------------

console.log('Finished');