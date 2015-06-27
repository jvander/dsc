/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function() {
    'use strict';

    angular.module('appLogin',[])
       .controller('loginController', function($rootScope, $state, Auth) {
            var vm = this;

            vm.loggedIn = Auth.isLoggedIn();
            $rootScope.$on('$routeChangeStart', function() {
                vm.loggedIn = Auth.isLoggedIn();
                Auth.getUser()
                    .then(function(data) {
                        vm.user = data.data;
                    });
            });

            vm.doLogin = function(user) {
                vm.processing = true;
                vm.error = '';
                Auth.login(user.email, user.password)
                    .success(function(data) {


                       vm.processing = false;
                        Auth.getUser()
                            .then(function(data) {
                                   vm.user = data.data;
                                   console.log(vm.user);
                            });

                        if(data.success) {
                            $state.go('appdsc');
                        }
                        else {
                            vm.error = data.message;
                        }

                    });
            };
            vm.doLogout = function() {
                Auth.logout();
                $state('init');
            };


        });
})();
