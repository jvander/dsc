(function() {
  'use strict';

  angular
    .module('app')
    .factory('signupService', signupService);

  signupService.$inject = ['$http','$location'];

  function signupService($http,$location) {

    var API_ROUTE_USER = '/api/signup/';
    var API_ROUTE_RESCUEPASSWORD = '/api/rescuepasswd/';
    var API_ROUTE_SETNEWPASSWORD = '/api/rescuepasswd/newpasswd/';
    var API_ROUTE_UPDATEPHOTO = '/api/profile/photo/';
    var API_ROUTE_SENDMESSAGE = '/api/sendmessage/';


    var service = {
      create         : create,
      rescuePassword : rescuePassword,
      changePassword : changePassword,
      uploadPhoto: uploadPhoto,
      sendemailDSC: sendemailDSC
    };

    return service;

    function sendemailDSC(data){
      return $http.post(API_ROUTE_SENDMESSAGE, data);
    }

    function create(data) {
        return $http.post(API_ROUTE_USER, data);
    }

    function rescuePassword(data){
      return $http.post(API_ROUTE_RESCUEPASSWORD, data);
    }

    function changePassword(data){
      var mytokenURL = $location.search();
      return $http.get(API_ROUTE_SETNEWPASSWORD + '?mytoken=' + mytokenURL.mytoken+'&password='+data.password);
    }

    function uploadPhoto(data) {
      return $http.post(API_ROUTE_UPDATEPHOTO, data);
    }
  }

})();
