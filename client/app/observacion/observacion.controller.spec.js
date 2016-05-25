'use strict';

describe('Component: ObservacionComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var ObservacionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ObservacionComponent = $componentController('ObservacionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
