'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationdetailsCtrl
 * @description
 * # RegistrationdetailsCtrl
 * Controller of the frAppc
 */
angular.module('frApp')
  .controller('RegistrationDetailsCtrl', function ($rootScope, $scope) {
    $rootScope.NavigationBar = 'leftEnabled';
    $scope.tickets = $rootScope.InstanceTicketJson ? $rootScope.InstanceTicketJson.response : (function(){
      alert('Improper Transition, if possible start from beginning or contact customer support');
      /*
      return [{
        'ticketName': '7 Km',
        'salesStartDate': 1439749800000,
        'salesEndDate': 1459362600000,
        'ageFrom': 20, 'ageTo': 55,
        'ticketPrice': 500, 'discount': false,
        'refundable': false, 'totalTickets': 500,
        'minTicketsPerTransaction': 1,
        'maxTicketsPerTransaction': 9,
        'discountMaster': {}, 'ticketId': 1131,
        'tdrId': 3,'noOfTickets': 2, 'price': 0,
        'discountPrice': 0, 'ticketSelected':true,
        'isDeleted': 0
      },{
        "ticketName":"Children","ageFrom":20,"ageTo":55,
        "ticketPrice":0.0,"discount":false,"refundable":false,
        "totalTickets":50,"discountMaster":{},
        "ticketId":1133,"tdrId":1,"noOfTickets":4,
        "price":0.0,"discountPrice":0.0,"ticketSelected":true,
        "isDeleted":0
      },{
        "ticketName":"Child With Autism","ageFrom":20,"ageTo":55,
        "ticketPrice":0.0,"discount":false,"refundable":false,
        "totalTickets":50,"ticketId":1134,
        "tdrId":1,"noOfTickets":3,"price":0.0,"discountPrice":0.0,
        "ticketSelected":false,"isDeleted":0
      }];
      */
      return [];
    })();
    $scope.tickets.forEach(function(e){
      e.participantInformation = new Array(e.noOfTickets);
      e.participantInformation.fill({});
    });

    $scope.formData = {};

    $scope.Progress = {
      steps : (function(){
        var x = 0;
        $scope.tickets.forEach(function(e){
          x += e.noOfTickets;
        });
        return x;
      })(),
      current : 0 ,
      copyFromTicketNumber : 0,
      UserInformation : new Array(this.steps),
      SaveUserInformation : function() {
        this.UserInformation[this.current] = $scope.formData;
        $scope.formData = {} ;
        this.copyFromTicketNumber = 'select';
      },
      MarkerIndices : [],
      previousStep : function(){ this.current -= 1; },
      nextStep : function() { this.current += 1;},
      CheckAndProceedToNextStep : function(){
        this.SaveUserInformation();
        if (this.MarkerIndices.indexOf(this.current) < 0){
          this.MarkerIndices.push(this.current);
        }
        this.current += 1;
      },
      isFirst : function(){ return this.current === 0 ;},
      isLast : function(){ return this.current === this.steps-1 ;},
      setStep : function(a){
        $scope.formData = Object.assign({}, this.UserInformation[a] || {});
        this.current = a;
      },
      copyFrom : function(){
        $scope.formData = Object.assign({}, this.UserInformation[this.copyFromTicketNumber] || {});
      },
      clearAllValues : function(){
        $scope.formData = {};
        this.copyFromTicketNumber = 'select';
      },
      getLinearIndex: function(a, b){
        var x = 0;
        for (var s = 0; s<=a; s++){
          x += $scope.tickets[s].noOfTickets;
        }
        //console.log('a='+x+'b='+b+'curr='+this.current);
        return x+b;
      },
      IsMarkedFilled : function(y){
        return this.MarkerIndices.indexOf(y) >= 0 ;
      },
      NextPhase : function(){
        this.SaveUserInformation();
        if (this.MarkerIndices.indexOf(this.current) < 0){
          this.MarkerIndices.push(this.current);
        }
        console.log($scope.Progress);
      }
    };




  });
