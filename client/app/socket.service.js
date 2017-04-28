/**
 * Created by JOSEVALDERLEI on 21/06/2015.
 */

(function(){
    'use strict';
    angular
        .module('app')
        .service('Socket',
        ['$location', '$timeout',
    function($location, $timeout) {
        if (true) {
            this.socket = io();
        } else {
            $location.path('/');
        }
        this.on = function(eventName, callback) {
            if (this.socket) {
                this.socket.on(eventName, function(data) {
                    $timeout(function() {
                        callback(data);
                    });
                });
            }
        };
        this.emit = function(eventName, data) {
            if (this.socket) {
                this.socket.emit(eventName, data);
            }
        };
        this.removeListener = function(eventName) {
            if (this.socket) {
                this.socket.removeListener(eventName);
            }
        };
    }
])
})();
