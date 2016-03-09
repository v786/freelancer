'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RescueCtrl
 * @description
 * # RescueCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RescueCtrl', function ($scope, $routeParams, $http) {
    var orderId = $routeParams['orderId'] ;
    console.log(orderId);

    /* Please replace Url below with API name */
    $http.get(window.appURLprifix + '/rescueAPI').success(function(dat){
      console.log(dat);
    });

  });
