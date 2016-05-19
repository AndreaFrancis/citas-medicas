'use strict';

var app = require('../..');
import request from 'supertest';

var newMedico;

describe('Medico API:', function() {

  describe('GET /api/medicos', function() {
    var medicos;

    beforeEach(function(done) {
      request(app)
        .get('/api/medicos')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          medicos = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      medicos.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/medicos', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/medicos')
        .send({
          name: 'New Medico',
          info: 'This is the brand new medico!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMedico = res.body;
          done();
        });
    });

    it('should respond with the newly created medico', function() {
      newMedico.name.should.equal('New Medico');
      newMedico.info.should.equal('This is the brand new medico!!!');
    });

  });

  describe('GET /api/medicos/:id', function() {
    var medico;

    beforeEach(function(done) {
      request(app)
        .get('/api/medicos/' + newMedico._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          medico = res.body;
          done();
        });
    });

    afterEach(function() {
      medico = {};
    });

    it('should respond with the requested medico', function() {
      medico.name.should.equal('New Medico');
      medico.info.should.equal('This is the brand new medico!!!');
    });

  });

  describe('PUT /api/medicos/:id', function() {
    var updatedMedico;

    beforeEach(function(done) {
      request(app)
        .put('/api/medicos/' + newMedico._id)
        .send({
          name: 'Updated Medico',
          info: 'This is the updated medico!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMedico = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedico = {};
    });

    it('should respond with the updated medico', function() {
      updatedMedico.name.should.equal('Updated Medico');
      updatedMedico.info.should.equal('This is the updated medico!!!');
    });

  });

  describe('DELETE /api/medicos/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/medicos/' + newMedico._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when medico does not exist', function(done) {
      request(app)
        .delete('/api/medicos/' + newMedico._id)
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
