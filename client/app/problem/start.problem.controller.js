/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */



(function(){
    'use strict';
    angular.module('app')
        .controller('startProblemController',startProblemController);

        function startProblemController($state,Auth,Socket) {
            var vm = this;
            vm.idProblem = '00001';
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

                }

            ];


            vm.searchYoursProblems = function () {
                return vm.problemList;
            }

            vm.editProblem = function (idProblem) {
                vm.idProblem = idProblem;
                console.log("Busca Problem com id" + vm.idProblem);
                Socket.emit('addProblemID', vm.idProblem);
                $state.go('problem');
            };


            vm.doLogout = function () {
                Auth.logout();
                $state.go('init.login');
            };


        }
})();