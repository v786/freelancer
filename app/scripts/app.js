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
  .module('frApp', ['ngRoute', 'ngMap', 'wt.responsive', 'formly', 'formlyBootstrap', 'ngDialog','chieffancypants.loadingBar'])
  .config(function ($routeProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
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
      .when('/invalidResourceParameter', {
        templateUrl: 'views/iamlost.html',
        controller: 'IamlostCtrl',
        controllerAs: 'IAmLost'
      })
      .when('/RegistrationDetails', {
        templateUrl: 'views/registrationdetails.html',
        controller: 'RegistrationDetailsCtrl',
        controllerAs: 'RegistrationDetails'
      })
      .otherwise({
        redirectTo: '/event'
      });
  })
  .run(function(formlyConfig){
    formlyConfig.setType({
      name : 'file',
      templateUrl : '../../views/fileInput.html'
    })
  });
