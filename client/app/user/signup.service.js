(function() {
  'use strict';

  angular
    .module('app')
    .factory('signupService', signupService);

  signupService.$inject = ['$http'];

  function signupService($http) {

    var API_ROUTE = '/api/signup/';

    var service = {
      API_ROUTE     : API_ROUTE,
      create        : create
    };

    return service;


    function create(data) {
      return $http.post(API_ROUTE, data);

    }
  }
})();
