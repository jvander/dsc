(function() {
  'use strict';

  angular
    .module('app')
    .factory('problemService', problemService);

  problemService.$inject = ['$http','$location'];

  function problemService($http,$location) {

    var API_ROUTE_GETUSERPROBLEMS = '/api/problem/getproblems';
    var API_ROUTE_NEWPROBLEM = '/api/problem/newproblem';
    var API_ROUTE_GETPROBLEM = '/api/problem/getproblem';
    var API_ROUTE_GETCOLLABORATORS = '/api/problem/getcollaborators';
    var API_ROUTE_INVITE = '/api/problem/invite';
    var API_ROUTE_GETONION = '/api/problem/getonion';


    var service = {
      newproblem       : newproblem,
      getuserproblems  : getuserproblems,
      getproblem       : getproblem,
      getcollaborators : getcollaborators,
      invite           : invite,
      getonion         : getonion
    };

    return service;

    function newproblem(data) {
        return $http.post(API_ROUTE_NEWPROBLEM, data);
    }

    function getproblem(data){
      return $http.get(API_ROUTE_GETPROBLEM + '?idproblem=' + data );
    }


    function getuserproblems(data){
      return $http.get(API_ROUTE_GETUSERPROBLEMS + '?userid=' + data );
    }

    function getcollaborators(data){
      return $http.get(API_ROUTE_GETCOLLABORATORS + '?idproblem=' + data );
    }

    function invite(data){
      return $http.post(API_ROUTE_INVITE, data );
    }

    function getonion(data){
      return $http.get(API_ROUTE_GETONION + '?idproblem=' + data );
    }
  }
})();
