'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var especialidadCtrlStub = {
  index: 'especialidadCtrl.index',
  show: 'especialidadCtrl.show',
  create: 'especialidadCtrl.create',
  update: 'especialidadCtrl.update',
  destroy: 'especialidadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var especialidadIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './especialidad.controller': especialidadCtrlStub
});

describe('Especialidad API Router:', function() {

  it('should return an express router instance', function() {
    especialidadIndex.should.equal(routerStub);
  });

  describe('GET /api/especialidades', function() {

    it('should route to especialidad.controller.index', function() {
      routerStub.get
        .withArgs('/', 'especialidadCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/especialidades/:id', function() {

    it('should route to especialidad.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'especialidadCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/especialidades', function() {

    it('should route to especialidad.controller.create', function() {
      routerStub.post
        .withArgs('/', 'especialidadCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/especialidades/:id', function() {

    it('should route to especialidad.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'especialidadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/especialidades/:id', function() {

    it('should route to especialidad.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'especialidadCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/especialidades/:id', function() {

    it('should route to especialidad.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'especialidadCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
