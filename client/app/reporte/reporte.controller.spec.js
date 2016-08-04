'use strict';

describe('Component: ReporteComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var ReporteComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ReporteComponent = $componentController('ReporteComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
