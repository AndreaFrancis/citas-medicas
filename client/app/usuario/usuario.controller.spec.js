'use strict';

describe('Component: UsuarioComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var UsuarioComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    UsuarioComponent = $componentController('UsuarioComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
