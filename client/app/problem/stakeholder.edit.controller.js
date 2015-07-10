/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */
'use strict';

angular.module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(Socket,$scope){
    var vm = this;
    vm.stakeholderList = [
        {
            "id":1,
            "onionlayer": "community",
            "name": "Aluno",
            "description": "bla blabla",
            "openEdit": false,
            "x": "662px",
            "y": "255px"
        },
        {
            "id":2,
            "onionlayer": "market",
            "name": "Professor",
            "description": "bla blabla",
            "openEdit": false,
            "x": "317px",
            "y": "456px"
        }
    ];

    vm.stakeholder = {
        "id": "0",
        "onionlayer": "",
        "name": "",
        "description": "",
        "openEdit" : false,
        "x": 0,
        "y": 0
    };

    Socket.on('onBroadcastOnionSave', function (data) {
        console.log("Valor do id recebido..." + data);

        var id = data.id;
        angular.forEach(vm.stakeholderList, function (stakeholder) {
            if (stakeholder.id == id){
                stakeholder.stakeholder = data.stakeholder;
                    stakeholder.name = data.name;
                    stakeholder.description = data.description;
                        stakeholder.openEdit = data.dadaopenEdit
                stakeholder.x = data.x;
                stakeholder.y = data.y;
            }
        });

    });


    $scope.saveStakeholder = function(stakeholder) {
        stakeholder.openEdit = true;
        Socket.emit('broadcastOnionSave', stakeholder);
    };

    vm.removeStakeholder = function (id) {
        var oldList = vm.stakeholderList,
            newList = [];
        angular.forEach(oldList, function (stakeholder) {
            if (stakeholder.id !== id) newList.push(stakeholder);
        });
        vm.stakeholderList = newList;
    };


    Socket.on('onBroadcastOnionEdit', function (id) {
        angular.forEach(vm.stakeholderList, function (stakeholder) {
            if (stakeholder.id == id) stakeholder.openEdit = true;
        });

    });

    $scope.setOpenEdit = function(id){
        Socket.emit('broadcastOnionEdit', id);
    };


    Socket.on('onBroadcastOnionRemove', function (id) {
        var stakeholder = document.getElementById('stakeholder'+vm.stakeholderList[id].id);
        stakeholder.style.display = 'none';
        vm.stakeholderList.splice(id,1);
    });

    $scope.delPostIt = function(id) {
        Socket.emit('broadcastOnionRemove', id);
    };

    Socket.on('onBroadcastOnionAdd', function (retorno) {
        vm.stakeholderList.push(retorno);
    });

    $scope.addPostIt = function(e,camada) {
        var id = vm.stakeholderList.length + 1;
        var newStakeholder =
        {
            "id":id,
            "onionlayer": camada,
            "name": "",
            "description": "",
            "openEdit": true,
            "x": e.pageX + 'px',
            "y": e.pageY + 'px'
        }
        Socket.emit('broadcastOnionAdd', newStakeholder);
    };

    vm.acende = function(evt) {
        evt.target.setAttribute("opacity", "0.7");
    }
    vm.apaga = function(evt) {
        evt.target.setAttribute("opacity", "1.0");
    }

}