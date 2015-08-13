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
                  toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + user.nickname);
                   $state.go('init.login');
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
                  if(data.success) {
                      toastApp.errorMessage("Email com instruções enviado para " + userEmail);
                      $state.go('init.login');
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
                      $state.go('init.login');
                  }else{
                      toastApp.errorMessage("Error");
              }
          });
      }


  }
})();