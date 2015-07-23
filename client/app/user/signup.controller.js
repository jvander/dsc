(function() {
  'use strict';

  angular
    .module('app')
    .controller('signupController', signupController);
    signupController.$inject = ['$translate','$window','signupService','$state','toastApp','AuthToken','Auth','$filter','$stateParams'];

  function signupController($translate, $window, signupService,$state,toastApp,AuthToken,Auth,$filter,$stateParams){
    /* jshint validthis: true */
    var vm = this;

    vm.message  = '';
    vm.save   = saveUser;
    vm.rescuePassword = rescuePassword;
    vm.changePassword = changePassword;
    vm.setLang = setLang;
    vm.loginInProgress = false;

    function saveUser(user) {
      signupService.create(user)
          .success(function(data) {
            if(data.success) {
              AuthToken.setToken(data.token);
              Auth.getUser()
                  .then(function(data) {
                    vm.user = data.data;
                      vm.loginInProgress = false;
                      $window.localStorage.setItem("useremail",user.email);
                      $window.localStorage.setItem("userid",user.id);
                      $window.localStorage.setItem("nickname",user.nickname);
                      vm.setLang(user.language);
                    toastApp.errorMessage($filter('translate')('WELCOME_SYSTEM') + ": " + vm.user.nickname);
                    $state.go('startproblem');
                  });
          }else{
              toastApp.errorMessage("Email Já cadastrado");
            }
          })
       }

      function setLang(langKey) {
          $translate.use(langKey);
      };

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
                  if(data.success) {
                      toastApp.errorMessage("Senha alterada com sucesso. Faça login com a nova senha.");
                      $state.go('init');
                  }else{
                      toastApp.errorMessage("Error");
              }
          })
      }


  }
})();