'use strict';

var app = require('../..');
import request from 'supertest';

var newHorario;

describe('Horario API:', function() {

  describe('GET /api/horarios', function() {
    var horarios;

    beforeEach(function(done) {
      request(app)
        .get('/api/horarios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          horarios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      horarios.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/horarios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/horarios')
        .send({
          name: 'New Horario',
          info: 'This is the brand new horario!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newHorario = res.body;
          done();
        });
    });

    it('should respond with the newly created horario', function() {
      newHorario.name.should.equal('New Horario');
      newHorario.info.should.equal('This is the brand new horario!!!');
    });

  });

  describe('GET /api/horarios/:id', function() {
    var horario;

    beforeEach(function(done) {
      request(app)
        .get('/api/horarios/' + newHorario._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          horario = res.body;
          done();
        });
    });

    afterEach(function() {
      horario = {};
    });

    it('should respond with the requested horario', function() {
      horario.name.should.equal('New Horario');
      horario.info.should.equal('This is the brand new horario!!!');
    });

  });

  describe('PUT /api/horarios/:id', function() {
    var updatedHorario;

    beforeEach(function(done) {
      request(app)
        .put('/api/horarios/' + newHorario._id)
        .send({
          name: 'Updated Horario',
          info: 'This is the updated horario!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHorario = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHorario = {};
    });

    it('should respond with the updated horario', function() {
      updatedHorario.name.should.equal('Updated Horario');
      updatedHorario.info.should.equal('This is the updated horario!!!');
    });

  });

  describe('DELETE /api/horarios/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/horarios/' + newHorario._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when horario does not exist', function(done) {
      request(app)
        .delete('/api/horarios/' + newHorario._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
