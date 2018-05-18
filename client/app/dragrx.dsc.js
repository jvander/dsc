/**
 * Created by jesus on 21/03/2016.
 */
;(function (undefined) {
    'use strict';
    angular.module('appRxDrag', ['rx'])
        .directive('rxdraggable', function($document, $window, rx, Socket) {
            return function(scope, element, attrs) {
                // Get the three major events
                var localcode =  $window.localStorage.getItem('localcode');
                var mouseup   = rx.Observable.fromEvent(element,   'mouseup');
                var mousemove = rx.Observable.fromEvent($document, 'mousemove');
                var mousedown = rx.Observable.fromEvent(element,   'mousedown').map(function (event) {
                    // calculate offsets when mouse down
                    event.preventDefault();
                    return {
                        left: event.clientX - element[0].getBoundingClientRect().left,
                        top:  event.clientY - element[0].getBoundingClientRect().top,
                    };
                });

                // Combine mouse down with mouse move until mouse up
                var mousedrag = mousedown.selectMany(function(imageOffset) {
                    return mousemove.map(function (pos) {
                        // calculate offsets from mouse down to mouse moves
                        return {
                            left: pos.clientX - imageOffset.left,
                            top:  pos.clientY - imageOffset.top
                        };
                    }).takeUntil(mouseup);
                });

                mousedrag.subscribe (function (pos) {
                    // Update position
                    element.css({top: pos.top + 'px', left: pos.left + 'px'});
                    pos.localcode = localcode;
                    Socket.emit('broadcastMove',pos);

                }).takeUntil(mousedown);;

            };
        });

}.call(this));