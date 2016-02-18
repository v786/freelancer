'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('BuyCtrl', function ($scope, getJsonFromServer) {

    $scope.tickets = {
      category : [],
      totalTicketSelected : 0
    };

    /*
     ageFrom: 20
     ageTo: 55
     discount: false
     discountMaster: Object
     discountPrice: 0
     isDeleted: 0
     maxTicketsPerTransaction: 9
     minTicketsPerTransaction: 1
     noOfTickets: 0
     price: 0
     refundable: false
     salesEndDate: 1459362600000
     salesStartDate: 1439749800000
     tdrId: 1
     ticketDates: Array[4]
     ticketId: 1131
     ticketName: "7 Km"
     ticketPrice: 400
     ticketSelected: false
     totalTickets: 500
     */

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

      console.log($scope.tickets);
    });

    $scope.updateTotalCost = function(){
      $scope.tickets.netCost = 0 ;
      $scope.tickets.totalTicketSelected = 0;
      $scope.tickets.category.forEach(function(e){
        $scope.tickets.netCost += parseInt(e.ticketsSelectedWithinCategory) * parseInt(e.ticketPrice) ;
        $scope.tickets.totalTicketSelected += parseInt(e.ticketsSelectedWithinCategory) ;
      });
    };


  });
