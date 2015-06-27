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
            create  : create,
        };

        return service;
        ///////////////////

        function create(data) {
            var _handleCreate = {
                success: function(result){
                   console.log(result.data);
                },
                error: function(error){
                    console.error('signupModel : User create error' + error);
                }
            };
            signupService.create(data).then(_handleCreate.success, _handleCreate.error);
        }
    }
})();