'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('BuyCtrl', function ($scope) {
    $scope.tickets = {} ;
    $scope.tickets = {
      category : [
        { type : '7 km' , price: 400.0 },
        { type : 'General' , price: 200.0 },
        { type : 'Children' , price: 0.0 },
        { type : 'Child With Autism' , price: 0.0 }
      ],
      totalTicketSelected : 0,
      netCost : 0 ,
      sellStartDate : 'Jan 23,2015',
      sellEndDate : 'December 25, 2016'
    };

    $scope.tickets.category.forEach(function(e){
      e.tckt = '0';
    });

    $scope.updateTotalCost = function(){
      $scope.tickets.netCost = 0 ;
      $scope.tickets.totalTicketSelected = 0;
      $scope.tickets.category.forEach(function(e){
        $scope.tickets.netCost += parseInt(e.tckt) * parseInt(e.price) ;
        $scope.tickets.totalTicketSelected += parseInt(e.tckt) ;
      });
    };

    $scope.updateTotalCostOnMobileView = function(){
      $scope.tickets.category.forEach(function(ele){
        if (ele.type == $scope.mobileForm.selectCategory){
          ele.tckt = $scope.mobileForm.selectQuantity || 0;
        }
      });
      $scope.updateTotalCost();
    };

    $scope.setMobileViewDataStructuresToZero = function(){
      $scope.mobileForm.selectCategory = '0' ;
      $scope.mobileForm.selectQuantity = '0' ;
    }

  });
