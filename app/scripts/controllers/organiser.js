'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:OrganiserCtrl
 * @description
 * # OrganiserCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('OrganiserCtrl', function ($scope) {
    $scope.organiser = {};

    /* Debug */
    $scope.organiser = {
      manager : 'Mandar Varadkar',
      location : 'Jogeshwari east',
      phone : '9869460225',
      email : 'mandar.varadkar@gmail.com'
    };

  });
