/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

;(function(undefined){

'use strict';

angular
    .module('app')
    .controller('onion3LayerController',onion3LayerController);


function onion3LayerController(Socket,$window,problemService,$mdDialog,toastApp){

    var self = this;
    self.idproblem = "";
    self.initOnion3Layer = initOnion3Layer;
    self.move = false;
    self.onion3LayerList = [];
    self.inProcessing = true;
    self.saveOnion3Layer = saveOnion3Layer;
    self.setOpenEdit = setOpenEdit;
    self.delPostIt = delPostIt;
    self.addPostIt = addPostIt;
    self.acende = acende;
    self.apaga = apaga;
    self.localcode = '';

    function initOnion3Layer(){
        self.idproblem = $window.localStorage.getItem('problemid');
        self.localcode =  $window.localStorage.getItem('localcode');

       /* problemService.getonion(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    self.onionList = data.onion;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });*/

        self.inProcessing = false;
    }

    Socket.on('onBroadcastOnion3LayerSave', function (data) {
            angular.forEach(self.onion3LayerList, function (postit) {
            if (postit._id == data._id){
                postit.title = data.title;
                postit.description = data.description;
                postit.openEdit = data.openEdit;
                postit.x = data.x;
                postit.y = data.y;
                postit.zindex = 9999;
            }
        });

    });

    function saveOnion3Layer(postit) {
        Socket.emit('broadcastOnion3LayerSave', postit);
    }

    Socket.on('onBroadcastOnion3LayerEdit', function (id) {
        angular.forEach(self.onion3LayerList, function (postit) {
            if(postit._id === id) {
                postit.openEdit = true;
                postit.zindex = 9999;
            }
        });

    });

    function setOpenEdit(id){
        Socket.emit('broadcastOnion3LayerEdit', id);
    }

    Socket.on('onBroadcastOnion3LayerRemove', function (id) {
        var postit = document.getElementById("postit" +self.onion3LayerList[id]._id);
        onion3Layer.style.display = 'none';
        self.onion3LayerList.splice(id,1);
    });

    function removePostIt(index,postit) {
        var obj = {
            index: index,
            postit: postit
        };
        Socket.emit('broadcastOnion3LayerRemove', obj);
    }

    function delPostIt(ev,index,postit) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Detete Postit?')
            .content('Title: ' + onion.title)
            .ariaLabel('Remove postit')
            .ok('Yes!')
            .cancel('Cancel')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            removePostIt(index,postit);
        });
    }

    Socket.on('onBroadcastOnion3LayerMove', function (postit) {
            if(self.localcode !== postit.localcode) {
                document.getElementById('postit'+postit._id).style.left = postit.x;
                document.getElementById('postit'+postit._id).style.top = postit.y;
            }

    });

    Socket.on('onBroadcastOnion3LayerAdd', function (retorno) {
        self.onion3LayerList.push(retorno);
    });

    function addPostIt(e,camada) {
        var newStakeholder =
        {
            "onionlayer": camada,
            "title": "",
            "description": "",
            "openEdit": true,
            "x": e.pageX + 'px',
            "y": (e.pageY) + 'px',
            "zindex": 9999
        };

       Socket.emit('broadcastOnion3LayerAdd', newStakeholder);
    }

    function acende(id) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: underline; fill: #8FBC8F;');
        document.getElementById(id).setAttribute('style', 'fill: #8FBC8F;');
        document.getElementById("legend"+id).setAttribute("opacity", "0.7");
        document.getElementById(id).setAttribute("opacity", "0.7");
    }

    function apaga(id,color) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: none;');
        document.getElementById(id).setAttribute('style', 'fill: '+color+';');
        document.getElementById("legend"+id).setAttribute("opacity", "1.0");
        document.getElementById(id).setAttribute("opacity", "1.0");
    }
}

})(this);