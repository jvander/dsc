(function() {
  'use strict';

  angular
    .module('app')
    .controller('signupController', signupController);
    signupController.$inject = ['$translate','$window','signupService','$state','toastApp','AuthToken','Auth','$filter','$stateParams'];

  function signupController($translate, $window, signupService,$state,toastApp,AuthToken,Auth,$filter,$stateParams){

    var self = this;
    self.message  = '';
    self.save   = saveUser;
    self.rescuePassword = rescuePassword;
    self.changePassword = changePassword;
    self.setLang = setLang;
    self.loginInProgress = false;

    function saveUser(user) {
      signupService.create(user)
          .success(function(data) {
            if(data.success) {
              AuthToken.setToken(data.token);
              Auth.getUser()
                  .then(function(data) {
                    self.user = data.data;
                      self.loginInProgress = false;
                      $window.localStorage.setItem("useremail",user.email);
                      $window.localStorage.setItem("userid",user.id);
                      $window.localStorage.setItem("nickname",user.nickname);
                      self.setLang(user.language);
                    toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + self.user.nickname);
                    $state.go('startproblem');
                  });
          }else{
              toastApp.errorMessage("Email Já cadastrado");
            }
          });
       }

      function setLang(langKey) {
          $translate.use(langKey);
      }

      function rescuePassword(userEmail){
          signupService.rescuePassword(userEmail)
              .success(function(data) {
                  console.log(data);
                  if(data.success) {
                      toastApp.errorMessage("Email com instruções enviado");
                  }else{
                      toastApp.errorMessage("Error");
                  }
              });
      }

      function changePassword(user){
          signupService.changePassword(user)
              .success(function(data) {
                  if(data.success) {
                      toastApp.errorMessage("Senha alterada com sucesso. Faça login com a nova senha.");
                      $state.go('init');
                  }else{
                      toastApp.errorMessage("Error");
              }
          });
      }


  }
})();