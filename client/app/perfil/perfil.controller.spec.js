'use strict';

describe('Component: PerfilComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var PerfilComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PerfilComponent = $componentController('perfil', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
