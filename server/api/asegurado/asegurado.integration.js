'use strict';

var app = require('../..');
import request from 'supertest';

var newAsegurado;

describe('Asegurado API:', function() {

  describe('GET /api/asegurados', function() {
    var asegurados;

    beforeEach(function(done) {
      request(app)
        .get('/api/asegurados')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          asegurados = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      asegurados.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/asegurados', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/asegurados')
        .send({
          name: 'New Asegurado',
          info: 'This is the brand new asegurado!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAsegurado = res.body;
          done();
        });
    });

    it('should respond with the newly created asegurado', function() {
      newAsegurado.name.should.equal('New Asegurado');
      newAsegurado.info.should.equal('This is the brand new asegurado!!!');
    });

  });

  describe('GET /api/asegurados/:id', function() {
    var asegurado;

    beforeEach(function(done) {
      request(app)
        .get('/api/asegurados/' + newAsegurado._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          asegurado = res.body;
          done();
        });
    });

    afterEach(function() {
      asegurado = {};
    });

    it('should respond with the requested asegurado', function() {
      asegurado.name.should.equal('New Asegurado');
      asegurado.info.should.equal('This is the brand new asegurado!!!');
    });

  });

  describe('PUT /api/asegurados/:id', function() {
    var updatedAsegurado;

    beforeEach(function(done) {
      request(app)
        .put('/api/asegurados/' + newAsegurado._id)
        .send({
          name: 'Updated Asegurado',
          info: 'This is the updated asegurado!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAsegurado = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAsegurado = {};
    });

    it('should respond with the updated asegurado', function() {
      updatedAsegurado.name.should.equal('Updated Asegurado');
      updatedAsegurado.info.should.equal('This is the updated asegurado!!!');
    });

  });

  describe('DELETE /api/asegurados/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/asegurados/' + newAsegurado._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when asegurado does not exist', function(done) {
      request(app)
        .delete('/api/asegurados/' + newAsegurado._id)
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
