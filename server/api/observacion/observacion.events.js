/**
 * Observacion model events
 */

'use strict';

import {EventEmitter} from 'events';
var Observacion = require('../../sqldb').Observacion;
var ObservacionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ObservacionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Observacion.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ObservacionEvents.emit(event + ':' + doc._id, doc);
    ObservacionEvents.emit(event, doc);
    done(null);
  }
}

export default ObservacionEvents;
