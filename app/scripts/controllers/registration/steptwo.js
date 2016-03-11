'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationSteptwoCtrl
 * @description
 * # RegistrationSteptwoCtrl
 * Controller of the frApp
 */
angular.module('frApp')
  .controller('RegistrationSteptwoCtrl', function ($scope, $rootScope, $location) {

    /*returns a possible property by regex or undefined*/
    var findPropertyNameByRegex = function (obj, regex) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && key.match(regex)) {
          return key;
        }
      }
      return undefined;
    };

    /*Reset non $ fields*/
    var reset = function(o){
      for (var i in o){
        if (o.hasOwnProperty(i) && !i.match(/\$[\w+]/)){
          delete o[i];
        }
      }
    };

    /*Payment Details */
    $scope.payment = {
      participantInformation : angular.copy($rootScope.ParticipantDetails),
      Fields : [
        {
          key: 'firstName',
          type: 'input',
          templateOptions: {
            required : true,
            type: 'text',
            label: 'First Name',
            placeholder: 'First Name (Required)'
          }
        },
        {
          key: 'lastName',
          type: 'input',
          templateOptions: {
            required : true,
            type: 'text',
            label: 'Last Name',
            placeholder: 'Last Name (Required)'
          }
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            required : true,
            type: 'email',
            label: 'Email Id',
            placeholder: 'Email Id (Required)'
          }
        },
        {
          key: 'mobileNo',
          type: 'input',
          templateOptions: {
            required : true,
            type: 'text',
            label: 'mobile',
            placeholder: 'Enter ten digit mobile number (Required)'
          }
        },
        /*,
        {
          key: 'dob',
          type: 'datepicker',
          templateOptions: {
            label: 'Date Of Birth'
          }
        },
        {
          key: 'Address',
          type: 'textarea',
          templateOptions: {
            type: 'textarea',
            label: 'Address',
            placeholder : 'Address (optional)'
          }
        },
        {
          key: 'zip',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'PinCode',
            placeholder: 'Enter Pin Code  (optional)'
          }
        },
        {
          key: 'city',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'City',
            placeholder: 'City  (optional)'
          }
        },
        {
          key: 'country',
          type: 'select',
          templateOptions: {
            label: 'Country',
            options: [{"name": "India","value":"india"},{"name": "other","value":"other"}]
          }
        },*/
        {
          key: 'TermsAndConditions',
          type: 'checkbox',
          templateOptions: {
            required : true,
            label: 'I accept All terms and Conditions'
          }
        }
      ],
      UserDetails : {},
      copy : function(src,dest){
        if (typeof src!== 'undefined'){
          for (var i in src ){
            if (src.hasOwnProperty(i) && !i.match(/\$[\w+]/g)){
              dest[i] = src[i] ;
            }
          }
        }
      },
      copyFrom:function(f){
        //console.log(this.participantInformation[f]);
        //console.log(this.UserDetails);
        this.copy(this.participantInformation[f], this.UserDetails)
      },
      clearAllValues: function () {
        reset($scope.payment.UserDetails);
        this.copyFromTicketNumber = 'select';
      },
      submit : function(f){
        $rootScope.BillingUserDetails = Object.assign({}, f);
        var regex = /formly_\w+/; //remove property formly_1
        var delProp = findPropertyNameByRegex($rootScope.BillingUserDetails, regex);
        if (delProp){
          delete $rootScope.BillingUserDetails[delProp];
        }
        //console.log(f);
        $location.path('/registration/verify')
      }
    }
  });
