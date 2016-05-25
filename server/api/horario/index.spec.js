'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var horarioCtrlStub = {
  index: 'horarioCtrl.index',
  show: 'horarioCtrl.show',
  create: 'horarioCtrl.create',
  update: 'horarioCtrl.update',
  destroy: 'horarioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var horarioIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './horario.controller': horarioCtrlStub
});

describe('Horario API Router:', function() {

  it('should return an express router instance', function() {
    horarioIndex.should.equal(routerStub);
  });

  describe('GET /api/horarios', function() {

    it('should route to horario.controller.index', function() {
      routerStub.get
        .withArgs('/', 'horarioCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/horarios/:id', function() {

    it('should route to horario.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'horarioCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/horarios', function() {

    it('should route to horario.controller.create', function() {
      routerStub.post
        .withArgs('/', 'horarioCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/horarios/:id', function() {

    it('should route to horario.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'horarioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/horarios/:id', function() {

    it('should route to horario.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'horarioCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/horarios/:id', function() {

    it('should route to horario.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'horarioCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
