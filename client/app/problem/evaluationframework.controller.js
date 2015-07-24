/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */
(function(){

'use strict';

angular
    .module('app')
    .controller('evaluationframeworkController',evaluationframeworkController);

  function evaluationframeworkController ($window,problemService,Socket,toastApp){

      var self = this;
      self.evaluationframeworkList =[];
      self.initEvaluation = initEvaluation;
      self.setOpenEditDiscution = setOpenEditDiscution;
      self.saveDiscution = saveDiscution;

      function initEvaluation(){
          self.idproblem = $window.localStorage.getItem('problemid');
         problemService.getevaluation(self.idproblem)
              .success(function(data) {
                  if(data.success) {
                      self.evaluationframeworkList = data.evaluationframework;
                  }else{
                      toastApp.errorMessage(data.message);
                  }
              });
      }

      Socket.on('onBroadcastFrameSave', function (data) {
          angular.forEach(self.evaluationframeworkList,function(evaluationframework){
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
      });

      function saveDiscution(stakeholder) {
          Socket.emit('broadcastFrameSave', stakeholder);
      }

      Socket.on('onUpdateStakeholder', function (stakeholderOnion) {
         console.log(stakeholderOnion);

      });

      function setOpenEditDiscution(currentStakeholder){
          currentStakeholder.openEdit = true;
      }
  }

})();
