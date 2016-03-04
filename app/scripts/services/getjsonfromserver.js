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
    $rootScope.resourceUrl = window.appURLprifix + '/ws/registration/'+ ($location.search().eun || window.appName) ;
    //result should look like http://test.joinmyevent.com:8080/ems/ws/registration/causeathon
    var deferred = $q.defer();
    if($rootScope.JTemp){
      deferred.resolve($rootScope.JTemp);
    }else {
      if($rootScope.resourceUrl){
        $http.get($rootScope.resourceUrl)
          .success(function(data){
            //$log.info(data);
            if (data.response){
              $rootScope.JTemp = data;
              deferred.resolve(data);
            }else {
              $location.path('invalidResourceParameter');
            }
          }).error(function(e){
          $log.error(e);
          deferred.reject(e);
          alert('error occurred, check log');
          $location.path('invalidResourceParameter');
        });
      }
      else {
        deferred.reject("invalid resource parameter");
        $location.path('invalidResourceParameter');
      }
    }
    return deferred.promise;
  });
