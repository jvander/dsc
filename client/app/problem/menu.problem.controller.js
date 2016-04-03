(function() {
    "use strict";

    angular
        .module('app')
        .controller('menuProblemController', menuProblemaController);

    function menuProblemaController(Auth, $filter, $state, $window, problemService,toastApp, Socket){

        var self = this;
        //self.openChat = buildToggler('chat');
        self.formAddCollaborators = formAddCollaborators;
        self.editDescriptionProblem = editDescriptionProblem;
        self.doLogout = doLogout;
        self.systemReturn = systemReturn;
        self.formProblemReport = formProblemReport;
        self.getCurrentProblem = getCurrentProblem;
        self.nickname;
        self.dsc_artifacts = [];



        function getCurrentProblem(){
            self.nickname = $window.localStorage.getItem('nickname');
            self.idProblem = $window.localStorage.getItem('problemid');
            problemService.getproblem(self.idProblem)
                .success(function(data) {
                    if(data.success) {
                        self.problem = data.problem;
                        angular.forEach(data.problem.artifacts, function (artifact) {
                            var name = artifact.split("_");
                            self.dsc_artifacts.push({name: "problem." + name[2].toLowerCase(), label: $filter('translate')(artifact)});
                        });
                        //self.dsc_artifacts = dsc_artifacts;
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
        }
        function systemReturn(){
            $state.go('startproblem');
        }


        function formAddCollaborators(){
            $state.go('problem.collaborators');
        }

        function formProblemReport(){
            $state.go('dscreport');
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