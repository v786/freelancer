'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:IndexCtrl
 * @description
 * # IndexctrlCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('IndexCtrl', function ($scope, getJsonFromServer, $log) {
    $scope.image = {};

    //production use some method like $http ;
    getJsonFromServer.success(function(data){

  /**************************************  IMPORTANT  *********************************************
  *                                                                                               *
  * BUG : data.response.image contains both foreward and backward slashes which are recognised as *
  *       'escape sequence' by angular when added as dynamic source.                              *
  * FIX : coverting all backward slash to forward slash                                           *
  *                                                                                               *
  *************************************************************************************************/

      if(data.response.programHeaderImage){
        data.response.programHeaderImage = data.response.programHeaderImage.replace(/\\/g, "/");
      }

      $log.debug(data.response);

      $scope.eventName = data.response.programName;
      $scope.image = {
        show : (function(){
          return data.response.programHeaderImage ? true : false;
        })(),
        src : data.response.programHeaderImage
      };
    });

  });
