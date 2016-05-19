/**
 * Asegurado model events
 */

'use strict';

import {EventEmitter} from 'events';
var Asegurado = require('../../sqldb').Asegurado;
var AseguradoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AseguradoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Asegurado.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AseguradoEvents.emit(event + ':' + doc._id, doc);
    AseguradoEvents.emit(event, doc);
    done(null);
  }
}

export default AseguradoEvents;
