/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/autenticacion', require('./api/autenticacion'));
  app.use('/api/observaciones', require('./api/observacion'));
  app.use('/api/asegurados', require('./api/asegurado'));
  app.use('/api/personas', require('./api/persona'));
  app.use('/api/usuarios', require('./api/usuario'));
  app.use('/api/reservas', require('./api/reserva'));
  app.use('/api/horarios', require('./api/horario'));
  app.use('/api/medicos', require('./api/medico'));
  app.use('/api/emergencias', require('./api/emergencia'));
  app.use('/api/especialidades', require('./api/especialidad'));
  app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
