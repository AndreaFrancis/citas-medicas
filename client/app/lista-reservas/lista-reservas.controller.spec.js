'use strict';

describe('Component: ListaReservasComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var ListaReservasComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ListaReservasComponent = $componentController('lista-reservas', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
