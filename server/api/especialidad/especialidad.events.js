/**
 * Especialidad model events
 */

'use strict';

import {EventEmitter} from 'events';
var Especialidad = require('../../sqldb').Especialidad;
var EspecialidadEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EspecialidadEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Especialidad.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EspecialidadEvents.emit(event + ':' + doc._id, doc);
    EspecialidadEvents.emit(event, doc);
    done(null);
  }
}

export default EspecialidadEvents;
