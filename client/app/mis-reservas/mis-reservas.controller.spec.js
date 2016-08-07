'use strict';

describe('Component: MisReservasComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var MisReservasComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MisReservasComponent = $componentController('mis-reservas', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
