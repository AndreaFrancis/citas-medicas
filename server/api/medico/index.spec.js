'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var medicoCtrlStub = {
  index: 'medicoCtrl.index',
  show: 'medicoCtrl.show',
  create: 'medicoCtrl.create',
  update: 'medicoCtrl.update',
  destroy: 'medicoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var medicoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './medico.controller': medicoCtrlStub
});

describe('Medico API Router:', function() {

  it('should return an express router instance', function() {
    medicoIndex.should.equal(routerStub);
  });

  describe('GET /api/medicos', function() {

    it('should route to medico.controller.index', function() {
      routerStub.get
        .withArgs('/', 'medicoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/medicos/:id', function() {

    it('should route to medico.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'medicoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/medicos', function() {

    it('should route to medico.controller.create', function() {
      routerStub.post
        .withArgs('/', 'medicoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/medicos/:id', function() {

    it('should route to medico.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'medicoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/medicos/:id', function() {

    it('should route to medico.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'medicoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/medicos/:id', function() {

    it('should route to medico.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'medicoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
