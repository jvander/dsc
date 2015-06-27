/**
 * Created by JOSEVALDERLEI on 27/06/2015.
 */

(function(){

    'use strict';

    angular.module('app')
        .controller('menuAppController',menuAppController);


    function menuAppController($state,Auth) {
        var vm = this;
        vm.editProblem = function(){
            $state.go('appdsc.problem');
        };

        vm.doLogout = function() {
            Auth.logout();
            $state.go('init');
        };

    };

})();