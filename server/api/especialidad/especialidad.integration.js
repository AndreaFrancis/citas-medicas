'use strict';

var app = require('../..');
import request from 'supertest';

var newEspecialidad;

describe('Especialidad API:', function() {

  describe('GET /api/especialidades', function() {
    var especialidads;

    beforeEach(function(done) {
      request(app)
        .get('/api/especialidades')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          especialidads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      especialidads.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/especialidades', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/especialidades')
        .send({
          name: 'New Especialidad',
          info: 'This is the brand new especialidad!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEspecialidad = res.body;
          done();
        });
    });

    it('should respond with the newly created especialidad', function() {
      newEspecialidad.name.should.equal('New Especialidad');
      newEspecialidad.info.should.equal('This is the brand new especialidad!!!');
    });

  });

  describe('GET /api/especialidades/:id', function() {
    var especialidad;

    beforeEach(function(done) {
      request(app)
        .get('/api/especialidades/' + newEspecialidad._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          especialidad = res.body;
          done();
        });
    });

    afterEach(function() {
      especialidad = {};
    });

    it('should respond with the requested especialidad', function() {
      especialidad.name.should.equal('New Especialidad');
      especialidad.info.should.equal('This is the brand new especialidad!!!');
    });

  });

  describe('PUT /api/especialidades/:id', function() {
    var updatedEspecialidad;

    beforeEach(function(done) {
      request(app)
        .put('/api/especialidades/' + newEspecialidad._id)
        .send({
          name: 'Updated Especialidad',
          info: 'This is the updated especialidad!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEspecialidad = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEspecialidad = {};
    });

    it('should respond with the updated especialidad', function() {
      updatedEspecialidad.name.should.equal('Updated Especialidad');
      updatedEspecialidad.info.should.equal('This is the updated especialidad!!!');
    });

  });

  describe('DELETE /api/especialidades/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/especialidades/' + newEspecialidad._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when especialidad does not exist', function(done) {
      request(app)
        .delete('/api/especialidades/' + newEspecialidad._id)
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
