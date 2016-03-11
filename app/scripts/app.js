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
  .config(function ($routeProvider, cfpLoadingBarProvider, $locationProvider, $sceProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    $sceProvider.enabled(false);
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
      .when('/participant', {
        templateUrl: 'views/registration/stepone.html',
        controller: 'RegistrationSteponeCtrl',
        controllerAs: 'registration/stepOne'
      })
      .when('/buyer', {
        templateUrl: 'views/registration/steptwo.html',
        controller: 'RegistrationSteptwoCtrl',
        controllerAs: 'registration/steptwo'
      })
      .when('/verify', {
        templateUrl: 'views/registration/stepthree.html',
        controller: 'RegistrationStepthreeCtrl',
        controllerAs: 'registration/stepthree'
      })
      .when('/registration/:someRoute', {
        redirectTo: function(routeParams){return '/' + routeParams['someRoute'] ;}
      })
	  .when('/payu/:txid/:bid', {
				templateUrl: function(params){ return  window.appURLprifix + '/loadData?txid=' + params.txid + '&bid='+ params.bid; },
          		controller : 'payUCtrl'
          	})
      .when('/rebook/:orderId/:email', {
        templateUrl: 'views/Rebook.html',
        controller: 'RebookCtrl',
        controllerAs: 'rebook'
      })
      .otherwise({
        redirectTo: '/event'
      });
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false // change this variable after including base tag
      });
  })
  .run(function(formlyConfig){
    formlyConfig.setType({
      name : 'file',
      templateUrl : 'views/fileInput.html'
    });
    formlyConfig.setType({
      name : 'datepicker',
      templateUrl : 'views/datepicker.html'
    })
  });
