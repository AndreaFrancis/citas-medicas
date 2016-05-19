'use strict';

describe('Component: ReservaComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var ReservaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ReservaComponent = $componentController('ReservaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
