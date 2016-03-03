'use strict';

describe('Controller: RegistrationStepthreeCtrl', function () {

  // load the controller's module
  beforeEach(module('frApp'));

  var RegistrationStepthreeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistrationStepthreeCtrl = $controller('RegistrationStepthreeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RegistrationStepthreeCtrl.awesomeThings.length).toBe(3);
  });
});
