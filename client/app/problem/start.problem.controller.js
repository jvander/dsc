
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

            vm.getProblems = function(){
                vm.userid = $window.localStorage.getItem('userid');
                vm.nickname = $window.localStorage.getItem('nickname');
                vm.useremail = $window.localStorage.getItem('useremail');
                problemService.getuserproblems(vm.useremail)
                    .success(function(data) {
                    if(data.success) {
                         vm.problemList = data.problems;
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                })
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

