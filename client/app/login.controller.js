/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function() {
    'use strict';

    angular.module('app')
       .controller('loginController',loginController);


        function loginController($translate, $rootScope, $state, Auth, $window, $filter, toastApp) {
            var vm = this;

            vm.setLang = function(langKey) {
                 $translate.use(langKey);
            };

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
                        $window.localStorage.setItem("useremail",data.email);
                        $window.localStorage.setItem("userid",data.id);
                        $window.localStorage.setItem("nickname",data.nickname);
                        vm.setLang(data.language);
                        vm.processing = false;
                        Auth.getUser()
                            .then(function(data) {
                                   vm.user = data.data;
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
