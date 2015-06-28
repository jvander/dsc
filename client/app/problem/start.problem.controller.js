/**
 * Created by JOSEVALDERLEI on 28/06/2015.
 */



(function(){
    'use strict';
    angular.module('app')
        .controller('startProblemController',startProblemController);

        function startProblemController($state,Auth) {
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


            vm.searchYoursProblems = function () {
                return vm.problemList;
            }

            vm.editProblem = function () {
                $state.go('problem');
            };


            vm.doLogout = function () {
                Auth.logout();
                $state.go('init.login');
            };


        }
})();