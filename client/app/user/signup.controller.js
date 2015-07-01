(function() {
  'use strict';

  angular
    .module('app')
    .controller('signupController', signupController);
    signupController.$inject = ['signupService','$state','toastApp','AuthToken','Auth','$filter'];

  function signupController(signupService,$state,toastApp,AuthToken,Auth,$filter){
    /* jshint validthis: true */
    var vm = this;

    vm.message  = '';
    vm.save   = saveUser;
    vm.rescuePassword = rescuePassword;

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
                      toastApp.errorMessage("iiiiiiiiiiiiiiiiiiii");
                  }

              })

      }


  }
})();