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
            self.inProcessing = false;
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
                self.inProcessing = true;
                self.error = '';
                Auth.login(user.email, user.password)
                    .success(function(data) {
                        $window.localStorage.setItem("useremail",data.email);
                        $window.localStorage.setItem("userid",data.id);
                        $window.localStorage.setItem("nickname",data.nickname);
                        self.setLang(data.language);
                        Auth.getUser(data.id)
                            .then(function(userData) {
                             toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + data.nickname);

                        if(data.success) {
                            console.log(userData)
                            $window.localStorage.setItem("photo",userData.data.photo);

                            self.inProcessing = false;
                            $state.go('startproblem');
                        }
                        else {
                            self.error = data.message;
                        }
                     });

                    });
            }

            function doLogout() {
                Auth.logout();
                $state('init');
            }

        }


})();
