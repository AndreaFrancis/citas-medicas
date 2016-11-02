'use strict';

var express = require('express');
var controller = require('./horario.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/hoy/:id', controller.hoy);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/consultorios/:cons/:fecha',controller.consultorio)
module.exports = router;
