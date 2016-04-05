
(function(){

    'use strict';

    angular
        .module('app')
        .controller('startProblemController',startProblemController);

    function startProblemController($mdDialog,$state,Auth,Socket, $window, problemService,toastApp ) {

        var self = this;
        self.nickname = "";
        self.userid = "";
        self.useremail = "";
        self.problemList = [];
        self.problemCollaboratorList = [];
        self.loginInProgress = true;
        self.getProblems = getProblems;
        self.revomveProblem = revomveProblem;
        self.startNewProblem = startNewProblem;
        self.editProblem = editProblem;
        self.doLogout = doLogout;
        self.newProblem = newProblem;
        self.editProfile = editProfile;
        self.photo;


        function getProblems(){
            self.userid = $window.localStorage.getItem('userid');
            self.nickname = $window.localStorage.getItem('nickname');
            self.useremail = $window.localStorage.getItem('useremail');
            self.photo = $window.localStorage.getItem('photo');


            problemService.getuserproblems(self.useremail)
                .success(function(data) {
                    if(data.success) {
                        for(var i=0; i < data.problems.length; i++ ){
                            if(data.problems[i].description.length > 300){
                                data.problems[i].description = data.problems[i].description.replace(/(<([^>]+)>)/ig,"").substring(0,280);
                            }
                            else {
                                data.problems[i].description = data.problems[i].description.replace(/(<([^>]+)>)/ig,"");
                            }
                        }
                        self.problemList = data.problems;
                        problemService.getproblemscollaborator(self.useremail)
                            .success(function(data) {
                                if(data.success) {
                                    for(var i=0; i < data.problems.length; i++ ){
                                        if(data.problems[i].description !== null) {
                                               if (data.problems[i].description.length > 300) {
                                                data.problems[i].description = data.problems[i].description.replace(/(<([^>]+)>)/ig, "").substring(0, 280);
                                            }
                                            else {
                                                data.problems[i].description = data.problems[i].description.replace(/(<([^>]+)>)/ig, "");
                                            }
                                        }
                                    }
                                    self.problemCollaboratorList = data.problems;
                                }else{
                                    toastApp.errorMessage(data.message);
                                }
                            });

                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
            self.loginInProgress = false;
        }

        function deleteProblem(problemid){
            problemService.removeproblem(problemid)
                .success(function(data) {
                    if(data.success) {
                        for(var i=0; i < self.problemList.length; i++){
                            if(self.problemList[i]._id == problemid){
                                self.problemList.splice(i,1);
                                break;
                            }
                        }
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
        }

        function revomveProblem(ev,problem) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Detete Problem?')
                .content('Title: ' + problem.title)
                .ariaLabel('Remove Problem')
                .ok('Desejo remover!')
                .cancel('Cancel')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                deleteProblem(problem._id);
            });
        }

        function startNewProblem(newproblem){
            newproblem.userid = self.userid;

            problemService.newproblem(newproblem)
                .success(function(data) {
                    if(data.success) {
                        self.editProblem(data.problem);
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
        }

        function editProblem(problem) {
            $window.localStorage.setItem("problemid",problem._id);
            var initsocketproblem = {
                "idproblem":problem._id,
                "nickname": self.nickname
            };
            Socket.emit('initProblem', initsocketproblem);
            $state.go('problem.stakeholders');
        }

        function doLogout() {
            Auth.logout();
            $state.go('init.login');
        }
        function editProfile() {
            $state.go('profile');
        }

        function newProblem(ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'views/pages/newproblem.html',
                    parent: angular.element(document.body),
                    targetEvent: ev
                });
            }

        function DialogController($scope, $filter, $mdDialog) {
            $scope.artifactList = [];
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.addNewProblem = function(problem) {
                    if($scope.artifactList.length < 1){
                        toastApp.errorMessage($filter('translate')('LABEL_CHOICE_ARTIFACTS'));
                        return;
                    }
                    var ef = false;
                    var dpi = false;
                    for(var i=0; i < $scope.artifactList.length; i++){
                        if($scope.artifactList[i] === 'LABEL_ARTIFACT_STAKEHOLDERS'){
                            dpi = true;
                        }
                        if($scope.artifactList[i] === 'LABEL_ARTIFACT_EVALUATIONFRAMEWORK'){
                            ef = true;
                        }
                    }
                    if(ef && !dpi){
                        toastApp.errorMessage('Para utilizar o EF você precisa do DPI.'/*$filter('translate')('LABEL_CHOICE_ARTIFACTS')*/);
                        return;
                    }
                    problem.artifacts =  $scope.artifactList;
                    self.startNewProblem(problem);
                    $mdDialog.cancel();
                };
             $scope.addArtifact = function addArtifact(artifact){
                     for(var i=0; i < $scope.artifactList.length; i++){
                         if($scope.artifactList[i] === artifact){
                             $scope.artifactList.splice(i,1);
                             return;
                         }
                     }
                     $scope.artifactList.push(artifact);
                }
            }



    }
})();

