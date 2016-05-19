'use strict';

describe('Component: MedicoComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var MedicoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MedicoComponent = $componentController('MedicoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
