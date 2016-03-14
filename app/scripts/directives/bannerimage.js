'use strict';

/**
 * @ngdoc directive
 * @name frApp.directive:bannerImage
 * @description
 * # bannerImage
 */
angular.module('frApp')
  .directive('bannerImage', function () {
    return {
      templateUrl: 'views/bannerimage.html',
      restrict: 'E'
    };
  });
