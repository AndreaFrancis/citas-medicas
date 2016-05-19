'use strict';

describe('Component: AseguradoComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var AseguradoComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AseguradoComponent = $componentController('AseguradoComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
