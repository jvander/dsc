/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */
'use strict';

angular.module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(Socket,$scope,$window,problemService){
    var vm = this;
    vm.idproblem = "";
    vm.stakeholderList = [];
    vm.stakeholder = "";
    vm.intitOnion = intitOnion;
    vm.move = false;
    vm.inProcessing = true;

    function intitOnion(){
        vm.idproblem = $window.localStorage.getItem('problemid');
        problemService.getonion(vm.idproblem)
            .success(function(data) {
                if(data.success) {
                    vm.stakeholderList = data.stakeholders;
                }else{
                    toastApp.errorMessage(data.message);
                }
            })
        vm.inProcessing = false;
    }

    Socket.on('onBroadcastOnionSave', function (data) {
          angular.forEach(vm.stakeholderList, function (stakeholder) {
            if (stakeholder._id == data._id){
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
        Socket.emit('broadcastOnionSave', stakeholder);
    };

    Socket.on('onBroadcastOnionEdit', function (id) {
        angular.forEach(vm.stakeholderList, function (stakeholder) {
            if (stakeholder._id == id) stakeholder.openEdit = true;
        });

    });

    $scope.setOpenEdit = function(id){
        Socket.emit('broadcastOnionEdit', id);
    };


    Socket.on('onBroadcastOnionRemove', function (id) {
        var stakeholder = document.getElementById("stakeholder" +vm.stakeholderList[id]._id);
        stakeholder.style.display = 'none';
        vm.stakeholderList.splice(id,1);
    });

    $scope.delPostIt = function(index,stakeholder) {
        var obj = {
            index: index,
            stakeholder: stakeholder
        }
        Socket.emit('broadcastOnionRemove', obj);
    };

    Socket.on('onBroadcastOnionAdd', function (retorno) {
        vm.stakeholderList.push(retorno);
    });

    $scope.addPostIt = function(e,camada) {


        var newStakeholder =
        {
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
        evt.target.setAttribute("opacity", "0.8");
    }
    vm.apaga = function(evt) {
        evt.target.setAttribute("opacity", "1.0");
    }

}