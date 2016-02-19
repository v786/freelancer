'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:IndexCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('IndexCtrl', function ($scope, getJsonFromServer, $rootScope) {
    $scope.image = {};

    //production use some method like $http ;
    getJsonFromServer.then(function(data){

  /**************************************  IMPORTANT  *********************************************
  *                                                                                               *
  * BUG : data.response.image contains both forward and backward slashes which are recognised as *
  *       'escape sequence' by angular when added as dynamic source.                              *
  * FIX : coverting all backward slash to forward slash                                           *
  *                                                                                               *
  *************************************************************************************************/

      if(data.response.programHeaderImage){
        data.response.programHeaderImage = data.response.programHeaderImage.replace(/\\/g, "/");
      }

      $scope.eventName = data.response.programName;
      $scope.image = {
        show : (function(){
          return data.response.programHeaderImage ? true : false;
        })(),
        src : data.response.programHeaderImage
      };
    });

    $rootScope.NavigationBar = 'topEnabled';

  });
