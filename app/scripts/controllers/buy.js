'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('BuyCtrl', function ($scope, getJsonFromServer, $http, $location, $rootScope) {

    $scope.tickets = {
      category : [],
      totalTicketSelected : 0
    };

    getJsonFromServer.then(function(data){

      data.response.ticketDetails.forEach(function(ele){
        $scope.tickets.category.push(ele);
      });

      $scope.tickets.category.forEach(function(e){
        e.ticketsSelectedWithinCategory = '0';
        e.selectOptionArray = []; // sets up array for "maxTicketsPerTransaction" to "minTicketsPerTransaction"
        for(var z = e.minTicketsPerTransaction; z <= e.maxTicketsPerTransaction; z++){
          e.selectOptionArray.push(z);
        }
        e.currentDatetime = Date.now();
        e.TicketSaleStatus = (function(){
          if(e.currentDatetime < e.salesStartDate){
            e.ShowThisTicket = false;
            return "Sale Not Started" ;
          }else if(e.currentDatetime > e.salesEndDate){
            e.ShowThisTicket = false;
            return "Sale has ended" ;
          }else {
            e.ShowThisTicket = true;
            return "Sale is active" ;
          }
        })();
      });
    });

    $scope.updateTotalCost = function(){
      $scope.tickets.netCost = 0 ;
      $scope.tickets.totalTicketSelected = 0;
      $scope.tickets.category.forEach(function(e){
        $scope.tickets.netCost += parseInt(e.ticketsSelectedWithinCategory) * parseInt(e.ticketPrice) ;
        $scope.tickets.totalTicketSelected += parseInt(e.ticketsSelectedWithinCategory) ;
      });
    };

    $scope.proceedToNextStep = function(email){
      if(email){
        var ticketArray = $scope.tickets.category;
        ticketArray.forEach(function(e){
          e.noOfTickets = e.ticketsSelectedWithinCategory ;
          e.ticketSelected = e.noOfTickets > 0;
        });
        $http({
          url : 'http://test.joinmyevent.com:8080/ems/ws/registration/'+email,
          method : 'POST',
          data : ticketArray
        }).success(function(data){
          $rootScope.InstanceTicketJson = data;
          console.log(data);
          $location.path('RegistrationDetails');
        }).error(function(e){
          console.log(e);
        });
      }else {
        alert("Enter valid email id !");
      }

    };


  });
