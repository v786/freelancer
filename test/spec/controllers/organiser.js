'use strict';

describe('Controller: OrganiserCtrl', function () {

  // load the controller's module
  beforeEach(module('frApp'));

  var OrganiserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrganiserCtrl = $controller('OrganiserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrganiserCtrl.awesomeThings.length).toBe(3);
  });
});
