'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('BuyCtrl', function ($scope, getJsonFromServer, $http, $location, $rootScope, $filter) {

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
            var beautifulDate = $filter('date')(e.salesStartDate, 'dd-MMM-yyyy');
            console.log('start date = '+ beautifulDate);
            return "Opens on "+beautifulDate ;
          }else if(e.currentDatetime > e.salesEndDate){
            e.ShowThisTicket = false;
            return "Closed" ;
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
          url : window.appURLprifix + '/ws/registration/'+email+'/',
          method : 'POST',
          data : ticketArray
        }).success(function(data){
          $rootScope.InstanceTicketJson = data;
          console.log(data);
          $rootScope.NETCOST = angular.copy($scope.tickets.netCost);
          $location.path('/registration/participant');
        }).error(function(e){
          console.log(e);
        });
      }else {
        $scope.ShowDirtyEmailAlert = 'true';
      }

    };

  });
