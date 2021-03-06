/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/horarios              ->  index
 * POST    /api/horarios              ->  create
 * GET     /api/horarios/:id          ->  show
 * PUT     /api/horarios/:id          ->  update
 * DELETE  /api/horarios/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Horario} from '../../sqldb';
import {Reserva} from '../../sqldb';
import {Medico} from '../../sqldb';
import {Persona} from '../../sqldb';
import {Asegurado} from '../../sqldb';
import {Especialidad} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Horarios
export function index(req, res) {
  return Horario.findAll({include:[{model:Reserva, as:'Reservas'},
                                  {model:Medico, as:'Medico',include:[{model:Persona, as:'Persona'}]},
                                  {model:Especialidad, as:'Especialidad'}]})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Horarios
export function hoy(req, res) {
  var fechaExtraida = new Date(req.params.id);
  if(req.params.id == 0){
      fechaExtraida = new Date();
  }
  return Horario.findAll(
    {
      where:{
        fecha: {
          $lt: fechaExtraida,
          $gt: new Date(fechaExtraida - 24 * 60 * 60 * 1000)
        }
      },
      include:[{model:Reserva, as:'Reservas',include:[
        {
          model:Asegurado,
          as:'Asegurado',
          include:[
            {
              model:Persona,
              as:'Persona'
            }
          ]
        }
      ]},
                {model:Medico, as:'Medico',include:[
                  {model:Persona, as:'Persona'}
                ]},
                                  {model:Especialidad, as:'Especialidad'}]})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets horarios con mismo consultorio y hora inicio y fin
export function consultorio(req, res) {
  var consultorio = req.params.cons;
  console.log("---------------"+req.params.fecha);
  var fechaExtraida = new Date(req.params.fecha);
  var fechaposterior = new Date(req.params.fecha);
  fechaposterior.setDate(fechaposterior.getDate() + 1);
  console.log("FECHA "+fechaExtraida);
  console.log("FECHA POSTERIOR"+ fechaposterior);
  return Horario.findAll(
    {
      where:{
        fecha: {
          $gte: fechaExtraida,
          $lte: fechaposterior
        },
        consultorio :  consultorio
      }})
    .then(respondWithResult(res))
    .catch(handleError(res));
}



// Gets a single Horario from the DB
export function show(req, res) {
    console.log("LLAMADO");
    return Horario.find({
      where: {
        _id: req.params.id
      }
    })
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
}

// Obtener una lista de horarios segun medico y fechas
export function semana(req, res) {
  return Horario.find({
    where: {
      fk_medico: req.params.medico_id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new Horario in the DB
export function create(req, res) {
  return Horario.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Horario in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Horario.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Horario from the DB
export function destroy(req, res) {
  return Horario.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
