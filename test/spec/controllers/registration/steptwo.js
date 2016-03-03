'use strict';

describe('Controller: RegistrationSteptwoCtrl', function () {

  // load the controller's module
  beforeEach(module('frApp'));

  var RegistrationSteptwoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationSteptwoCtrl = $controller('RegistrationSteptwoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RegistrationSteptwoCtrl.awesomeThings.length).toBe(3);
  });
});
