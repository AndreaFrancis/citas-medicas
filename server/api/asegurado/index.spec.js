'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var aseguradoCtrlStub = {
  index: 'aseguradoCtrl.index',
  show: 'aseguradoCtrl.show',
  create: 'aseguradoCtrl.create',
  update: 'aseguradoCtrl.update',
  destroy: 'aseguradoCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var aseguradoIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './asegurado.controller': aseguradoCtrlStub
});

describe('Asegurado API Router:', function() {

  it('should return an express router instance', function() {
    aseguradoIndex.should.equal(routerStub);
  });

  describe('GET /api/asegurados', function() {

    it('should route to asegurado.controller.index', function() {
      routerStub.get
        .withArgs('/', 'aseguradoCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/asegurados/:id', function() {

    it('should route to asegurado.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'aseguradoCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/asegurados', function() {

    it('should route to asegurado.controller.create', function() {
      routerStub.post
        .withArgs('/', 'aseguradoCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/asegurados/:id', function() {

    it('should route to asegurado.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'aseguradoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/asegurados/:id', function() {

    it('should route to asegurado.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'aseguradoCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/asegurados/:id', function() {

    it('should route to asegurado.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'aseguradoCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
