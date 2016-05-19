'use strict';

describe('Component: EspecialidadComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var EspecialidadComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EspecialidadComponent = $componentController('EspecialidadComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
