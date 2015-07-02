(function() {
  'use strict';

  angular
    .module('app')
    .factory('signupService', signupService);

  signupService.$inject = ['$http'];

  function signupService($http) {

    var API_ROUTE_USER = '/api/signup/';
    var API_ROUTE_RESCUEPASSWORD = '/api/rescuepasswd/';


    var service = {
      create         : create,
      rescuePassword : rescuePassword
    };
    return service;

    function create(data) {
        return $http.post(API_ROUTE_USER, data);
    }

    function rescuePassword(data){
      return $http.post(API_ROUTE_RESCUEPASSWORD, data);
    }
  }
})();
