

angular.module('DropDSC',[])
    .directive('draggable', function($document,Socket,$window) {
      return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attr) {
                  element.on('mousedown', function(event) {

                      if(event.target.id.substring(0,11) == "stakeholder"){
                          // Prevent default dragging of selected content
                          scope.stakeholder.localcode =  $window.localStorage.getItem('localcode');
                          event.preventDefault();
                          $document.bind('mousemove', mousemove);
                          $document.bind('mouseup', mouseup);
                      }

                  });

                  function mousemove(event) {
                      var id_div = event.target.id;
                      if (id_div == 'svg') {
                          id_div = "";
                      }
                      scope.stakeholder.onionlayer = id_div;

                      y = event.pageY;
                      x = event.pageX;

                      element.css({
                          top: y + 'px',
                          left:  x + 'px'
                      });
                      /*Socket.on('onBroadcastOnionPosition', function (stakeholder) {
                          element.css({
                              top: stakeholder.y,
                              left:  stakeholder.x
                          });
                      });*/
                      scope.stakeholder.x = x + 'px';
                      scope.stakeholder.y = y + 'px';
                      //Socket.emit('broadcastOnionPosition', scope.stakeholder);

                  };

                  function mouseup() {
                      $document.unbind('mousemove', mousemove);
                      $document.unbind('mouseup', mouseup);
                      Socket.emit('broadcastMove', scope.stakeholder);
                  }
              }

        };

    });
