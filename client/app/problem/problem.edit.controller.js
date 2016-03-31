(function(){

"use strict";

    angular.module('app')
    .controller('editProblemController',editProblemaController);

    editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController(Socket, $timeout,toastApp,$window,problemService) {

    var self = this;
    var updateTrue = true;
    self.problem = '';
    self.problemUpdate = problemUpdate;
    self.getCurrentProblem = getCurrentProblem;
    self.saveDescription = saveDescription;
    self.nickname = '';
    self.localcode = '';

    function getCurrentProblem(){
        self.nickname = $window.localStorage.getItem('nickname');
        self.idProblem = $window.localStorage.getItem('problemid');
        self.localcode =  $window.localStorage.getItem('localcode');

        problemService.getproblem(self.idProblem)
            .success(function(data) {
                if(data.success) {
                    console.log(data)
                    self.problem = data.problem;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
        var initsocketproblem = {
            "idproblem": self.idProblem,
            "nickname": self.nickname
        };
        Socket.emit('initProblem', initsocketproblem);
    }

    function setUpdate(){
        updateTrue = true;
    }

    Socket.on('onAtualizarProblema', function (retorno) {
        if(self.localcode !== retorno.localcode) {
            self.problem.description = retorno.description;
        }
        self.problem.update = updateTrue;
    });

    function problemUpdate(problem) {
        problem.update = updateTrue;
        problem.localcode = self.localcode;
        Socket.emit('atualizarProblema', problem);
        if (updateTrue) {
            updateTrue = false;
            $timeout(setUpdate, 2000);
        }
    }

    function saveDescription(problem) {
        problem.localcode = self.localcode;
        problem.update = updateTrue;
        Socket.emit('atualizarProblema', problem);
    }




}

})();