/**
 * Created by JOSEVALDERLEI on 26/06/2015.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('signupModel', signupModel);

    signupModel.$inject = ['signupService'];

    function signupModel(signupService) {

        var service = {
            create  : create
        };

        return service;

        function create(data) {
            return signupService.create(data);
        }
    }
})();