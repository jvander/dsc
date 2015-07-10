/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */




(function() {


    "use strict";

    angular.module('app')
        .controller('menuProblemController', menuProblemaController);

    function menuProblemaController(Auth, $state){



    var self = this;

     self.formAddCollaborators = function(){
        $state.go('problem.collaborators');
    }

        self.editDescriptionProblem = function () {
        $state.go('problem.description');
    };

        self.doLogout = function () {
        Auth.logout();
        $state.go('init.login');
    };
    }

})();