'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationStepthreeCtrl
 * @description
 * # RegistrationStepthreeCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RegistrationStepthreeCtrl', function ($rootScope, $scope) {
    $scope.BillingUserDetails = $rootScope.BillingUserDetails;
    $scope.ParticipantDetails = $rootScope.ParticipantDetails;
    var headers =[];

    $scope.ParticipantDetails.forEach(function(e){
      for (var i in e){
        if (e.hasOwnProperty(i) && headers.indexOf(i)<0 && !i.match(/\$[\w+]/)){
          headers.push(i);
        }
      }
    });

    $scope.headers = headers;

  });
