/**
 * Created by JOSEVALDERLEI on 14/07/2015.
 */
(function(){
    "use strict";

    angular.module('app')
        .controller("carfController",carfController);

    function carfController($window,Socket,problemService){
        var vm = this;
        vm.idProblem = "",
        vm.valueList = [];
        vm.stakeholderList = [];
        vm.carf = {
                     pms: "",
                     values: [],
                    requirement: "Teste",
                    stakeholders: []

            };
        vm.initCarf = initCarf;
        vm.carfList = [];

        function initCarf(){
            vm.idProblem = $window.localStorage.getItem('problemid');
            problemService.getcarf(vm.idProblem)
                .success(function(data) {
                    if(data.success) {
                        vm.stakeholderList = data.stakeholders;
                        vm.carfList = data.carf;
                    }
                })
        };

        function resetCarf(){
            var tmpList = vm.stakeholderList;
            vm.stakeholderList = [];
            vm.carf = {
                _id: "",
                pms: "",
                values: [],
                requirement: "",
                stakeholders: []
            };
            vm.stakeholderList = tmpList;
            vm.valueList = [];
        }



        Socket.on('onBroadcastCARFadd', function (carf) {
            vm.carfList.push(carf);
            resetCarf();
        });

        vm.addpmsvalue = function(carf){
            Socket.emit('broadcastCARFadd', carf);
        };

        Socket.on('onBroadcastCARFremove', function (id) {
            vm.carfList.splice(id,1);
        });

        vm.removeCARF = function(index,carf){
            var obj = {
                index: index,
                carf: carf
            }
            Socket.emit('broadcastCARFremove', obj);
        }


        vm.selectPMSValue = function(pms){
            if(pms != undefined) {
                angular.forEach(vm.carfPMSValue, function (pms_value) {
                    if (pms_value.pms == pms) {
                        vm.carf.values = [];
                        vm.valueList = pms_value.values;
                        return;
                    }
                });
            }
        }

        vm.addListValue = function(newvalue){
            if(vm.carf.values.length == 0){
                vm.carf.values.push(newvalue);
            }else{
                for(var i=0; i < vm.carf.values.length; i++){
                    if(newvalue == vm.carf.values[i]){
                        vm.carf.values.splice(i,1);
                        return;
                    }
                }
                vm.carf.values.push(newvalue);
            }
        };

        vm.addStakeholder = function(newStakeholder){
            if(vm.carf.stakeholders.length == 0){
                vm.carf.stakeholders.push(newStakeholder);
            }else{
                for(var i=0; i < vm.carf.stakeholders.length; i++){
                    if(newStakeholder == vm.carf.stakeholders[i]){
                        vm.carf.stakeholders.splice(i,1);
                        return;
                    }
                }
                vm.carf.stakeholders.push(newStakeholder);
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