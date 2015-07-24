(function(){

"use strict";

    angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController(Socket, $timeout,toastApp,$window,problemService) {

    var self = this;
    var updateTrue = true;
    self.problem = "";
    self.problemUpdate = problemUpdate;
    self.getCurrentProblem = getCurrentProblem;
    self.saveDescription = saveDescription;

    function getCurrentProblem(){
        self.idProblem = $window.localStorage.getItem('problemid');
        problemService.getproblem(self.idProblem)
            .success(function(data) {
                if(data.success) {
                    self.problem = data.problem;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
    }

    function setUpdate(){
        updateTrue = true;
    }

    Socket.on('onAtualizarProblema', function (retorno) {
        self.problem.description = retorno.description;
        self.problem.update = updateTrue;
    });

    function problemUpdate(problem) {
        problem.update = updateTrue;
        Socket.emit('atualizarProblema', problem);
        if (updateTrue) {
            updateTrue = false;
            $timeout(setUpdate, 2000);
        }
    }

    function saveDescription(problem) {
        problem.update = updateTrue;
        Socket.emit('atualizarProblema', problem);
    }

}

})();