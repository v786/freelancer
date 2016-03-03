'use strict';

describe('Controller: RegistrationSteponeCtrl', function () {

  // load the controller's module
  beforeEach(module('frApp'));

  var RegistrationSteponeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationSteponeCtrl = $controller('RegistrationSteponeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RegistrationSteponeCtrl.awesomeThings.length).toBe(3);
  });
});
