'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationStepthreeCtrl
 * @description
 * # RegistrationStepthreeCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RegistrationStepthreeCtrl', function ($rootScope, $scope, $http, $location, $q) {
    $scope.BillingUserDetails = $rootScope.BillingUserDetails;
    $scope.ParticipantDetails = $rootScope.ParticipantDetails;
    $scope.netCost = $rootScope.NETCOST;
    $scope.discount = 0 ;
    $scope.discountedCost = $scope.netCost;
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
      if (e.discountMasterList.length > 0) {
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
        k['discountAmount'] = 0;
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
            "participantId": $rootScope.thisHasAdditionalFields[i],
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

    var deferredDiscount = $q.defer();
    $scope.IsDiscountApplied = false;
    $scope.IsDiscountButtonClicked = false;
    $scope.ApplyDiscountOnClick = function(argument) {
      $scope.IsDiscountButtonClicked = true;
      $http({
        url : window.appURLprifix + '/ws/registration/applyDiscount/',
        data : responseObject,
        method : 'post'
      }).success(function(data){
        console.log('Object received in get discount');
        console.log(data);
        //console.log(JSON.stringify(data));

        /* SOME LOGIC TO IMPLEMENT DISCOUNT*/
        /* ToDo : */
        deferredDiscount.resolve(data);
        $scope.IsDiscountApplied = true;
        $scope.discount = (function(){
          var Discount = 0;
          data.response.forEach(function(e){
            if(e.discountAmount){
              Discount += e.discountAmount;
            }
          });
          return Discount;
        })() ;
        $scope.discountedCost = $scope.netCost - $scope.discount;

      });
    };

    var submitFinalObject = angular.copy(responseObject);
    //delete submitFinalObject.ticketDetails;
    submitFinalObject['buyerDetails'] = angular.copy($scope.BillingUserDetails);
    var requiredFieldsOnly = ['email','firstName','lastName','mobileNo'];
    for( var z in submitFinalObject.buyerDetails){
      if (submitFinalObject.buyerDetails.hasOwnProperty(z) && (z.match(/\$[\w]+/g) || requiredFieldsOnly.indexOf(z) < 0)){
        delete submitFinalObject.buyerDetails[z];
      }
    }

    /* BUG RESOLVE : server needs field "phoneNo" instead of "mobileNo" used elsewhere in program */
    submitFinalObject.buyerDetails['phoneNo'] = submitFinalObject.buyerDetails['mobileNo'];
    delete submitFinalObject.buyerDetails['mobileNo'];

    /* BUG RESOLVE : Update discount whe receive discount from server */
    deferredDiscount.promise.then(function(data){
      data.response.forEach(function(e,i){
        if(e.discountAmount){
          submitFinalObject.participantDetails[i].discountAmount = e.discountAmount;
        }
      });
      console.log('UPDATED Object to be sent in submit : ');
      console.log(submitFinalObject);
    });

    console.log('Object to be sent in submit');
    console.log(submitFinalObject);

    $scope.IsSubmitButtonDisabled = false;
    $scope.SaveThisInstanceData = function() {
      $scope.IsSubmitButtonDisabled = true;
      $http({
        url : window.appURLprifix + '/ws/registration/saveParticipant/'+$rootScope.InstanceTicketJson.registrationData.orderId+'/',
        data : submitFinalObject,
        method : 'post'
      }).success(function(data){
        console.log('Object received after POST submit');
        console.log(data);
		 $rootScope.payuData = data.response;
  	      $location.path("payu/"+ $rootScope.payuData.transactionId+"/"+ $rootScope.payuData.buyerId);
      });
    };

  });
