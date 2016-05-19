'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var emergenciaCtrlStub = {
  index: 'emergenciaCtrl.index',
  show: 'emergenciaCtrl.show',
  create: 'emergenciaCtrl.create',
  update: 'emergenciaCtrl.update',
  destroy: 'emergenciaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var emergenciaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './emergencia.controller': emergenciaCtrlStub
});

describe('Emergencia API Router:', function() {

  it('should return an express router instance', function() {
    emergenciaIndex.should.equal(routerStub);
  });

  describe('GET /api/emergencias', function() {

    it('should route to emergencia.controller.index', function() {
      routerStub.get
        .withArgs('/', 'emergenciaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/emergencias/:id', function() {

    it('should route to emergencia.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'emergenciaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/emergencias', function() {

    it('should route to emergencia.controller.create', function() {
      routerStub.post
        .withArgs('/', 'emergenciaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/emergencias/:id', function() {

    it('should route to emergencia.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'emergenciaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/emergencias/:id', function() {

    it('should route to emergencia.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'emergenciaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/emergencias/:id', function() {

    it('should route to emergencia.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'emergenciaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
