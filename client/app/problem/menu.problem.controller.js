(function() {

    "use strict";

    angular
        .module('app')
        .controller('menuProblemController', menuProblemaController);

    function menuProblemaController(Auth, $timeout, $state, $mdSidenav ,$mdUtil,$log){

        var self = this;
        self.openChat = buildToggler('chat');
        self.formAddCollaborators = formAddCollaborators;
        self.editDescriptionProblem = editDescriptionProblem;
        self.doLogout = doLogout;

        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },300);
            return debounceFn;
        }

        function formAddCollaborators(){
            $state.go('problem.collaborators');
        }

        function editDescriptionProblem() {
            $state.go('problem.description');
        }

        function doLogout() {
            Auth.logout();
            $state.go('init.login');
        }

    }
})();