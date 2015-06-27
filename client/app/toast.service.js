/**
 * Created by JOSEVALDERLEI on 27/06/2015.
 */
'use strict';

angular.module('toastService',[])
    .controller('toastController', function($mdToast) {
        this.closeToast = function() {
            $mdToast.hide();
        };
    })
    .factory( 'toastApp', toastApp );

    toastApp.$inject = [ '$mdToast' ];

    function toastApp ($mdToast) {


    var service = {
        message: '',
        errorMessage: errorMessage
    };


    return service;


    function errorMessage(errorMessage) {
        this.message = errorMessage;
        $mdToast.show(
            $mdToast.simple()
                .content(this.message)
                .action('OK')
                .highlightAction(true)
                .position('top right')
                .hideDelay(9000)
        );
    }
}





