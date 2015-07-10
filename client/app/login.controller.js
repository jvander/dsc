/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function() {
    'use strict';

    angular.module('app')
       .controller('loginController',loginController);


        function loginController($rootScope,$state, Auth, $window, $filter, toastApp) {
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
                                   $window.localStorage.setItem("userid",vm.user.id);

                                   $window.localStorage.setItem("nickname",vm.user.nickname);

                                   toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + vm.user.nickname);
                            });
                        if(data.success) {
                            $state.go('startproblem');

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

        }

})();
