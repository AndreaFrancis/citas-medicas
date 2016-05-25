'use strict';

describe('Component: EmergenciaComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var EmergenciaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EmergenciaComponent = $componentController('EmergenciaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
