/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

'use strict';

angular.module('app')
    .controller('evaluationframeworkController',evaluationframeworkController);




  function evaluationframeworkController ($window,problemService,Socket,$scope){

      var vm = this;
      vm.evaluationframeworkList =[];
      vm.initEvaluation = initEvaluation;

      function initEvaluation(){
          vm.idproblem = $window.localStorage.getItem('problemid');
         problemService.getevaluation(vm.idproblem)
              .success(function(data) {
                  if(data.success) {
                      vm.evaluationframeworkList = data.evaluationframework;
                  }else{
                      toastApp.errorMessage(data.message);
                  }
              })
      };





      Socket.on('onBroadcastFrameSave', function (data) {
          angular.forEach(vm.evaluationframeworkList,function(evaluationframework){
             if( evaluationframework.onionlayer == data.onionlayer){
                 angular.forEach(evaluationframework.stakeholders,function(stakeholder){
                     if (stakeholder._id == data._id){
                         stakeholder.name = data.name;
                         stakeholder.onionlayer = data.onionlayer;
                         stakeholder.description = data.description;
                         stakeholder.openEdit = data.openEdit;
                         stakeholder.problems = data.problems;
                         stakeholder.solutions = data.solutions;
                     }
                 });
             }
          });

         /* angular.forEach(vm.evaluationframeworkList.stakeholders, function (stakeholder) {
              if (stakeholder._id == data._id){
                  stakeholder.onionlayer = data.onionlayer;
                  stakeholder.name = data.name;
                  stakeholder.description = data.description;
                  stakeholder.openEdit = data.dadaopenEdit
                  stakeholder.x = data.x;
                  stakeholder.y = data.y;
              }
          });*/
      });


      $scope.saveDiscution = function(stakeholder) {
          Socket.emit('broadcastFrameSave', stakeholder);
      };


      Socket.on('onUpdateStakeholder', function (stakeholderOnion) {
         console.log(stakeholderOnion);

      });

      $scope.setOpenEditDiscution = function(currentStakeholder){
          currentStakeholder.openEdit = true;
      };
  }

