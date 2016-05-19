/**
 * Medico model events
 */

'use strict';

import {EventEmitter} from 'events';
var Medico = require('../../sqldb').Medico;
var MedicoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MedicoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Medico.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MedicoEvents.emit(event + ':' + doc._id, doc);
    MedicoEvents.emit(event, doc);
    done(null);
  }
}

export default MedicoEvents;
