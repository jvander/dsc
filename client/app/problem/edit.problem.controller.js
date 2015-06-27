/**
 * Created by JOSEVALDERLEI on 24/06/2015.
 */


angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$inject = ['$scope','Socket'];

function editProblemaController($scope, Socket){
    $scope.myProblem = { "id":"",
                         "title": "",
                         "description": ""

                         };
    Socket.on('onAtualizarProblema', function (retorno) {
        $scope.myProblem.id = retorno.id;
        $scope.myProblem.title = retorno.title;
        $scope.myProblem.description = retorno.description;
    });

    $scope.problemUpdate = function (myProblem) {
        myProblem = {
            id: "001",
            title: myProblem.title,
            description: myProblem.description
        };
        Socket.emit('atualizarProblema', myProblem);

     };
}