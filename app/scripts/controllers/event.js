'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('EventCtrl', function ($scope, $sce, getJsonFromServer, ngDialog) {
    $scope.event = {};

    //production use some method like $http ;
    getJsonFromServer.then(function(data){
      $scope.event = {
        eventDate: data.response.programDisplayDate,
        eventTime: data.response.programDisplayTime,
        address :  data.response.programAddress,
        position : {
          latitude : data.response.mapDetails.latitude,
          longitude : data.response.mapDetails.longitude,
          zoom : data.response.mapDetails.zoom
        },
        htmlContent : data.response.programDescription,
        description : function(){
          return $sce.trustAsHtml($scope.event.htmlContent);
        }
      };
      $scope.organiser = {
        manager : data.response.organizerDetails.organizerName,
        location : data.response.organizerDetails.address1 + (function(){
          return data.response.organizerDetails.address2 ? ", " + data.response.organizerDetails.address1 : "" ;
        })() ,
        phone : data.response.organizerDetails.phone || "Not Available" ,
        email : data.response.organizerDetails.emailId || "Not Available"
      };
      $scope.ShowOrganiserDetails = function () {
        ngDialog.open({ template: 'views/organiser.html' });
      };
      $scope.ShowOnMaps = function () {
        ngDialog.open({ template: 'views/map.html' });
      };
    });


  });
