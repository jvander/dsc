/**
 * Created by JOSEVALDERLEI on 05/07/2015.
 */


angular.module('dscShared',[])
    .factory('dscSharedService', function dscSharedService($rootScope) {
    var sharedService = {};
    sharedService.problem = {
        "id": ''
    }
    sharedService.prepForBroadcast = function (problem) {
        this.problem = problem;
        this.broadcastProblem();

    }

    sharedService.broadcastProblem = function () {
        $rootScope.$broadcast('handleBroadcastProblem');
    };

    return sharedService;
});