/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */



(function(){
    'use strict';
    angular.module('app')
        .controller('startProblemController',startProblemController);
        function startProblemController($mdDialog,$state,Auth,Socket, dscSharedService ) {
            var vm = this;

            vm.problemList = [
                {
                    id: '001',
                    title: 'Entendendo DSC',
                    description: 'Design socialemten consciente... bla bla bla',
                    team: ['Jesus', 'Madalena', 'Judas']

                },
                {
                    id: '002',
                    title: 'Problem 002',
                    description: 'blal blalblablab ',
                    team: ['Jaca', 'Jeca', 'Jica']

                },
                {
                    id: '003',
                    title: 'Problem 003',
                    description: 'blal blalblablab ',
                    team: ['Jaca', 'Jeca', 'Jica']

                }

            ];

            vm.problem = {
                id: '001',
                title: 'Entendendo DSC',
                description: 'Design socialemten consciente... bla bla bla',
                team: ['Jesus', 'Madalena', 'Judas']
            }


            vm.searchYoursProblems = function () {
                return vm.problemList;
            };


            vm.startNewProblem = function(problem){

                console.log("salva problema");

                vm.editProblem(problem);
            }


            vm.editProblem = function (problem) {

                vm.problem = problem;
                console.log("Salva problema e busca problema" + problem);
                //dscSharedService.prepForBroadcast(vm.problem);
                Socket.emit('addProblemID', vm.problem);
                $state.go('problem');
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
                    console.log('retorno form...' + problem );
                    vm.startNewProblem(problem);
                    $mdDialog.cancel();
                };

            }
    }
})();


