'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('EventCtrl', function (NgMap, $scope) {
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
  });
