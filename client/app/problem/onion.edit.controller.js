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
    self.inProcessing = false;
    self.saveOnion3Layer = saveOnion3Layer;
    self.setOpenEdit = setOpenEdit;
    self.delPostIt = delPostIt;
    self.addPostIt = addPostIt;
    self.acende = acende;
    self.apaga = apaga;
    self.localcode = '';
    self.minimizePostit = minimizePostit;

    function initOnion3Layer(){
        self.inProcessing = true;
        self.idproblem = $window.localStorage.getItem('problemid');
        self.localcode =  $window.localStorage.getItem('localcode');
        problemService.getonion3layer(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    angular.forEach(data.postits, function (postit) {
                        postit.openEdit = false;
                        self.onion3LayerList.push(postit);
                    });
                }else{
                    toastApp.errorMessage(data.message);
                }
            });

        self.inProcessing = false;
    }

    function minimizePostit(postit) {
        postit.openEdit = false;
        postit.zindex = 1;
    }

    Socket.on('onBroadcastOnion3LayerSave', function (data) {
            angular.forEach(self.onion3LayerList, function (postit) {
            if (postit._id == data._id) {
                postit.title = data.title;
                postit.description = data.description;
                postit.openEdit = false;
                postit.layer = data.layer;
                postit.x = data.x;
                postit.y = data.y;
                postit.zindex = 1;
            }
        });

    });

    function saveOnion3Layer(postit) {
        postit.zindex = 1;
        Socket.emit('broadcastOnion3LayerSave', postit);
    }

    Socket.on('onBroadcastOnion3LayerEdit', function (obj) {
        angular.forEach(self.onion3LayerList, function (postit) {
            if(postit._id === obj.id) {
                if(self.localcode === obj.localcode) {
                    postit.zindex = 999;
                }
                postit.openEdit = true;
            }
        });

    });

    function setOpenEdit(id){
        Socket.emit('broadcastOnion3LayerEdit', {
            id: id,
            localcode: self.localcode
        });
    }

    Socket.on('onBroadcastOnion3LayerRemove', function (id) {
        var postit = document.getElementById("postit" + self.onion3LayerList[id]._id);
        postit.style.display = 'none';
        self.onion3LayerList.splice(id,1);
    });

    function removePostIt(index,postit) {
        Socket.emit('broadcastOnion3LayerRemove',
            {
                index: index,
                postit: postit
            }
        );
    }

    function delPostIt(ev,index,postit) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Detete Postit?')
            .content('Title: ' + postit.title)
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

    Socket.on('onBroadcastOnion3LayerAdd', function (data) {
        if(self.localcode !== data.localcode) {
            data.postit.openEdit = false;
        }else{
            data.postit.openEdit = true;
        }
        self.onion3LayerList.push(data.postit);

    });

    function addPostIt(e,camada) {
        console.log(camada);
        Socket.emit('broadcastOnion3LayerAdd', {
            postit: {
                layer: camada,
                title: '',
                description: '',
                x: e.pageX + 'px',
                y: e.pageY + 'px',
                zindex: 1
            },
            localcode: self.localcode
        }
    );
    }

    function acende(id) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: underline;');
        document.getElementById(id).setAttribute('style', 'fill:#D1C4E9;');
        document.getElementById("legend"+id).setAttribute('style', 'fill:#D1C4E9;');
    }

    function apaga(id,color) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: none;');
        document.getElementById(id).setAttribute('style', 'fill: '+color+';');
        document.getElementById("legend"+id).setAttribute('style', 'fill: '+color+';');
    }
}

})(this);