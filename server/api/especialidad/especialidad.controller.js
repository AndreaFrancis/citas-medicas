/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/especialidades              ->  index
 * POST    /api/especialidades              ->  create
 * GET     /api/especialidades/:id          ->  show
 * PUT     /api/especialidades/:id          ->  update
 * DELETE  /api/especialidades/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Especialidad} from '../../sqldb';
import {Horario} from '../../sqldb';
import {Medico} from '../../sqldb';
import {Reserva} from '../../sqldb';
import {Asegurado} from '../../sqldb';


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
    console.log("Error i:" + err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Especialidads
export function indexSemana(req, res) {
  var maniana = new Date();
  var semana = new Date();
  //maniana.setDate(maniana.getDate() + 1);
  semana.setDate(semana.getDate() + 8);
  console.log("MANANA>",maniana, " SEMANA>",semana);
  return Especialidad.findAll(
    {
      //-include:[{model: Horario, as: 'Horarios', include:[{model: Medico, as: 'Medico'}, {model:Reserva, as:'Reservas', include:[{model:Asegurado, as:'Asegurado'}]}]}]
      //--include:[{model:Medico, as:'Medicos',include:[{model:Horario, as:'Horarios', where:{$or:[{fecha:{$gte:maniana}},{fecha:{$lte:semana}}]}}]}]
      include:[
        {
          model:Medico,
          as:'Medicos',
          include:[
            {
              model:Horario,
              as:'Horarios',
              include:[
                {
                  model:Reserva,
                  as: 'Reservas'
                }
              ],
              where:{
                  fecha:{
                    $and:[
                      {$gte:maniana},
                      {$lte:semana}
                    ]
                  }
                }
              }
          ]
        }
      ]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Especialidads
export function index(req, res) {
  return Especialidad.findAll(
    {
      include:[{model:Medico, as:'Medicos',include:[{model:Horario, as:'Horarios'}]}]
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Especialidad from the DB
export function show(req, res) {
  return Especialidad.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Especialidad in the DB
export function create(req, res) {
  return Especialidad.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Especialidad in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Especialidad.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Especialidad from the DB
export function destroy(req, res) {
  return Especialidad.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
