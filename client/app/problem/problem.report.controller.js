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