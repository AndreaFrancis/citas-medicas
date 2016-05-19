/**
 * Horario model events
 */

'use strict';

import {EventEmitter} from 'events';
var Horario = require('../../sqldb').Horario;
var HorarioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HorarioEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Horario.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    HorarioEvents.emit(event + ':' + doc._id, doc);
    HorarioEvents.emit(event, doc);
    done(null);
  }
}

export default HorarioEvents;
