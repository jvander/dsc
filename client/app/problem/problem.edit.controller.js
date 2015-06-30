/**
 * Created by JOSEVALDERLEI on 24/06/2015.
 */

(function(){


"use strict";

angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController($scope, Socket){


    $scope.myProblem = { "idProblem":"",
                         "title": "",
                         "description": ""

                         };

    Socket.on('onAtualizarProblema', function (retorno) {
        $scope.myProblem.id = retorno.idProblem;
        $scope.myProblem.title = retorno.title;
        $scope.myProblem.description = retorno.description;
    });

    $scope.problemUpdate = function (myProblem) {
        myProblem = {
            idProblem: myProblem.idProblem,
            title: myProblem.title,
            description: myProblem.description
        };
        Socket.emit('atualizarProblema', myProblem);

     };
}

})();