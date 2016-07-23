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
      self.showValues = showValues;
      self.showDescription = showDescription;
      
      function showDescription(stakeholder) {
          stakeholder.showDescription = !stakeholder.showDescription;
      }


      function showValues(stakeholder) {
              stakeholder.showValues = !stakeholder.showValues;
      }
      
      var newtakeholder = function (stakeholder) {
        return {
              _id: stakeholder._id,
              problems: stakeholder.problems,
              solutions: stakeholder.solutions
          };   
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
                         stakeholder.openEdit = false;
                         stakeholder.problems = data.problems;
                         stakeholder.solutions = data.solutions;
                     }
                 });
             }
          });
      });

      function saveFrame(stakeholder) {
          stakeholder.openEdit = false;
          Socket.emit('broadcastFrameSave', newtakeholder(stakeholder));
      }


      function setOpenEditDiscution(currentStakeholder){
          currentStakeholder.openEdit = true;
      }
  }

})();
