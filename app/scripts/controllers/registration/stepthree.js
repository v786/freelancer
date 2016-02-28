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


    var responseObject  = {
      'ticketDetails': angular.copy($rootScope.$tickets),
      'participantDetails':[]
    };

    responseObject.ticketDetails.forEach(function(e){
      e.$participantInformation.forEach(function(f){
        var k = {'order' : angular.copy($rootScope.InstanceTicketJson.registrationData)};
        for (var j in f){
          if (f.hasOwnProperty(j) && !j.match(/([\$])\w+/g) && !j.match(/formly_\w+/)){
            k[j] = f[j];
          }
        }
        k['tdrId'] = e['tdrId'];
        responseObject.participantDetails.push(k);
      });
      delete e.$participantInformation;
      delete e.vm;
      delete e.participantInformation;
    });

    console.log(responseObject);


  });
