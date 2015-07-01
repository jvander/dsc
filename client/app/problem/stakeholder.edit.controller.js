/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(){
    var vm = this;

    vm.stakeholderList = [];

    vm.stakeholder = {
        "id": "0",
        "name": "New",
        "description": "",
        "openEdit" : false,
        "positionX": 10,
        "positionY": 10
    };


    vm.addStakeholder = function(stakeholder) {
        stakeholder.openEdit = false;
           vm.stakeholderList.push(
            {
                "id": vm.stakeholderList.length,
                "name": stakeholder.name,
                "description": stakeholder.description,
                "openEdit": false,
                "positionX": stakeholder.positionX,
                "positionY": stakeholder.positionY
            }
        );
    }
    vm.setOpenEdit = function(currentStakeholder){
        currentStakeholder.openEdit = true;
    };

}