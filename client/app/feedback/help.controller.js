/**
 * Created by JOSEVALDERLEI on 19/06/2015.
 */
(function(){

'use strict';

    angular
    .module('app')
    .controller('helpController',helpController)
    .directive('buttonhelp',buttonhelp);


function helpController($mdDialog) {
    var self = this;
    self.openFormEmail = openFormEmail;
    function openFormEmail(ev){
        $mdDialog.show({
            controller: HelpEmilController,
            templateUrl: 'views/pages/helpdsc.html',
            parent: angular.element(document.body),
            targetEvent: ev
        });
    }

    function HelpEmilController($scope,toastApp, signupService,$mdDialog,$window) {

        $scope.sendEmailDSC = sendEmailDSC;

        function sendEmailDSC(message){
            message.nickname = $window.localStorage.getItem('nickname');
            message.emilContact = $window.localStorage.getItem('useremail');

            signupService.sendemailDSC(message)
                .success(function(data) {
                    if(data.success) {
                        $scope.hide();
                        toastApp.errorMessage('Thank you for you message');

                    }else{

                    }
                });

        }

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }

}

function buttonhelp(){
    return {
        templateUrl : "app/feedback/helpbutton.html",
        restrict: "E"
        };
    }

})();