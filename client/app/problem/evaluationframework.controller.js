/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */
(function(){

'use strict';

angular
    .module('app')
    .controller('evaluationframeworkController',evaluationframeworkController);

  function evaluationframeworkController ($window,$filter,problemService,Socket,toastApp){

      var self = this;
      self.evaluationframeworkList =[];
      self.initEvaluation = initEvaluation;
      self.setOpenEditDiscution = setOpenEditDiscution;
      self.saveFrame = saveFrame;
      self.labelShowValues = $filter('translate')('SHOW_VALUES');
       self.showValues = showValues;
      self.isShowValues = false;


      function showValues() {
              self.isShowValues = !self.isShowValues;
              if(self.isShowValues){
                  self.labelShowValues = $filter('translate')('HIDE_VALUES');
              }else{
                  self.labelShowValues = $filter('translate')('SHOW_VALUES');
              }
      }

      function initEvaluation(){
          self.idproblem = $window.localStorage.getItem('problemid');
         problemService.getevaluation(self.idproblem)
              .success(function(data) {
                  if(data.success) {
                      console.log(data.evaluationframework);
                      self.evaluationframeworkList = data.evaluationframework;
                  }else{
                      toastApp.errorMessage(data.message);
                  }
              });
      }

      Socket.on('onBroadcastFrameEdit', function (data) {
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

      function saveFrame(stakeholder) {
          Socket.emit('broadcastFrameSave', stakeholder);
      }

      Socket.on('onUpdateStakeholder', function (stakeholderOnion) {


      });

      function setOpenEditDiscution(currentStakeholder){
          currentStakeholder.openEdit = true;
      }
  }

})();
