'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('EventCtrl', function ($scope, $sce) {
    $scope.event = {};
    /* Debug */
    $scope.event = {
      eventDate: 'Jan 21, 2015',
      startTime :'06:00',
      endTime : '09:00',
      address : 'Amphi Theatre, Bandstand, Bandra',
      position : {
        latitude : 19.042418752024805,
        longitude : 72.8187346458435
      },
      htmlContent : '<h4><strong>CAUSE WE CARE….</strong></h4>' +
      '<p>2nd April is World Autism Awareness Day. We, from Khushi Pediatric Therapy Centre, are holding an AUTISM CAUSE-A-THON – A 7 km Marathon and 1 km Marathon. Autism is a disorder of neural development whose cause is unknown. Wiring of the brain that is different. </p>' +
      '<br><h4><strong>An inclusive society is a healthy society….</strong></h4>' +
      '<p>Integration of Autistic Children into mainstream makes not only these children feel part of society, but also allows for overall growth of us as individuals. Autistic children are different & talented, however, have difficulties in communication. With therapy and integration, these communication gaps reduce as they learn to be part of the society at large. Therefore, Integrate us. </p>',
      description : function(){
        return $sce.trustAsHtml($scope.event.htmlContent);
      }
    };

    //production use some method like $http ;
  });
