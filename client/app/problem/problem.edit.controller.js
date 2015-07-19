(function(){

"use strict";

    angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController($scope, Socket, $timeout,toastApp,$window,problemService) {
    var self = this;
    var updateTrue = true;
    self.problem = "";

    self.tabsdsc = [
        '<md-tab data-ui-sref="problem.stakeholders" md-active="$state.is(\'problem.stakeholders\')" label="{{\'LABEL_ARTIFACT_STAKEHOLDER\' | translate }}"></md-tab>',
        '<md-tab data-ui-sref="problem.evaluationframework" md-active="$state.is(\'problem.evaluationframework\')" label="{{\'LABEL_ARTIFACT_EVALUATION_FRAMEWORK\' | translate }}"></md-tab>',
        '<md-tab data-ui-sref="problem.semioticframework" md-active="$state.is(\'problem.semioticframework\')" label="{{\'LABEL_ARTIFACT_SEMIOTIC_FRAMEWORK\' | translate }}"></md-tab>',
        '<md-tab data-ui-sref="problem.carf" md-active="$state.is(\'problem.carf\')" label="CARF"></md-tab></md-tabs>'
    ];

    self.getCurrentProblem = function(){
        self.idProblem = $window.localStorage.getItem('problemid');
        problemService.getproblem(self.idProblem)
            .success(function(data) {
                if(data.success) {
                    self.problem = data.problem;
                }else{
                    toastApp.errorMessage(data.message);
                }
            })
    };

    var setUpdate = function(){
        updateTrue = true;
    };

    Socket.on('onAtualizarProblema', function (retorno) {
        console.log("=========================================================================retorno...." + retorno);
        self.problem.description = retorno.description;
        self.problem.update = updateTrue;
    });

    $scope.problemUpdate = function (problem) {
        problem.update = updateTrue;

        Socket.emit('atualizarProblema', problem);
        if (updateTrue) {
            updateTrue = false;
            $timeout(setUpdate, 2000);
        }
    };

    $scope.saveDescription = function (problem) {
        console.log("=============================================================================");
        problem.update = updateTrue;
        Socket.emit('atualizarProblema', problem);
    };

}
})();