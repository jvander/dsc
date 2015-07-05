
angular.module('DropDSC',[])
    .directive('draggable', function($document) {

      return {
            restrict: 'A',
            replace: true,
            link: function(scope, element, attr) {
                  element.css({
                      position: 'relative',
                      cursor: 'pointer'
                  });
                  element.on('mousedown', function(event) {
                      // Prevent default dragging of selected content
                      event.preventDefault();
                      $document.on('mousemove', mousemove);
                      $document.on('mouseup', mouseup);
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
                      scope.stakeholder.x = x + 'px';
                      scope.stakeholder.y = y + 'px';
                  }

                  function mouseup() {
                      $document.unbind('mousemove', mousemove);
                      $document.unbind('mouseup', mouseup);
                  }
              }

        };

    });