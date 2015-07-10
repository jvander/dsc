(function(){

"use strict";

    angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController($scope, Socket, $timeout) {
    var self = this;
    var updateTrue = true;

    self.myProblem = {
            "id": "0001",
            "title": "",
            "description": "",
            "update" : true
    };

    var setUpdate = function(){
        updateTrue = true;
    };
    Socket.on('onAtualizarProblema', function (retorno) {
        self.myProblem.id = retorno.id;
        self.myProblem.title = retorno.title;
        self.myProblem.description = retorno.description;
        self.myProblem.update = updateTrue;
    });
    $scope.problemUpdate = function (myProblem) {
        myProblem = {
            id: myProblem.id,
            title: myProblem.title,
            description: myProblem.description,
            "update" : updateTrue
        };
        Socket.emit('atualizarProblema', myProblem);
        if (updateTrue) {
            updateTrue = false;
            $timeout(setUpdate, 5000);
        }

    };
}
})();