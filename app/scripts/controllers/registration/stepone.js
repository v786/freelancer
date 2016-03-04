'use strict';

/**
 * @ngdoc function
 * @name frApp.controller:RegistrationSteponeCtrl
 * @description
 * # RegistrationSteponeCtrl
 * Controller of the frApp
 */

angular.module('frApp')
  .controller('RegistrationSteponeCtrl', function ($rootScope, $scope, $location) {

    /* Get Ticket from previous step and Populate current scope */
    $scope.tickets = angular.copy(
      $rootScope.InstanceTicketJson ? $rootScope.InstanceTicketJson.response : (function () {
        alert('Improper Transition, if possible start from beginning or contact customer support');
        return [];
      })()
    );
    $scope.tickets.forEach(function (e) {
      e.$participantInformation = [];
      e.participantInformation = new Array(e.noOfTickets);
      e.participantInformation.fill({});
    });
    /* Get Ticket end*/

    /*Init global details, will be populated upon step completion*/
    $rootScope.ParticipantDetails = [];

    /*returns a possible property by regex or undefined*/
    var findPropertyNameByRegex = function (obj, regex) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && key.match(regex)) {
          return key;
        }
      }
      return undefined;
    };

    /* Copy function, copy data from one point to another */
    var copy = function (src, dest) {
      if (typeof src !== 'undefined') {
        for (var i in src) {
          if (src.hasOwnProperty(i)) {
            dest[i] = src[i];
          }
        }
      }
    };
    $scope.copy = copy();

    /*Reset non $ fields*/
    var reset = function(o){
      for (var i in o){
        if (o.hasOwnProperty(i) && !i.match(/\$[\w+]/)){
          delete o[i];
        }
      }
    };

    /* Parse Input Field according to Input from server */
    var parseInputField = function (k) {
      if (k === 'text_box') {
        return 'text';
      }
      if (k === 'radio_button') {
        return 'radio';
      }
      if (k === 'date_picker') {
        return 'date';
      }
      if (k === 'file_select') {
        return 'file';
      }
      if (k === 'text_area') {
        return 'textarea';
      }
      if (k === 'drop_down') {
        return 'select';
      }
      return 'text';
    };

    /* Populate User Fields */
    $scope.tickets.forEach(function (e) {
      e.vm = {};
      e.vm.user = {};
      e.vm.userFields = [];
      e.participantMasterCollection.forEach(function (f) {
        if (f.fieldType === 'radio_button') {
          e.vm.userFields.push(
            {
              key: f.fieldName,
              type: 'radio',
              templateOptions: {
                required: true,
                label: f.fieldName,
                options: (function () {
                  var k = [];
                  f.participantSpecimenId.participantSpecimenDetailsList.forEach(function (e) {
                    k.push({name: e.fieldValue, value: e.fieldValue});
                  });
                  return k;
                })()
              }
            }
          )
        } else if (f.fieldType === 'file_select') {
          e.vm.userFields.push({
            key: f.fieldName,
            type: 'file',
            templateOptions: {
              label: f.fieldName,
              description: 'Input File description',
              url: 'http://test.joinmyevent.com:8080/ems/ws/upload/'
            }
          });
        } else if (f.fieldType === 'text_area') {
          e.vm.userFields.push({
            type: 'textarea',
            key: f.fieldName,
            templateOptions: {
              required: true,
              label: f.fieldName,
              rows: 4
            }
          })
        } else if (f.fieldType === 'drop_down') {
          e.vm.userFields.push({
            key: f.fieldName,
            type: 'select',
            templateOptions: {
              //required: true,
              label: f.fieldName,
              options: (function(){
                var A = [];
                try{
                  f.additionalFieldMasterDTO.additionalFieldDetailsList.forEach(function(k){
                    var option = k.additionalFieldDetailsValue;
                    A.push({name:option,value:option});
                  }); 
                }catch(e){
                  console.log(e);
                }
                return A;
              })()
            }
          })
        }else if (f.fieldType === 'date_picker') {
          e.vm.userFields.push({
            key: f.fieldName,
            type: 'datepicker',
            templateOptions: {
              required: true,
              label: f.fieldName
            }
          })
        }else {
          e.vm.userFields.push({
            key: f.fieldName,
            type: 'input',
            templateOptions: {
              required: true,
              type: parseInputField(f.fieldType),
              label: f.fieldName,
              placeholder: 'Enter ' + f.fieldName,
              'ng-style': {'error': true}
            }
          })
        }
      })
    });

    /* Gives current ticket index for the present Progress */
    /* START */
    var calculateRecursiveIndex = function (z, X) {
      while ((z - $scope.tickets[X].noOfTickets) >= 0) {
        z -= $scope.tickets[X].noOfTickets;
        X += 1;
      }
      return X;
    };
    var getCurrentTicketIndex = function (c) {
      if (!c && c!=0) {
        c = parseInt($scope.Progress.current);
      }
      return calculateRecursiveIndex(c, 0);
    };
    /* END */


    /* Progress object keeps track of progress of filling form and provides necessary Methods */
    $scope.Progress = {

      /* Total no. steps */
      steps: (function () {
        var x = 0;
        $scope.tickets.forEach(function (e) {
          x += e.noOfTickets;
        });
        return x;
      })(),

      /* keeps track of current step */
      current: 0,

      /* create a new array to store user information*/
      UserInformation: new Array(this.steps),

      /*copyFromTicketNumber : track copy from dropdown */
      copyFromTicketNumber: 0,

      /* Save Present user */
      SaveUserInformation: function () {
        this.UserInformation[this.current] = {};
        copy($scope.tickets[getCurrentTicketIndex()].vm.user, this.UserInformation[this.current]);
        console.log($scope.tickets[getCurrentTicketIndex()].vm);
        reset($scope.tickets[getCurrentTicketIndex()].vm.user);
        this.copyFromTicketNumber = 'select';
      },

      /*stores which progress steps are completed */
      MarkerIndices: [],

      /* Goto Next And Previous steps */
      previousStep: function () {
        this.current -= 1;
      },
      nextStep: function () {
        this.current += 1;
      },

      /* returns If this is first or last step */
      isFirst: function () {
        return this.current === 0;
      },
      isLast: function () {
        return this.current === this.steps - 1;
      },

      /* Proceed to next step after verification*/
      CheckAndProceedToNextStep: function () {
        /*
         *  Implement custom Verification logic here to
         *  $scope.tickets[getCurrentTicketIndex()].vm.user
         *  Currently :  None
         */

        this.SaveUserInformation();
        if (this.MarkerIndices.indexOf(this.current) < 0) {
          this.MarkerIndices.push(this.current);
        }
        this.current += 1;
      },

      /* Copy Saved UserInformation */
      setStep: function (a) {
        this.current = a;
        console.log(a);
        var k = getCurrentTicketIndex(a);
        console.log(k);
        console.log(this.UserInformation);
        if (this.UserInformation[a]) {
          copy(this.UserInformation[a], $scope.tickets[k].vm.user);
        }
      },

      /* Copy upon selecting new value from drop down */
      copyFrom: function () {
        copy(this.UserInformation[this.copyFromTicketNumber], $scope.tickets[getCurrentTicketIndex()].vm.user);
      },

      /* Reset Present User */
      clearAllValues: function () {
        reset($scope.tickets[getCurrentTicketIndex()].vm.user);
        this.copyFromTicketNumber = 'select';
      },

      /* Get Progress step upon passing a:global ticket index, b: repeat index in present ticket */
      getLinearIndex: function (a, b) {
        var x = 0;
        for (var s = 0; s <= a; s++) {
          x += $scope.tickets[s].noOfTickets;
        }
        //console.log('a='+x+'b='+b+'curr='+this.current);
        return x + b;
      },

      /* Returns True if given progress index has been visited*/
      IsMarkedFilled: function (y) {
        return this.MarkerIndices.indexOf(y) >= 0;
      },


      /*  Final big Step, Call this  function if everything has been filled*/
      NextPhase: function () {
        // !IMPORTANT save last person first
        this.SaveUserInformation();
        if (this.MarkerIndices.indexOf(this.current) < 0) {
          this.MarkerIndices.push(this.current);
        }
        console.log(this.UserInformation);
        //save all information in root scope
        //angular.copy(this.UserInformation, $rootScope.ParticipantDetails);
        this.UserInformation.forEach(function(e){$rootScope.ParticipantDetails.push(e);});

        //also copy each user data in their respective ticket details
        this.UserInformation.forEach(function(e, index){
          $scope.tickets[getCurrentTicketIndex(index)].$participantInformation.push(e);
        });
        $rootScope.$tickets = angular.copy($scope.tickets);

        //remove unnecessary fields that we obviously  do not need
        $rootScope.ParticipantDetails.forEach(function (e) {
          var regex = /formly_\w+/; //remove property formly_1
          var delProp = findPropertyNameByRegex(e, regex);
          if (delProp) {
            delete e[delProp];
          }
        });
        console.log($rootScope.ParticipantDetails);
        $location.path('/registration/buyer')
      }
    };

    /* Returns true if user ticket at c is not field or undefined Else false */
    $scope.IsDirty = function (c) {
      if (typeof $scope.Progress.UserInformation[c] == 'undefined') {
        return true;
      } else {
        var x = $scope.Progress.UserInformation[c];
        for (var SomeProperty in x) {
          if (x.hasOwnProperty(SomeProperty) && !SomeProperty.match(/\$[\w+]/) && !x[SomeProperty]) {
            return true;
          }
        }
        return false;
      }
    };

    /* See Details above @getCurrentTicketIndex */
    $scope.ProgressTicketIndex = getCurrentTicketIndex;

  });
