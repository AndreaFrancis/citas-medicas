'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var observacionCtrlStub = {
  index: 'observacionCtrl.index',
  show: 'observacionCtrl.show',
  create: 'observacionCtrl.create',
  update: 'observacionCtrl.update',
  destroy: 'observacionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var observacionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './observacion.controller': observacionCtrlStub
});

describe('Observacion API Router:', function() {

  it('should return an express router instance', function() {
    observacionIndex.should.equal(routerStub);
  });

  describe('GET /api/observaciones', function() {

    it('should route to observacion.controller.index', function() {
      routerStub.get
        .withArgs('/', 'observacionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/observaciones/:id', function() {

    it('should route to observacion.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'observacionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/observaciones', function() {

    it('should route to observacion.controller.create', function() {
      routerStub.post
        .withArgs('/', 'observacionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/observaciones/:id', function() {

    it('should route to observacion.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'observacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/observaciones/:id', function() {

    it('should route to observacion.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'observacionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/observaciones/:id', function() {

    it('should route to observacion.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'observacionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
