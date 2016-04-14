
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
            $scope.items = ['LABEL_ARTIFACT_STAKEHOLDERS',
                'LABEL_ARTIFACT_EVALUATIONFRAMEWORK',
                'LABEL_ARTIFACT_SEMIOTICFRAMEWORK',
                'LABEL_ARTIFACT_VIF',
                'LABEL_ARTIFACT_CARF',
                'LABEL_ARTIFACT_ONION'];

            $scope.selected = [];

            $scope.toggle = function (item, list) {
                var idx = list.indexOf(item);

                if (idx > -1) {
                    if(item !== 'LABEL_ARTIFACT_STAKEHOLDERS'){
                        list.splice(idx, 1);
                    }else{
                        if(list.length === 2){
                            var idxSF = list.indexOf('LABEL_ARTIFACT_SEMIOTICFRAMEWORK');
                            if(idxSF > -1){
                                list.splice(idx, 1);
                            }
                        }
                        else if(list.length === 1){
                            list.splice(idx, 1);
                        }else{
                            toastApp.errorMessage($filter('translate')('LABEL_ARTIFACT_STAKEHOLDERS_NECESSARY'));
                        }
                    }


                }else {
                    if(item != 'LABEL_ARTIFACT_SEMIOTICFRAMEWORK'){
                        idx = list.indexOf('LABEL_ARTIFACT_STAKEHOLDERS');
                        if (idx < 0) {
                            list.push('LABEL_ARTIFACT_STAKEHOLDERS');
                            if(item !== 'LABEL_ARTIFACT_STAKEHOLDERS'){
                                list.push(item);
                            }
                        }else{
                            list.push(item);
                        }
                    }else{
                        list.push(item);
                    }
                }
            };
            $scope.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };

            $scope.isIndeterminate = function() {
                return ($scope.selected.length !== 0 &&
                $scope.selected.length !== $scope.items.length);
            };

            $scope.isChecked = function() {
                return $scope.selected.length === $scope.items.length;
            };

            $scope.toggleAll = function() {
                if ($scope.selected.length === $scope.items.length) {
                    $scope.selected = [];
                } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                    $scope.selected = $scope.items.slice(0);
                }
            };


            $scope.artifactList = [];
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.addNewProblem = function(problem) {
                    if($scope.selected.length < 1){
                        toastApp.errorMessage($filter('translate')('LABEL_CHOICE_ARTIFACTS'));
                        return;
                    }
                    problem.artifacts =  $scope.selected;
                    self.startNewProblem(problem);
                    $mdDialog.cancel();
                };

            }



    }
})();

