(function() {
  'use strict';

  angular
    .module('app')
    .controller('signupController', signupController);
    signupController.$inject = ['signupService','$state','toastApp','AuthToken','Auth','$filter','$stateParams'];

  function signupController(signupService,$state,toastApp,AuthToken,Auth,$filter,$stateParams){
    /* jshint validthis: true */
    var vm = this;

    vm.message  = '';
    vm.save   = saveUser;
    vm.rescuePassword = rescuePassword;
    vm.changePassword = changePassword;

    function saveUser(user) {
      signupService.create(user)
          .success(function(data) {
            if(data.success) {
              AuthToken.setToken(data.token);
              Auth.getUser()
                  .then(function(data) {
                    vm.user = data.data;
                    toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + vm.user.nickname);
                    $state.go('startproblem');
                  });
          }else{
              toastApp.errorMessage("Email Já cadastrado");
            }
          })
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
              })
      }

      function changePassword(user){
          signupService.changePassword(user)
              .success(function(data) {
                  console.log('retorno...' + data);
                  if(data.success) {
                      toastApp.errorMessage("Senha alterada com sucesso.");
                  }else{
                      toastApp.errorMessage("Error");
              }
          })
      }


  }
})();