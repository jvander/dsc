/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function() {

    'use strict';

    angular
        .module('app')
        .controller('loginController',loginController);

        function loginController(Socket, $translate, $rootScope, $state, Auth, $window, $filter, toastApp) {
            var self = this;
            self.inProcessing = false;
            self.setLang = setLang;
            self.doLogout = doLogout;
            self.doLogin = doLogin;

            function setLang(langKey) {
                 $translate.use(langKey);
            }

            function getLocalCode(){
                return Math.random() + Math.floor(Math.random() * 10);

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
                        $window.localStorage.setItem("localcode",data.id + '-' + getLocalCode());
                        $window.localStorage.setItem("nickname",data.nickname);
                        self.setLang(data.language);
                        self.inProcessing = false;
                        Auth.getUser(data.id)
                            .then(function(userData) {
                             toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + data.nickname);
                        if(data.success) {
                            $window.localStorage.setItem("photo",userData.data.photo);
                            $state.go('startproblem');
                        }
                        else {
                            toastApp.errorMessage("Usuário e senha não conferem.");
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
