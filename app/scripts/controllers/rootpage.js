'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RootpagectrlCtrl
 * @description
 * # RootpagectrlCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RootpagectrlCtrl', function ($scope, $log) {
    $scope.tab = 'event' ;
    $scope.setTabActive = function(tab){
      $scope.tab = tab ;
      //$log.debug(tab);
    }
  });
