(function() {
  'use strict';

  angular
    .module('app')
    .factory('problemService', problemService);

  problemService.$inject = ['$http','$location'];

  function problemService($http,$location) {

    var API_ROUTE_GETUSERPROBLEMS = '/api/problem/getproblems';
    var API_ROUTE_GETUSERPROBLEMSCOLLABORATOR = '/api/problem/getproblemscollaborator';
    var API_ROUTE_NEWPROBLEM = '/api/problem/newproblem';
    var API_ROUTE_GETPROBLEM = '/api/problem/getproblem';
    var API_ROUTE_GETPROBLEMREPORT = '/api/problem/getproblemreport';
    var API_ROUTE_GETCOLLABORATORS = '/api/problem/getcollaborators';
    var API_ROUTE_INVITE = '/api/problem/invite';
    var API_ROUTE_GETONION = '/api/problem/getonion';
    var API_ROUTE_GETEVALUATION = '/api/problem/getevaluation';
    var API_ROUTE_GETSEMIOTICFRAMEWORK = '/api/problem/getsemiotic';
    var API_ROUTE_GETCARF = '/api/problem/getcarf';
    var API_ROUTE_REMOVEPROBLEM = '/api/problem/removeproblem';
    var API_ROUTE_REMOVECOLLABORATOR = '/api/problem/removecollaborator';
    var API_ROUTE_GETHISTORYCHAT = '/api/problem/historychat';
    var API_ROUTE_GETONION3LALYER = '/api/problem/getonion3layer';

    var service = {
      newproblem       : newproblem,
      getuserproblems  : getuserproblems,
      getproblem       : getproblem,
      getcollaborators : getcollaborators,
      invite           : invite,
      getonion         : getonion,
      getevaluation    : getevaluation,
      getsemiotic      : getsemiotic,
      getcarf          : getcarf,
      removeproblem    : removeproblem,
      getproblemscollaborator: getproblemscollaborator,
      removecollaborators : removecollaborators,
      gethistorychat: gethistorychat,
      getproblemreport : getproblemreport,
      getonion3layer : getonion3layer
    };

    return service;

    function newproblem(data) {
        return $http.post(API_ROUTE_NEWPROBLEM, data);
    }

    function getproblemreport(data){
      return $http.get(API_ROUTE_GETPROBLEMREPORT + '?idproblem=' + data );
    }

    function getproblem(data){
      return $http.get(API_ROUTE_GETPROBLEM + '?idproblem=' + data );
    }

    function getuserproblems(data){
      return $http.get(API_ROUTE_GETUSERPROBLEMS + '?email=' + data );
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

    function getonion3layer (data){
      return $http.get(API_ROUTE_GETONION3LALYER + '?idproblem=' + data );
    }

    function getevaluation (data){
      return $http.get(API_ROUTE_GETEVALUATION + '?idproblem=' + data );
    }

    function getsemiotic (data){
      return $http.get(API_ROUTE_GETSEMIOTICFRAMEWORK + '?idproblem=' + data )
    }

    function getcarf(data){
      return $http.get(API_ROUTE_GETCARF + '?idproblem=' + data )
    }

    function removeproblem(data){
      return $http.get(API_ROUTE_REMOVEPROBLEM + '?idproblem=' + data );
    }

    function getproblemscollaborator(data){
      return $http.get(API_ROUTE_GETUSERPROBLEMSCOLLABORATOR + '?email=' + data );
    }

    function removecollaborators(data){
      return $http.get(API_ROUTE_REMOVECOLLABORATOR + '?idproblem=' + data.idproblem + '&email=' + data.email );
    }

    function gethistorychat(data){
      return $http.get(API_ROUTE_GETHISTORYCHAT + '?idproblem=' + data );
    }

  }
})();
