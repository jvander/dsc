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
            "id": "0",
            "name": "New",
            "description": "",
            "openEdit" : false,
            "positionX": 10,
            "positionY": 10
        }
    ];

    vm.stakeholder = {
        "id": "0",
        "name": "New",
        "description": "",
        "openEdit" : false,
        "positionX": 10,
        "positionY": 10
    };


    vm.addStakeholder = function(stakeholder) {
            stakeholder.id = vm.stakeholderList.length;
            stakeholder.openEdit = false;

           vm.stakeholderList.push(
            {
                "id": "0",
                "name": "New",
                "description": "",
                "openEdit" : false,
                "positionX": 10,
                "positionY": 10
            }
        );
    }
    vm.setOpenEdit = function(currentStakeholder){
        currentStakeholder.openEdit = true;
    };

}