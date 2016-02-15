'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:OrganiserCtrl
 * @description
 * # OrganiserCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('OrganiserCtrl', function ($scope,getJsonFromServer) {
    $scope.organiser = {};

    getJsonFromServer.then(function(data) {
      $scope.organiser = {
        manager : data.response.organizerDetails.organizerName,
        location : data.response.organizerDetails.address1 + (function(){
          return data.response.organizerDetails.address2 ? ", " + data.response.organizerDetails.address1 : "" ;
        })() ,
        phone : data.response.organizerDetails.phone || "Not Available" ,
        email : data.response.organizerDetails.emailId || "Not Available"
      };
    });

  });
