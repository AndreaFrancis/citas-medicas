'use strict';

var app = require('../..');
import request from 'supertest';

var newPersona;

describe('Persona API:', function() {

  describe('GET /api/Personas', function() {
    var Personas;

    beforeEach(function(done) {
      request(app)
        .get('/api/Personas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Personas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Personas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/Personas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/Personas')
        .send({
          name: 'New Persona',
          info: 'This is the brand new Persona!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPersona = res.body;
          done();
        });
    });

    it('should respond with the newly created Persona', function() {
      newPersona.name.should.equal('New Persona');
      newPersona.info.should.equal('This is the brand new Persona!!!');
    });

  });

  describe('GET /api/Personas/:id', function() {
    var Persona;

    beforeEach(function(done) {
      request(app)
        .get('/api/Personas/' + newPersona._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Persona = res.body;
          done();
        });
    });

    afterEach(function() {
      Persona = {};
    });

    it('should respond with the requested Persona', function() {
      Persona.name.should.equal('New Persona');
      Persona.info.should.equal('This is the brand new Persona!!!');
    });

  });

  describe('PUT /api/Personas/:id', function() {
    var updatedPersona;

    beforeEach(function(done) {
      request(app)
        .put('/api/Personas/' + newPersona._id)
        .send({
          name: 'Updated Persona',
          info: 'This is the updated Persona!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPersona = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPersona = {};
    });

    it('should respond with the updated Persona', function() {
      updatedPersona.name.should.equal('Updated Persona');
      updatedPersona.info.should.equal('This is the updated Persona!!!');
    });

  });

  describe('DELETE /api/Personas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/Personas/' + newPersona._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Persona does not exist', function(done) {
      request(app)
        .delete('/api/Personas/' + newPersona._id)
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
