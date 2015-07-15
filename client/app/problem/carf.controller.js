/**
 * Created by JOSEVALDERLEI on 14/07/2015.
 */
(function(){
    "use strict";

    angular.module('app')
        .controller("carfController",carfController);

    function carfController(){
        var vm = this;
        vm.valueList = [];
        vm.selectedpms = "";
        vm.selectedValueList = [];

        vm.selectPMSValue = function(pms){
            if(pms != undefined) {
                angular.forEach(vm.carfPMSValue, function (pms_value) {
                    if (pms_value.pms == pms) {
                        console.log("Zerando.................................................")
                        vm.selectedValueList = [];
                        vm.valueList = pms_value.values;
                        return;
                    }
                });
            }
        }

        vm.addListValue = function(newvalue){
            if(vm.selectedValueList.length == 0){
                vm.selectedValueList.push(newvalue);
            }else{
                for(var i=0; i < vm.selectedValueList.length; i++){
                    if(newvalue == vm.selectedValueList[i]){
                        console.log(newvalue + "    "   + vm.selectedValueList[i]);
                        vm.selectedValueList.splice(i,1);
                        return;
                    }
                }
                vm.selectedValueList.push(newvalue);
            }
        };

        vm.carfPMSValue = [
                {
                    "pms": "Interaction",
                    "values": [
                        "Identity",
                        "Norms"
                    ]
                },
                {
                    "pms": "Association",
                    "values": [
                        "Conversation",
                        "Groups",
                        "Relationship",
                        "Trust"
                    ]
                },
                {
                    "pms": "Learning",
                    "values": [
                        "Meta-communication"
                    ]
                },
                {
                    "pms": "Play",
                    "values": [
                        "Aesthetics",
                        "Emotion and Affection"
                    ]
                },
                {
                    "pms": "Protection",
                    "values": [
                        "Informed consert",
                        "Reputation",
                        "Security"
                    ]
                },
                {
                    "pms": "Exploitation",
                    "values": [
                        "Accessibility",
                        "Object",
                        "Property (ownership)",
                        "Usability"
                    ]
                },
                {
                    "pms": "Teporality",
                    "values": [
                        "Availability",
                        "Awareness",
                        "Presence"
                    ]
                },
                {
                    "pms": "Territoriality",
                    "values": [
                        "Portability",
                        "Privacy",
                        "Scalability",
                        "Visibility"
                    ]
                },
                {
                    "pms": "Classification",
                    "values": [
                        "Autonomy",
                        "Collaboration",
                        "Sharing",
                        "Adaptability"
                    ]
                },
                {
                    "pms": "Subsistence",
                    "values": [
                        "Reciprocity"
                    ]
                }
            ]



    }
})();