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

        self.dsc_artifacts;


        var dsc_artifacts = [
            {name: 'problem.stakeholders', label: $filter('translate')('LABEL_ARTIFACT_STAKEHOLDER')},
            {name: 'problem.evaluationframework', label: $filter('translate')('LABEL_ARTIFACT_EVALUATION_FRAMEWORK')},
            {name: 'problem.semioticframework', label: $filter('translate')('LABEL_ARTIFACT_SEMIOTIC_FRAMEWORK')},
            {name: 'problem.vif', label: $filter('translate')('LABEL_ARTIFACT_VIF')},
            {name: 'problem.carf', label: $filter('translate')('LABEL_ARTIFACT_CARF')}

        ],
            selected = null,
            previous = null;



        /*var tabs_artefatos = [
                {title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
                {title: 'Two', content: "You can swipe left and right on a mobile device to change tabs."},
                {title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
                {title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
                {title: 'Five', content: "If you remove a tab, it will try to select a new one."},
                {title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
            ],
            selected = null,
            previous = null;
*/
        /*self.selectedIndex = 1;

        $scope.$watch('selectedIndex', function(current, old){
            previous = selected;

            selected = dsc_artifacts[current];
            if ( old + 1 && (old != current)){
                console.log('Goodbye ' + previous.name + '!');
            }
            if ( current + 1 ){
                console.log('Hello ' + selected.name + '!');
            }
        });*/


        function getCurrentProblem(){
            self.nickname = $window.localStorage.getItem('nickname');
            self.idProblem = $window.localStorage.getItem('problemid');
            problemService.getproblem(self.idProblem)
                .success(function(data) {
                    if(data.success) {
                        self.problem = data.problem;
                        self.dsc_artifacts = dsc_artifacts;
                        console.log(self.dsc_artifacts);
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
            var initsocketproblem = {
                "idproblem": self.idProblem,
                "nickname": self.nickname
            };
            Socket.emit('initProblem', initsocketproblem);
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