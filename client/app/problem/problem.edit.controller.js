/**
 * Created by JOSEVALDERLEI on 24/06/2015.
 */

(function(){


"use strict";

angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController($scope, Socket,$timeout) {
    var updateTrue = true;
    $scope.myProblem = {
            "id": "",
            "title": "",
            "description": "",
            "update" : true
    };
    var setUpdate = function(){
        updateTrue = true;
    };
    Socket.on('onAtualizarProblema', function (retorno) {
        $scope.myProblem.id = retorno.id;
        $scope.myProblem.title = retorno.title;
        $scope.myProblem.description = retorno.description;
        $scope.myProblem.update = updateTrue;
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