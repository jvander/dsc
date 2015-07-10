/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */
'use strict';

angular.module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(){
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

    vm.addStakeholder = function(stakeholder) {
        stakeholder.openEdit = false;
    };

    vm.removeStakeholder = function (id) {
        var oldList = vm.stakeholderList,
            newList = [];
        angular.forEach(oldList, function (stakeholder) {
            if (stakeholder.id !== id) newList.push(stakeholder);
        });
        vm.stakeholderList = newList;
    };

    vm.setOpenEdit = function(currentStakeholder){
        currentStakeholder.openEdit = true;
        /*var id = currentStakeholder.id;
        if ( id == 0) {
            currentStakeholder.openEdit = true;
        } else {
            angular.forEach(vm.stakeholderList, function (stakeholder) {
                if (stakeholder.id == id) stakeholder.openEdit = true;
            });
        }*/

    };

    vm.delPostIt = function(id) {
        var stakeholder = document.getElementById('stakeholder'+vm.stakeholderList[id].id);
        stakeholder.style.display = 'none';
        vm.stakeholderList.splice(id,1);
    };

    vm.addPostIt = function(e,camada) {
        var id = vm.stakeholderList.length + 1;
        vm.stakeholderList.push(
            {
                "id":id,
                "onionlayer": camada,
                "name": "",
                "description": "",
                "openEdit": true,
                "x": e.pageX + 'px',
                "y": e.pageY + 'px'
            }
        )
    };


    vm.acende = function(evt) {
        evt.target.setAttribute("opacity", "0.7");
    }
    vm.apaga = function(evt) {
        evt.target.setAttribute("opacity", "1.0");
    }

}