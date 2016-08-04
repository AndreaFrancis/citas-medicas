'use strict';

describe('Component: PersonaComponent', function () {

  // load the controller's module
  beforeEach(module('cosmilApp'));

  var PersonaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    PersonaComponent = $componentController('PersonaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
