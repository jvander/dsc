(function() {
  'use strict';

  angular
    .module('app')
    .factory('signupService', signupService);

  signupService.$inject = ['$http'];

  function signupService($http) {

    var API_ROUTE_USER = '/api/signup/';
    var API_ROUTE_RESCUEPASSWORD = '/api/rescuepasswd/';
    var API_ROUTE_SETNEWPASSWORD = '/api/rescuepasswd/newpasswd/';


    var service = {
      create         : create,
      rescuePassword : rescuePassword,
      changePassword : changePassword
    };
    return service;

    function create(data) {
        return $http.post(API_ROUTE_USER, data);
    }

    function rescuePassword(data){
      return $http.post(API_ROUTE_RESCUEPASSWORD, data);
    }

    function changePassword(data){
      return $http.post(API_ROUTE_SETNEWPASSWORD, data);
    }
  }
})();
