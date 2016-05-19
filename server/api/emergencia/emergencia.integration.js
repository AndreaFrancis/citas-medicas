'use strict';

var app = require('../..');
import request from 'supertest';

var newEmergencia;

describe('Emergencia API:', function() {

  describe('GET /api/emergencias', function() {
    var emergencias;

    beforeEach(function(done) {
      request(app)
        .get('/api/emergencias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          emergencias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      emergencias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/emergencias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/emergencias')
        .send({
          name: 'New Emergencia',
          info: 'This is the brand new emergencia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newEmergencia = res.body;
          done();
        });
    });

    it('should respond with the newly created emergencia', function() {
      newEmergencia.name.should.equal('New Emergencia');
      newEmergencia.info.should.equal('This is the brand new emergencia!!!');
    });

  });

  describe('GET /api/emergencias/:id', function() {
    var emergencia;

    beforeEach(function(done) {
      request(app)
        .get('/api/emergencias/' + newEmergencia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          emergencia = res.body;
          done();
        });
    });

    afterEach(function() {
      emergencia = {};
    });

    it('should respond with the requested emergencia', function() {
      emergencia.name.should.equal('New Emergencia');
      emergencia.info.should.equal('This is the brand new emergencia!!!');
    });

  });

  describe('PUT /api/emergencias/:id', function() {
    var updatedEmergencia;

    beforeEach(function(done) {
      request(app)
        .put('/api/emergencias/' + newEmergencia._id)
        .send({
          name: 'Updated Emergencia',
          info: 'This is the updated emergencia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedEmergencia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEmergencia = {};
    });

    it('should respond with the updated emergencia', function() {
      updatedEmergencia.name.should.equal('Updated Emergencia');
      updatedEmergencia.info.should.equal('This is the updated emergencia!!!');
    });

  });

  describe('DELETE /api/emergencias/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/emergencias/' + newEmergencia._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when emergencia does not exist', function(done) {
      request(app)
        .delete('/api/emergencias/' + newEmergencia._id)
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
