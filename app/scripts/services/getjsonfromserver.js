'use strict';

/**
 * @ngdoc service
 * @name frApp.getJsonFromServer
 * @description
 * # getJsonFromServer
 * Factory in the frApp.
 */
angular.module('frApp')
  .factory('getJsonFromServer', function ($http, $log) {
    return $http.get('http://test.joinmyevent.com:8080/ems/ws/registration/causeathon')
      .success(function(data){
        return data ;
      }).error(function(e){
        $log.error(e);
        alert('error occurred, check log');
      });
  });
