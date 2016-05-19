/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reservas              ->  index
 * POST    /api/reservas              ->  create
 * GET     /api/reservas/:id          ->  show
 * PUT     /api/reservas/:id          ->  update
 * DELETE  /api/reservas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {Reserva} from '../../sqldb';

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

// Gets a list of Reservas
export function index(req, res) {
  return Reserva.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reserva from the DB
export function show(req, res) {
  return Reserva.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Reserva in the DB
export function create(req, res) {
  return Reserva.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Reserva in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Reserva.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Reserva from the DB
export function destroy(req, res) {
  return Reserva.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
