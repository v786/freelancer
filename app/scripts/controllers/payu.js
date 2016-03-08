'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:BuyCtrl
 * @description
 * # BuyCtrl
 * Controller of the frApp
 */
angular.module('frApp')
	.controller('payUCtrl', ['$http','$scope', '$location','$rootScope','$timeout', '$sce', function($http,$scope,$location,$rootScope,$timeout, $sce)
	{
		 $timeout(function(){ 
			 document.getElementById('payuForm').submit();
			 }
		 , 3000);      
		
	} ]); 
 