(function() {
  'use strict';

  angular
    .module('app')
    .controller('signupController', signupController);
    signupController.$inject = ['signupModel','$state','toastApp'];

  function signupController(signupModel,$state,toastApp){
    /* jshint validthis: true */
    var vm = this;

    vm.message  = '';
    vm.save   = save;


    function save(user) {
      signupModel.create(user)
          .success(function(data) {
            if(data.success) {
              toastApp.errorMessage("Cadastro realizado com sucesso!");
              $state.go('init.login');
            }
            else{
              toastApp.errorMessage("Email Já cadastrado");
            }

          })


    }

  }
})();