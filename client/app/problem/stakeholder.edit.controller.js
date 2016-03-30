/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

;(function(undefined){

'use strict';

angular
    .module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(Socket,$window,problemService,$mdDialog,toastApp){

    var self = this;
    self.idproblem = "";
    self.stakeholderList = [];
    self.stakeholder = "";
    self.intitOnion = intitOnion;
    self.move = false;
    self.inProcessing = true;
    self.saveStakeholder = saveStakeholder;
    self.setOpenEdit = setOpenEdit;
    self.delPostIt = delPostIt;
    self.addPostIt = addPostIt;
    self.acende = acende;
    self.apaga = apaga;
    self.localcode = '';

    function intitOnion(){
        self.idproblem = $window.localStorage.getItem('problemid');
        self.localcode =  $window.localStorage.getItem('localcode');
        problemService.getonion(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    self.stakeholderList = data.stakeholders;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
        self.inProcessing = false;
    }

    Socket.on('onBroadcastOnionSave', function (data) {
            angular.forEach(self.stakeholderList, function (stakeholder) {
            if (stakeholder._id == data._id){
                stakeholder.stakeholder = data.stakeholder;
                stakeholder.name = data.name;
                stakeholder.description = data.description;
                stakeholder.openEdit = data.openEdit;
                stakeholder.x = data.x;
                stakeholder.y = data.y;
                stakeholder.zindex = 9999;
            }
        });

    });

    function saveStakeholder(stakeholder) {
        Socket.emit('broadcastOnionSave', stakeholder);
    }

    Socket.on('onBroadcastOnionEdit', function (id) {
        angular.forEach(self.stakeholderList, function (stakeholder) {
            if(stakeholder._id === id) {
                stakeholder.openEdit = true;
                stakeholder.zindex = 9999;
            }
        });

    });

    function setOpenEdit(id){
        Socket.emit('broadcastOnionEdit', id);
    }

    Socket.on('onBroadcastOnionRemove', function (id) {
        var stakeholder = document.getElementById("stakeholder" +self.stakeholderList[id]._id);
        stakeholder.style.display = 'none';
        self.stakeholderList.splice(id,1);
    });

    function removePostIt(index,stakeholder) {

        var obj = {
            index: index,
            stakeholder: stakeholder
        };
        Socket.emit('broadcastOnionRemove', obj);
    }

    function delPostIt(ev,index,stakeholder) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title('Detete Stakeholder?')
            .content('Title: ' + stakeholder.name)
            .ariaLabel('Remove Stakeholder')
            .ok('Yes!')
            .cancel('Cancel')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            removePostIt(index,stakeholder);
        });
    }

    Socket.on('onBroadcastMove', function (stakeholder) {
            console.log(stakeholder.localcode + '  ' + self.localcode)
            if(self.localcode !== stakeholder.localcode) {
                document.getElementById('stakeholder'+stakeholder._id).style.left = stakeholder.x;
                document.getElementById('stakeholder'+stakeholder._id).style.top = stakeholder.y;
            }

    });

    Socket.on('onBroadcastOnionAdd', function (retorno) {
        self.stakeholderList.push(retorno);
    });

    function addPostIt(e,camada) {

        var newStakeholder =
        {
            "onionlayer": camada,
            "name": "",
            "description": "",
            "openEdit": true,
            "x": e.pageX + 'px',
            "y": (e.pageY) + 'px'
        };

       Socket.emit('broadcastOnionAdd', newStakeholder);
    }

    function acende(id) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: underline;');
        document.getElementById("legend"+id).setAttribute("opacity", "0.7");
        document.getElementById(id).setAttribute("opacity", "0.7");
    }

    function apaga(id) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: none;');
        document.getElementById("legend"+id).setAttribute("opacity", "1.0");
        document.getElementById(id).setAttribute("opacity", "1.0");
    }
}

})(this);