/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function() {

    'use strict';

    angular
        .module('app')
        .controller('loginController',loginController);

        function loginController($translate, $rootScope, $state, Auth, $window, $filter, toastApp) {
            var self = this;
            self.inProgress = false;
            self.setLang = setLang;
            self.doLogout = doLogout;
            self.doLogin = doLogin;

            function setLang(langKey) {
                 $translate.use(langKey);
            }

            self.loggedIn = Auth.isLoggedIn();

            $rootScope.$on('$routeChangeStart', function() {
                self.loggedIn = Auth.isLoggedIn();
                Auth.getUser()
                    .then(function(data) {
                        self.user = data.data;
                    });
            });

            function doLogin(user) {
                self.inProgress = true;
                self.error = '';
                Auth.login(user.email, user.password)
                    .success(function(data) {
                        $window.localStorage.setItem("useremail",data.email);
                        $window.localStorage.setItem("userid",data.id);
                        $window.localStorage.setItem("nickname",data.nickname);
                        self.setLang(data.language);
                        self.inProgress = false;
                        Auth.getUser()
                            .then(function(data) {
                                   self.user = data.data;
                                   toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + self.user.nickname);
                            });
                        if(data.success) {
                            $state.go('startproblem');

                        }
                        else {
                            self.error = data.message;
                        }

                    });
            }

            function doLogout() {
                Auth.logout();
                $state('init');
            }

        }

})();
