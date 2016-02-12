'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:IndexCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('IndexCtrl', function ($scope, getJsonFromServer) {
    $scope.image = {};

    //production use some method like $http ;
    getJsonFromServer.success(function(data){
      $scope.image = {
        show : (function(){
          return data.programHeaderImage ? true : false;
        })(),
        src : data.programHeaderImage
      };
    })

  });
