/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri)
};

// Insert models below
db.Observacion = db.sequelize.import('../api/observacion/observacion.model');
db.Asegurado = db.sequelize.import('../api/asegurado/asegurado.model');
db.Usuario = db.sequelize.import('../api/usuario/usuario.model');
db.Reserva = db.sequelize.import('../api/reserva/reserva.model');
db.Horario = db.sequelize.import('../api/horario/horario.model');
db.Medico = db.sequelize.import('../api/medico/medico.model');
db.Emergencia = db.sequelize.import('../api/emergencia/emergencia.model');
db.Especialidad = db.sequelize.import('../api/especialidad/especialidad.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');


//relacion n-1 entre Medico y Especialidad

db.Especialidad.hasMany(db.Medico, {
  foreignKey: {
    name: 'fk_especialidad',
    allowNull: false
  },
  as: 'Medicos'
});

db.Medico.belongsTo(db.Especialidad, {
  foreignKey: {
    name: 'fk_especialidad',
    allowNull: false
  },
  as: 'Especialidad'
});

//relacion n-1 entre Medico y Emergencia

db.Medico.hasMany(db.Emergencia, {
  foreignKey: {
    name: 'fk_medico',
    allowNull: false
  },
  as: 'Emergencias'
});

db.Emergencia.belongsTo(db.Medico, {
  foreignKey: {
    name: 'fk_medico',
    allowNull: false
  },
  as: 'Medico'
});

//relacion n-1 entre Medico y Observacion

db.Medico.hasMany(db.Observacion, {
  foreignKey: {
    name: 'fk_medico',
    allowNull: false
  },
  as: 'Observaciones'
});

db.Observacion.belongsTo(db.Medico, {
  foreignKey: {
    name: 'fk_medico',
    allowNull: false
  },
  as: 'Medico'
});

//relacion n-1 entre Medico y Horario

db.Medico.hasMany(db.Horario, {
  foreignKey: {
    name: 'fk_medico',
    allowNull: false
  },
  as: 'Horarios'
});

db.Horario.belongsTo(db.Medico, {
  foreignKey: {
    name: 'fk_medico',
    allowNull: false
  },
  as: 'Medico'
});

//relacion n-1 entre Especialidad y Horario

db.Especialidad.hasMany(db.Horario, {
  foreignKey: {
    name: 'fk_especialidad',
    allowNull: false
  },
  as: 'Horarios'
});

db.Horario.belongsTo(db.Especialidad, {
  foreignKey: {
    name: 'fk_especialidad',
    allowNull: false
  },
  as: 'Especialidad'
});

//relacion n-1 entre Reserva y Horario

db.Horario.hasMany(db.Reserva, {
  foreignKey: {
    name: 'fk_horario',
    allowNull: false
  },
  as: 'Reservas'
});

db.Reserva.belongsTo(db.Horario, {
  foreignKey: {
    name: 'fk_horario',
    allowNull: false
  },
  as: 'Horario'
});

//relacion n-1 entre Reserva y Asegurado

db.Asegurado.hasMany(db.Reserva, {
  foreignKey: {
    name: 'fk_asegurado',
    allowNull: false
  },
  as: 'Reservas'
});

db.Reserva.belongsTo(db.Asegurado, {
  foreignKey: {
    name: 'fk_asegurado',
    allowNull: false
  },
  as: 'Asegurado'
});

//relacion n-1 entre Asegurado y Asegurado

db.Asegurado.hasMany(db.Asegurado, {
  foreignKey: {
    name: 'fk_dependiente',
    allowNull: true
  },
  as: 'Dependientes'
});

db.Asegurado.belongsTo(db.Asegurado, {
  foreignKey: {
    name: 'fk_dependiente',
    allowNull: true
  },
  as: 'Asegurado'
});

//relacion n-1 entre Asegurado y Usuario

db.Asegurado.belongsTo(db.Usuario, {
  foreignKey: {
    name: 'fk_usuario',
    allowNull: true
  },
  as: 'Usuario'
});

module.exports = db;
