/**
 * Persona model events
 */

'use strict';

import {EventEmitter} from 'events';
var Persona = require('../../sqldb').Persona;
var PersonaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PersonaEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Persona.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PersonaEvents.emit(event + ':' + doc._id, doc);
    PersonaEvents.emit(event, doc);
    done(null);
  }
}

export default PersonaEvents;
