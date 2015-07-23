/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */




(function() {


    "use strict";

    angular.module('app')
        .controller('menuProblemController', menuProblemaController);

    function menuProblemaController(Auth, $timeout, $state, $mdSidenav ,$mdUtil,$log){
        var self = this;

        self.openChat = buildToggler('chat');
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildToggler(navID) {
            var debounceFn =  $mdUtil.debounce(function(){
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            },300);
            return debounceFn;
        };


     self.formAddCollaborators = function(){
        $state.go('problem.collaborators');
      }
        self.openReport = function(){
            $state.go('problem.dscreport');
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