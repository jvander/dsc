(function() {
  'use strict';
  angular
    .module('app')
    .controller('signupController', signupController);

  function signupController($translate, signupService,$state,toastApp,$filter){

      var self = this;
    self.message  = '';
    self.saveUser   = saveUser;
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
                      toastApp.errorMessage("Email com instruções enviado para " + userEmail.email);
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