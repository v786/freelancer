'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:IndexCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('IndexCtrl', function ($scope) {
    $scope.image = {};

    /* Debug */
    $scope.image = {
      show : true,
      src : 'images/demoBG.jpeg'
    };

    //production use some method like $http ;

  });
