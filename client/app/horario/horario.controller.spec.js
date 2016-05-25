'use strict';

describe('Component: HorarioComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var HorarioComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    HorarioComponent = $componentController('HorarioComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
