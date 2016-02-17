'use strict';

/**
 * @ngdoc service
 * @name frApp.getJsonFromServer
 * @description
 * # getJsonFromServer
 * Factory in the frApp.
 */
angular.module('frApp')
  .factory('getJsonFromServer', function ($http, $log, $q, $rootScope, $location) {
    console.log($location.search().path);
    $rootScope.resourceUrl = $location.search().path ;
  //http://test.joinmyevent.com:8080/ems/ws/registration/causeathon
    var deferred = $q.defer();
    if($rootScope.JTemp){
      deferred.resolve($rootScope.JTemp);
    }else {
      console.log($rootScope.resourceUrl);
      if($rootScope.resourceUrl){
        $http.get($rootScope.resourceUrl)
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
      else {
        deferred.reject("invalid resource parameter");
        $location.path('IAmLost');
      }
    }
    return deferred.promise;
  });