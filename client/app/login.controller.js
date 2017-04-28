/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function() {

    'use strict';

    angular
        .module('app')
        .controller('loginController',loginController);

        function loginController(rx, $timeout, $translate, $rootScope, $state, Auth, $window, $filter, toastApp) {
            var self = this;
            self.inProcessing = false;
            self.setLang = setLang;
            self.doLogout = doLogout;
            self.doLogin = doLogin;
            self.netImg = netImg;


            var slides =  [
                {image: "../views/img/sawd.jpg"},
                {image: "../views/img/sawd0.jpg"},
                {image: "../views/img/sawd1.jpg"},
                {image: "../views/img/sawd2.jpg"},
                {image: "../views/img/sawd3.jpg"},
                {image: "../views/img/sawd4.jpg"},
                {image: "../views/img/sawd5.jpg"},
                {image: "../views/img/sawd6.jpg"},
                {image: "../views/img/sawd7.jpg"},
                {image: "../views/img/sawd8.jpg"},
                {image: "../views/img/sawd8.jpg"},
                {image: "../views/img/sawd10.jpg"}
            ];

            var index = 0;
            self.photo = slides[index].image;

            function netImg() {
                index = (index + 1) % slides.length;
                self.photo = slides[index].image;
            }

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
