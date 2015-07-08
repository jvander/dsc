/**
 * Created by JOSEVALDERLEI on 24/06/2015.
 */

(function(){

"use strict";

    angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController($scope, Socket, $timeout) {


    var self = this;
    var updateTrue = true;

    self.myProblem = {
            "id": "",
            "title": "",
            "description": "",
            "update" : true
    };

    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.collaborators = loadCollaborators();
    self.selectedCollaborators = [];


    function querySearch (query) {
        var results = query ? self.collaborators.filter(createFilterFor(query)) : [];
        return results;
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(collaborator) {
            return (collaborator._lowername.indexOf(lowercaseQuery) === 0) ||
                (collaborator._loweremail.indexOf(lowercaseQuery) === 0);
        };
    }

    function loadCollaborators() {
        var peoples = [
            {
                'name': 'Jonas',
                'email': 'jonas@algo.com'
            },
            {
                'name': 'Juca',
                'email': 'juca@juca.com'
            },
            {
                'name': 'Jesus',
                'email': 'Jesus@jesus.com'
            },
            {
                'name': 'Xavier',
                'email': 'Composite'
            },
            {
                'name': 'Joel da silva',
                'email': 'joel@com.br'
            }
        ];
        return peoples.map(function (p) {
            p._lowername = p.name.toLowerCase();
            p._loweremail = p.email.toLowerCase();
            return p;
        });
    }

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