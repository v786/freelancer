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
       'isDeleted': 0,
       "participantMasterCollection": [
       {
       "participantId": 2040,
       "fieldName": "First Name",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086453,
       "modifiedBy": 36,
       "participantSpecimenId": 1
       },
       {
       "participantId": 2041,
       "fieldName": "Last Name",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 2
       },
       {
       "participantId": 2042,
       "fieldName": "Gender",
       "fieldType": "radio_button",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 3
       },
       {
       "participantId": 2043,
       "fieldName": "Date of Birth",
       "fieldType": "date_picker",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 4
       },
       {
       "participantId": 2044,
       "fieldName": "Address",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 5
       },
       {
       "participantId": 2045,
       "fieldName": "Postal Code",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 6
       }
       ]
       },{
       "ticketName":"Children","ageFrom":20,"ageTo":55,
       "ticketPrice":0.0,"discount":false,"refundable":false,
       "totalTickets":50,"discountMaster":{},
       "ticketId":1133,"tdrId":1,"noOfTickets":4,
       "price":0.0,"discountPrice":0.0,"ticketSelected":true,
       "isDeleted":0,
       "participantMasterCollection": [
       {
       "participantId": 2040,
       "fieldName": "First Name",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086453,
       "modifiedBy": 36,
       "participantSpecimenId": 1
       },
       {
       "participantId": 2041,
       "fieldName": "Last Name",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 2
       },
       {
       "participantId": 2042,
       "fieldName": "Gender",
       "fieldType": "radio_button",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 3
       },
       {
       "participantId": 2043,
       "fieldName": "Date of Birth",
       "fieldType": "date_picker",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 4
       },
       {
       "participantId": 2044,
       "fieldName": "Address",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 5
       },
       {
       "participantId": 2045,
       "fieldName": "Postal Code",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 6
       }
       ]
       },{
       "ticketName":"Child With Autism","ageFrom":20,"ageTo":55,
       "ticketPrice":0.0,"discount":false,"refundable":false,
       "totalTickets":50,"ticketId":1134,
       "tdrId":1,"noOfTickets":3,"price":0.0,"discountPrice":0.0,
       "ticketSelected":false,"isDeleted":0,
       "participantMasterCollection": [
       {
       "participantId": 2040,
       "fieldName": "First Name",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086453,
       "modifiedBy": 36,
       "participantSpecimenId": 1
       },
       {
       "participantId": 2041,
       "fieldName": "Last Name",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 2
       },
       {
       "participantId": 2042,
       "fieldName": "Gender",
       "fieldType": "radio_button",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 3
       },
       {
       "participantId": 2043,
       "fieldName": "Date of Birth",
       "fieldType": "date_picker",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 4
       },
       {
       "participantId": 2044,
       "fieldName": "Address",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 5
       },
       {
       "participantId": 2045,
       "fieldName": "Postal Code",
       "fieldType": "text_box",
       "fieldRequired": true,
       "modifiedOn": 1439774086457,
       "modifiedBy": 36,
       "participantSpecimenId": 6
       }
       ]
       }];
       */
      return [];
    })();
    $scope.tickets.forEach(function(e){
      e.participantInformation = new Array(e.noOfTickets);
      e.participantInformation.fill({});
    });

    /*Views, Participation, payment, confirm*/
    $scope.CurrentVIEW = 0 ;
    $scope.setCurrentView = function(v){
      $scope.CurrentVIEW = v ;
    };

    $scope.ParticipantDetails = [];
    $scope.BillingUserDetails = {};


    var parseInputField = function(k){
      if(k === 'text_box') {return 'text' ;}
      if(k === 'radio_button') {return 'radio' ;}
      if(k === 'date_picker') {return 'date' ;}
      return 'text';
    };

    $scope.tickets.forEach(function(e){
      e.vm = {};
      e.vm.user = {};
      e.vm.userFields = [];
      e.participantMasterCollection.forEach(function(f){
        if(f.fieldType === 'radio_button'){
          e.vm.userFields.push(
            {
              key: f.fieldName ,
              type: 'radio',
              templateOptions: {
                label: f.fieldName,
                options: (function(){
                  var k = [];
                  f.participantSpecimenId.participantSpecimenDetailsList.forEach(function(e){
                    k.push({name: e.fieldValue, value: e.fieldValue});
                  });
                  return k;
                })() || [{name:'male',value:'male'},{name:'female',value:'female'}]
              }
            }
          )
        }else{
          e.vm.userFields.push({
            key: f.fieldName ,
            type: 'input',
            templateOptions: {
              type: parseInputField(f.fieldType),
              label: f.fieldName,
              placeholder: 'Enter '+f.fieldName
            }
          })
        }
      })
    });

    var calculateRecursiveIndex = function(z, X){
      while ((z - $scope.tickets[X].noOfTickets) >= 0 ){
        z -= $scope.tickets[X].noOfTickets;
        X += 1 ;
      }
      return X;
    };

    var getCurrentTicketIndex = function(c){
      if (!c) {c = parseInt($scope.Progress.current);}
      return calculateRecursiveIndex(c,0);
    };


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
        this.UserInformation[this.current] = $scope.tickets[getCurrentTicketIndex()].vm.user;
        $scope.tickets[getCurrentTicketIndex()].vm.user = {} ;
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
        var k = getCurrentTicketIndex(a);
        $scope.tickets[k].vm.user = Object.assign({}, this.UserInformation[a] || {});
        this.current = a;
      },
      copyFrom : function(){
        $scope.tickets[getCurrentTicketIndex()].vm.user = Object.assign({}, this.UserInformation[this.copyFromTicketNumber] || {});
      },
      clearAllValues : function(){
        $scope.tickets[getCurrentTicketIndex()].vm.user = {};
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
        $scope.CurrentVIEW = 1;
        $scope.ParticipantDetails = this.UserInformation.slice();
        console.log($scope.Progress);
      }
    };

    $scope.ProgressTicketIndex = getCurrentTicketIndex;


    /*Payment Details */


    $scope.payment = {
      Fields : [
        {
          key: 'FirstName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'First Name',
            placeholder: 'First Name'
          }
        },
        {
          key: 'LastName',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Last Name',
            placeholder: 'Last Name'
          }
        },
        {
          key: 'Gender' ,
          type: 'radio',
          templateOptions: {
            label: 'Gender',
            options: [{name:'male',value:'male'},{name:'female',value:'female'}]
          }
        },
        {
          key: 'DateOfBirth',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: 'Date Of Birth'
          }
        },
        {
          key: 'Address',
          type: 'textarea',
          templateOptions: {
            type: 'textarea',
            label: 'Address'
          }
        },
        {
          key: 'zip',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'PinCode',
            placeholder: 'Enter Pin Code'
          }
        },
        {
          key: 'City',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'City',
            placeholder: 'City'
          }
        },
        {
          key: 'Country',
          type: 'select',
          templateOptions: {
            label: 'Country',
            options: [{"name": "India","value":"india"},{"name": "other","value":"other"}]
          }
        },
        {
          key: 'Mobile',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'mobile',
            placeholder: 'Enter ten digit mobile number'
          }
        },
        {
          key: 'checked',
          type: 'checkbox',
          templateOptions: {
            label: 'I accept All terms and Conditions (*)'
          }
        }
      ],
      UserDetails : {},
      submit : function(f){
        $scope.BillingUserDetails = Object.assign({}, f);
        console.log(f);
        $scope.CurrentVIEW = 2;
      }
    }
  });
