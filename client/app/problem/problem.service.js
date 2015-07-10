(function() {
  'use strict';

  angular
    .module('app')
    .factory('problemService', problemService);

  problemService.$inject = ['$http','$location'];

  function problemService($http,$location) {

    var API_ROUTE_GETUSERPROBLEMS = '/api/problem/getproblems';
    var API_ROUTE_NEWPROBLEM = '/api/problem/newproblem';


    var service = {
      newproblem       : newproblem,
      getuserproblems : getuserproblems,
    };

    return service;

    function newproblem(data) {
        return $http.post(API_ROUTE_NEWPROBLEM, data);
    }



    function getuserproblems(data){
      return $http.get(API_ROUTE_GETUSERPROBLEMS + '?userid=' + data );
    }
  }
})();
