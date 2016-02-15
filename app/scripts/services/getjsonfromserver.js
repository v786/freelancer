'use strict';

/**
 * @ngdoc service
 * @name frApp.getJsonFromServer
 * @description
 * # getJsonFromServer
 * Factory in the frApp.
 */
angular.module('frApp')
  .factory('getJsonFromServer', function ($http, $log, $q, $rootScope) {
    var deferred = $q.defer();
    if($rootScope.JTemp){
      deferred.resolve($rootScope.JTemp);
    }else {
      $http.get('http://test.joinmyevent.com:8080/ems/ws/registration/causeathon')
        .success(function(data){
          $log.debug(data);
          $rootScope.JTemp = data;
          deferred.resolve(data);
        }).error(function(e){
        $log.error(e);
        deferred.reject(e);
        alert('error occurred, check log');
      });
    }
    return deferred.promise;
  });
