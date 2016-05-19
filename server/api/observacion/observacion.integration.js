'use strict';

var app = require('../..');
import request from 'supertest';

var newObservacion;

describe('Observacion API:', function() {

  describe('GET /api/observaciones', function() {
    var observacions;

    beforeEach(function(done) {
      request(app)
        .get('/api/observaciones')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          observacions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      observacions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/observaciones', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/observaciones')
        .send({
          name: 'New Observacion',
          info: 'This is the brand new observacion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newObservacion = res.body;
          done();
        });
    });

    it('should respond with the newly created observacion', function() {
      newObservacion.name.should.equal('New Observacion');
      newObservacion.info.should.equal('This is the brand new observacion!!!');
    });

  });

  describe('GET /api/observaciones/:id', function() {
    var observacion;

    beforeEach(function(done) {
      request(app)
        .get('/api/observaciones/' + newObservacion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          observacion = res.body;
          done();
        });
    });

    afterEach(function() {
      observacion = {};
    });

    it('should respond with the requested observacion', function() {
      observacion.name.should.equal('New Observacion');
      observacion.info.should.equal('This is the brand new observacion!!!');
    });

  });

  describe('PUT /api/observaciones/:id', function() {
    var updatedObservacion;

    beforeEach(function(done) {
      request(app)
        .put('/api/observaciones/' + newObservacion._id)
        .send({
          name: 'Updated Observacion',
          info: 'This is the updated observacion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedObservacion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedObservacion = {};
    });

    it('should respond with the updated observacion', function() {
      updatedObservacion.name.should.equal('Updated Observacion');
      updatedObservacion.info.should.equal('This is the updated observacion!!!');
    });

  });

  describe('DELETE /api/observaciones/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/observaciones/' + newObservacion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when observacion does not exist', function(done) {
      request(app)
        .delete('/api/observaciones/' + newObservacion._id)
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
