'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationStepthreeCtrl
 * @description
 * # RegistrationStepthreeCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RegistrationStepthreeCtrl', function ($rootScope, $scope, $http) {
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

    console.log('Object sent in get discount');
    console.log(responseObject);
    console.log(JSON.stringify(responseObject));

    $http({
      url : 'http://test.joinmyevent.com:8080/ems/ws/registration/applyDiscount/',
      data : responseObject,
      method : 'post'
    }).success(function(data){
      console.log('Object received in get discount');
      console.log(data);
      console.log(JSON.stringify(data));
    });

  });
