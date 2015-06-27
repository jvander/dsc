(function() {
  'use strict';

  angular
    .module('app')
    .controller('signupController', signupController);

  signupController.$inject = ['signupModel'];

  function signupController(signupModel){
    /* jshint validthis: true */
    var vm = this;

    vm.message  = '';
    vm.save   = save;


    function save(user) {
      signupModel.create(user);
    }

    var _return = {
      success: function(data) {
        vm.message = 'Usuário criado com sucesso';
      },
      error: function(data) {
        vm.message = data.message;
        console.warn(data);
      }
    };
  }
})();