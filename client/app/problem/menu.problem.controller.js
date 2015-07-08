/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */




(function() {


    "use strict";

    angular.module('app')
        .controller('menuProblemController', menuProblemaController);

    function menuProblemaController(Auth, $state){



    var vm = this;

    vm.getCollaborators = function(){
        $state.go('problem.collaborators');
    }

    vm.editDescriptionProblem = function () {
        $state.go('problem.description');
    };

    vm.doLogout = function () {
        Auth.logout();
        $state.go('init.login');
    };
    }

})();