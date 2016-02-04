'use strict';

/**
 * @ngdoc overview
 * @name frApp
 * @description
 * # frApp
 *
 * Main module of the application.
 */
angular
  .module('frApp', ['ngRoute', 'ngMap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/event', {
        templateUrl: 'views/event.html',
        controller: 'EventCtrl',
        controllerAs: 'event'
      })
      .when('/organiser', {
        templateUrl: 'views/organiser.html',
        controller: 'OrganiserCtrl',
        controllerAs: 'organiser'
      })
      .when('/buy', {
        templateUrl: 'views/buy.html',
        controller: 'BuyCtrl',
        controllerAs: 'buy'
      })
      .otherwise({
        redirectTo: '/event'
      });
  });
