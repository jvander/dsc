
(function(){

    'use strict';
    angular.module('app')
        .controller('startProblemController',startProblemController);
        function startProblemController($mdDialog,$state,Auth,Socket, $window, problemService,toastApp ) {
            var vm = this;
            vm.nickname = "";
            vm.userid = "";
            vm.useremail = "";
            vm.problemList = [];
            vm.problemCollaboratorList = [];
            vm.loginInProgress = true;

            vm.getProblems = function(){
                vm.userid = $window.localStorage.getItem('userid');
                vm.nickname = $window.localStorage.getItem('nickname');
                vm.useremail = $window.localStorage.getItem('useremail');
                problemService.getuserproblems(vm.useremail)
                    .success(function(data) {
                    if(data.success) {
                        for(var i=0; i < data.problems.length; i++ ){
                            data.problems[i].description = data.problems[i].description.replace(/(<([^>]+)>)/ig,"").substring(0,460);
                        };
                        vm.problemList = data.problems;
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                })
                problemService.getproblemscollaborator(vm.useremail)
                    .success(function(data) {
                        if(data.success) {
                            for(var i=0; i < data.problems.length; i++ ){
                                data.problems[i].description = data.problems[i].description.replace(/(<([^>]+)>)/ig,"").substring(0,460);
                            };
                            vm.problemCollaboratorList = data.problems;
                        }else{
                            toastApp.errorMessage(data.message);
                        }
                    })
                vm.loginInProgress = false;
            };

            function removeProblem(problemid){
                    problemService.removeproblem(problemid)
                    .success(function(data) {
                        if(data.success) {
                            for(var i=0; i < vm.problemList.length; i++){
                                if(vm.problemList[i]._id == problemid){
                                    vm.problemList.splice(i,1);
                                    break;
                                }
                            }
                        }else{
                            toastApp.errorMessage(data.message);
                        }
                    })
            }


            vm.revomveProblem = function(ev,problem) {
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
                    removeProblem(problem._id);
                });
            };

            vm.startNewProblem = function(newproblem){
                newproblem.userid = vm.userid;
                problemService.newproblem(newproblem)
                    .success(function(data) {
                        if(data.success) {
                            vm.editProblem(data.problem)
                        }else{
                            toastApp.errorMessage(data.message);
                        }
                    });
            }

            vm.editProblem = function (problem) {

                $window.localStorage.setItem("problemid",problem._id);
                var initsocketproblem = {
                    "idproblem":problem._id,
                    "nickname": vm.nickname
                };
                Socket.emit('initProblem', initsocketproblem);
                $state.go('problem.stakeholders');
            };


            vm.doLogout = function () {
                Auth.logout();
                $state.go('init.login');
            };


            vm.newProblem = function(ev) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'views/pages/newproblem.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                })
            };
            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.addNewProblem = function(problem) {
                    vm.startNewProblem(problem);
                    $mdDialog.cancel();
                };

            }
    }
})();

