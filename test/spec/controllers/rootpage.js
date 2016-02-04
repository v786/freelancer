'use strict';

describe('Controller: RootpagectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('frApp'));

  var RootpagectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RootpagectrlCtrl = $controller('RootpagectrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RootpagectrlCtrl.awesomeThings.length).toBe(3);
  });
});
