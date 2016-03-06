'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationStepthreeCtrl
 * @description
 * # RegistrationStepthreeCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RegistrationStepthreeCtrl', function ($rootScope, $scope, $http, $location) {
    $scope.BillingUserDetails = $rootScope.BillingUserDetails;
    $scope.ParticipantDetails = $rootScope.ParticipantDetails;
    $scope.netCost = $rootScope.NETCOST;
    $scope.discount = false ;
    $scope.discountedCost = false;
    $scope.location = $location;

    var headers =[];

    $scope.ParticipantDetails.forEach(function(e){
      for (var i in e){
        if (e.hasOwnProperty(i) && headers.indexOf(i)<0 && !i.match(/\$[\w+]/)){
          headers.push(i);
        }
      }
    });

    $scope.headers = headers;
    $scope.showDiscountButton = false;

    $rootScope.$tickets.forEach(function(e) {
      if (e.discount) {
        $scope.showDiscountButton = true;
      }
    });

    var responseObject  = {
      'ticketDetails': angular.copy($rootScope.$tickets),
      'participantDetails':[]
      //'buyerDetails': angular.copy($scope.BillingUserDetails)
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
        k['ticketAmount'] = e['ticketPrice'];
        k['ticketId'] = e['ticketId'];
        responseObject.participantDetails.push(k);
      });
      delete e.$participantInformation;
      delete e.vm;
      delete e.participantInformation;
    });

    responseObject.participantDetails.forEach(function(e){
      for (var i in e){
        if(e.hasOwnProperty(i) && $rootScope.thisHasAdditionalFields[i]){
          if(!e.participantDetailsAdditionalList){
            e['participantDetailsAdditionalList'] = new Array();
          }
          e.participantDetailsAdditionalList.push({
            "participantDetailsAdditionalId": $rootScope.thisHasAdditionalFields[i],
            "participantValue": e[i]
          });
          delete e[i];
        }
      }

    });

    console.log('Object sent in get discount');
    console.log(responseObject);
    //console.log($rootScope.thisHasAdditionalFields);
    //console.log(JSON.stringify(responseObject));

    $scope.ApplyDiscountOnClick = function(argument) {
      $http({
        url : window.appURLprifix + '/ws/registration/applyDiscount/',
        data : responseObject,
        method : 'post'
      }).success(function(data){
        console.log('Object received in get discount');
        console.log(data);
        //console.log(JSON.stringify(data));

        /* SOME LOGIC TO IMPLEMENT DISCOUNT*/
        /* ToDo :
        $scope.discount = SOMETHING ;
        $scope.discountedCost = $scope.netCost - $scope.discount;
        */

      });
    };

    var submitFinalObject = angular.copy(responseObject);
    //delete submitFinalObject.ticketDetails;
    submitFinalObject['buyerDetails'] = angular.copy($scope.BillingUserDetails);
    //var requiredFieldsOnly = ['email','firstName','lastName','mobileNo'];
    for( var z in submitFinalObject.buyerDetails){
      if (submitFinalObject.buyerDetails.hasOwnProperty(z) && z.match(/\$[\w]+/g)){
        delete submitFinalObject.buyerDetails[z];
      }
    }

    console.log('Object to be sent in submit');
    console.log(submitFinalObject);

    $scope.SaveThisInstanceData = function() {
      $http({
        url : window.appURLprifix + '/ws/registration/saveParticipant/'+$rootScope.InstanceTicketJson.registrationData.orderId+'/',
        data : submitFinalObject,
        method : 'post'
      }).success(function(data){
        console.log('Object received after POST submit');
        console.log(data);
      });
    };

  });
