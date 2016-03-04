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
  .module('frApp', ['ngRoute', 'ngMap', 'wt.responsive', 'formly', 'formlyBootstrap', 'ngDialog','chieffancypants.loadingBar', '720kb.datepicker'])
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
      .when('/registration/participant', {
        templateUrl: 'views/registration/stepone.html',
        controller: 'RegistrationSteponeCtrl',
        controllerAs: 'registration/stepOne'
      })
      .when('/registration/buyer', {
        templateUrl: 'views/registration/steptwo.html',
        controller: 'RegistrationSteptwoCtrl',
        controllerAs: 'registration/steptwo'
      })
      .when('/registration/verify', {
        templateUrl: 'views/registration/stepthree.html',
        controller: 'RegistrationStepthreeCtrl',
        controllerAs: 'registration/stepthree'
      })
      .otherwise({
        redirectTo: '/invalidResourceParameter'
      });
  })
  .run(function(formlyConfig){
    formlyConfig.setType({
      name : 'file',
      templateUrl : '../../views/fileInput.html'
    });
    formlyConfig.setType({
      name : 'datepicker',
      templateUrl : '../../views/datepicker.html'
    })
  });
