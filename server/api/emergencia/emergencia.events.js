/**
 * Emergencia model events
 */

'use strict';

import {EventEmitter} from 'events';
var Emergencia = require('../../sqldb').Emergencia;
var EmergenciaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EmergenciaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Emergencia.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EmergenciaEvents.emit(event + ':' + doc._id, doc);
    EmergenciaEvents.emit(event, doc);
    done(null);
  }
}

export default EmergenciaEvents;
