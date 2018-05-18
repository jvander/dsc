'use strict';

angular.module('DropDSC',[])
    .directive('draggable', function($document,Socket,$window) {
      return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attr) {
                   element.on('mousedown', function(event) {
                       if(event.target.id.substring(0,11) == "stakeholder"){
                           event.preventDefault();
                           $document.bind('mousemove', mousemove);
                           $document.bind('mouseup', mouseup);
                       }else{
                           if(event.target.id.substring(0,6) == "postit"){
                               event.preventDefault();
                               $document.bind('mousemove', mousemovePostIt);
                               $document.bind('mouseup', mouseupPostIt);
                           }
                       }

                   });
                   function mousemove(event) {
                       var id_div = event.target.id;
                       if (id_div == 'svg') {
                           id_div = "";
                       }


                       y = event.pageY;
                       x = event.pageX;
                       scope.stakeholder.onionlayer = id_div;
                       element.css({
                           top: (15 + y) + 'px',
                           left: x + 'px'
                       });

                       scope.stakeholder.x = x + 'px';
                       scope.stakeholder.y = y + 'px';
                   };

                 function mousemovePostIt(event) {
                     var id_div = event.target.id;
                     if (id_div == 'svg') {
                         id_div = "";
                     }
                    scope.postit.layer = id_div;
                     y = event.pageY;
                     x = event.pageX;
                     element.css({
                         top: (15 + y) + 'px',
                         left: x + 'px'
                     });
                     scope.postit.x = x + 'px';
                     scope.postit.y = y + 'px';
                 };

                 function mouseup(event) {
                     $document.unbind('mousemove', mousemove);
                     $document.unbind('mouseup', mouseup);
                     Socket.emit('broadcastMove', scope.stakeholder);
                 }
                 function mouseupPostIt() {
                     $document.unbind('mousemove', mousemovePostIt);
                     $document.unbind('mouseup', mouseupPostIt);
                     Socket.emit('broadcastOnion3LayerMove', scope.postit);
                 }

              }



        };

    });
