'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RescueCtrl
 * @description
 * # RescueCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RebookCtrl', function ($scope, $routeParams, $http, $rootScope, $location, $q) {
    var orderId = $routeParams['orderId'] ;
    var email = $routeParams['email'] ;
    $scope.location = $location;

    /* Please replace Url below with API name */
    $http.get(window.appURLprifix + '/ws/registration/getRegistration/'+orderId+'/'+ email +'/')
      .success(function(dat){
        console.log(dat);
        $rootScope.RescueSubmit = dat.response ;
        $rootScope.RescueOrderId = orderId ;
        $scope.BillingUserDetails = angular.copy(dat.response.buyerDetails) ;
        $scope.ParticipantDetails = angular.copy(dat.response.participantDetails);
        $scope.tickets = angular.copy(dat.response.ticketDetails);
        $scope.netCost = (function(){
          var price = 0 ;
          dat.response.ticketDetails.forEach(function(e){
            price += e.ticketPrice;
          });
          return price;
        })();
        $scope.discount = (function(){
          var discount = 0 ;
          dat.response.participantDetails.forEach(function(e){
            if (e.discountAmount){
              discount += e.discountAmount;
            }
          });
          return discount;
        })() ;
        $scope.discountedCost = $scope.netCost - $scope.discount;
        (function(){
          var index = 0 ;
          $scope.tickets.forEach(function(e) {
            for (var i=0; i<e.noOfTickets; i++){
              $scope.ParticipantDetails[index].ticketName = e.ticketName;
              $scope.ParticipantDetails[index].ticketPrice = e.ticketPrice;
              index++;
            }
          });
        })();
        console.log($scope.ParticipantDetails);
        $scope.showDiscountButton = false;

        $scope.tickets.forEach(function(e) {
          if(e.discountMasterList != null) {
            if (e.discountMasterList.length > 0) {
              $scope.showDiscountButton = true;
            }
          }
        });

        var responseObject  = angular.copy(dat.response);
        console.log('Object sent in get discount');
        console.log(responseObject);

        var deferredDiscount = $q.defer();
        $scope.IsDiscountApplied = false;
        $scope.IsDiscountButtonClicked = false;
        $scope.ApplyDiscountOnClick = function() {
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

        var submitFinalObject = angular.copy(dat.response);

        /* BUG RESOLVE : Update discount whe receive discount from server */
        deferredDiscount.promise.then(function(data){
          data.response.forEach(function(e,i){
            if(e.discountAmount){
              submitFinalObject.participantDetails[i].discountAmount = e.discountAmount;
            }
          });
          console.log('UPDATED Object to be sent in submit : ');
          console.log(submitFinalObject);

          /* BUG resolve: Update discount in verify page*/
          data.response.forEach(function(e,i){
            $scope.ParticipantDetails[i]['discount'] = e.discountAmount;
          });
          console.log($scope.ParticipantDetails);

        });

        console.log('Object to be sent in submit');
        console.log(submitFinalObject);

        $scope.IsSubmitButtonDisabled = false;
        $scope.SaveThisInstanceData = function() {
          $scope.IsSubmitButtonDisabled = true;
          $http({
            url : window.appURLprifix + '/ws/registration/goToPayment/' + orderId + '/',
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

  });
