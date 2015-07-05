/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */



(function(){
    'use strict';
    angular.module('app')
        .controller('startProblemController',startProblemController);
        function startProblemController($state,Auth,Socket, dscSharedService ) {
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

            vm.editProblem = function (newproblem) {
                vm.problem = newproblem;
                console.log("Busca Problem com id" + newproblem.id);
                dscSharedService.prepForBroadcast(vm.problem);
                Socket.emit('addProblemID', vm.problem);

                $state.go('problem');
            };


            vm.doLogout = function () {
                Auth.logout();
                $state.go('init.login');
            };


        }
})();