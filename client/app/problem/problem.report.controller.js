/**
 * Created by JOSEVALDERLEI on 12/08/2015.
 */

(function(){

    'use strict';

    angular
        .module('app')
        .controller('problemReportController',problemReportController);


     function problemReportController($window,problemService,toastApp,$state){

         var self = this;
         self.idProblem;
         self.problem;
         self.initProblemPeport = initProblemPeport;
         self.systemReturn = systemReturn;

         function initProblemPeport(){

             self.idProblem = $window.localStorage.getItem('problemid');

             problemService.getproblemreport(self.idProblem)
                 .success(function(data) {
                     if(data.success) {
                         angular.forEach(data.problem.stakeholders, function (stakeholder) {
                                  stakeholder.x = (parseInt(stakeholder.x.substring(0,stakeholder.x.length -2)) - 100)+'px';
                                 stakeholder.y =  (parseInt(stakeholder.y.substring(0,stakeholder.y.length -2)) + 400)+'px';
                         });

                         self.problem = data.problem;
                     }else{
                         toastApp.errorMessage(data.message);
                     }
                 });
         }


         function systemReturn(){
             $state.go('problem.stakeholders');
         }

     }


})();