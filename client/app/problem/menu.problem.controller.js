(function() {
    "use strict";

    angular
        .module('app')
        .controller('menuProblemController', menuProblemaController);

    function menuProblemaController(Auth, $mdDialog, $scope, $filter, $state, $window, problemService,toastApp, Socket){

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
        self.formEditProblem = formEditProblem;
        self.formInviteCollaborator = formInviteCollaborator;
        var localcode = '';
        self.loadArtifact = loadArtifact;



        /*Edit Problem*/

        Socket.on('onAtualizarProblema', function (retorno) {
            if(localcode !== retorno.localcode) {
                self.setDescrition(retorno.description);
            }
        });

        function saveProblem(problem){
            problem.localcode = localcode;
            Socket.emit('atualizarProblema', problem);
        }

        function formEditProblem(ev) {
            $mdDialog.show({
                controller: DialogEditProblemController,
                templateUrl: 'views/pages/problemdescription.html',
                parent: angular.element(document.body),
                targetEvent: ev
            });
        }

        function DialogEditProblemController($timeout,$scope,$mdDialog) {
            var updateTrue = true;
            $scope.problem;
            $scope.problemUpdate = problemUpdate;
            $scope.getProblemEdit = getProblemEdit;
            $scope.saveDescription = saveDescription;
            $scope.nickname = '';



            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };


            function getProblemEdit(){
                $scope.nickname = $window.localStorage.getItem('nickname');
                $scope.idProblem = $window.localStorage.getItem('problemid');
                problemService.getproblem(self.idProblem)
                    .success(function(data) {
                        if(data.success) {
                            $scope.problem = data.problem;
                        }else{
                            toastApp.errorMessage(data.message);
                        }
                    });
            }
            function setUpdate(){
                updateTrue = true;
            }

            function problemUpdate(description) {
                var problem = {
                    'update': updateTrue,
                    'description': description
                }
                saveProblem(problem);
                if (updateTrue) {
                    updateTrue = false;
                    $timeout(setUpdate, 2000);
                }
            }

            function saveDescription(description) {
                var problem = {
                    'update': true,
                    'description': description
                }
                 saveProblem(problem)
            }
            self.setDescrition = function(description){
                $scope.problem.description = description;
            }

        }

 /* Convidar Participantes */
        function formInviteCollaborator(ev) {
            $mdDialog.show({
                controller: DialogInviteCollaboratorController,
                templateUrl: 'views/pages/collaborators.html',
                parent: angular.element(document.body),
                targetEvent: ev
            });
        }

        function DialogInviteCollaboratorController($scope,$mdDialog) {
            $scope.idProblem = "";
            $scope.collaborators = [];
            $scope.useremail = "";
            $scope.initCollaborators = initCollaborators;
            $scope.addCollaborator = addCollaborator;
            $scope.removeCollaborator = removeCollaborator;
            $scope.alertDeleteCollaborator = alertDeleteCollaborator;
            $scope.email = "";

            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            function initCollaborators(){
                $scope.idProblem = $window.localStorage.getItem('problemid');
                $scope.useremail = $window.localStorage.getItem('useremail');

                problemService.getcollaborators($scope.idProblem)
                    .success(function(data) {
                        if(data.success) {
                            $scope.collaborators = data.collaborators;
                            //Socket.emit('checkUsers');
                        }else{
                            toastApp.errorMessage(data.message);
                        }
                    });
            }

            function searchCallaboration(email){
                for(var i = 0; i < $scope.collaborators.length; i++){
                    if(email == $scope.collaborators[i].email){
                        return true;
                    }
                }
                return false;
            }

            function addCollaborator(email){
                if($scope.useremail == email){
                    toastApp.errorMessage($scope.useremail + " is email of owner.");
                }else {
                    if (searchCallaboration(email)) {
                        toastApp.errorMessage("Usuario Cadastrado.");
                    } else {
                        var invite = {
                            idproblem: $scope.idProblem,
                            email: email
                        };
                        problemService.invite(invite)
                            .success(function (data) {
                                if (data.success) {
                                    $scope.collaborators = data.collaborators;
                                    $scope.email = '';
                                } else {
                                    toastApp.errorMessage(data.message);
                                }
                            });
                    }
                }
            }

            function alertDeleteCollaborator(collaborator){
                 collaborator.isDeleted = !collaborator.isDeleted;
            }

            function removeCollaborator(collaborator){
                   collaborator.idproblem = $scope.idProblem;
                   problemService.removecollaborators(collaborator)
                        .success(function(data) {
                            if(data.success) {
                                $scope.collaborators = data.collaborators;
                                $scope.isDeleteCollaborator = !$scope.isDeleteCollaborator;
                                toastApp.errorMessage("Colaborador " + collaborator.nickname + " foi removido do projeto.");
                            }else{
                                toastApp.errorMessage(data.message);
                            }
                        });
            }

        }




/*Menu Control*/
    function getCurrentProblem(){
            self.nickname = $window.localStorage.getItem('nickname');
            self.idProblem = $window.localStorage.getItem('problemid');
            localcode =  $window.localStorage.getItem('localcode');
            $scope.selectedIndex = $window.localStorage.getItem('indiceMenu');
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
        var initsocketproblem = {
            "idproblem":self.idProblem,
             "nickname": self.nickname
        };
        Socket.emit('initProblem', initsocketproblem);
    }

        function loadArtifact (artifac) {
            $state.go(artifac);
        }

        $scope.selectedIndex = 4;
        var selected = null,
            previous = null;
        $scope.$watch('selectedIndex', function(current){
            previous = selected;
            selected =  self.dsc_artifacts[current];
            $scope.selectedIndex = current;
            $window.localStorage.setItem('indiceMenu',$scope.selectedIndex);
        });

        function systemReturn(){
            Socket.emit('disconnectProblem', self.nickname);
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
            Socket.emit('disconnectProblem', self.nickname);
            Auth.logout();
            $state.go('init.login');
        }
    }
})();