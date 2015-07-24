/**
 * Created by JOSEVALDERLEI on 14/07/2015.
 */
(function(){

    "use strict";

    angular.module('app')
        .controller("carfController",carfController);

    function carfController($window,Socket,problemService,toastApp){

        var self = this;
        self.idProblem = "";
        self.inProcessing = true;
        self.valueList = [];
        self.stakeholderList = [];
        self.localStakeholders = [];
        self.addpmsvalue = addpmsvalue;
        self.removeCARF = removeCARF;
        self.selectPMSValue = selectPMSValue;
        self.setPriotity = setPriotity;
        self.addListValue = addListValue;
        self.addStakeholder = addStakeholder;
        self.carf = {
            pms: "",
            values: [],
            priority: "",
            requirement: "",
            stakeholders: []
            };
        self.initCarf = initCarf;
        self.carfList = [];
        self.carfPriorityList = [];

        function initCarf(){
            self.idProblem = $window.localStorage.getItem('problemid');
            problemService.getcarf(self.idProblem)
                .success(function(data) {
                    if(data.success) {
                        self.localStakeholders = data.stakeholders;
                        self.stakeholderList = self.localStakeholders;
                        self.carfList = data.carf;
                        self.carfPriorityList = self.localPriorityList;
                    }
                });
            self.inProcessing = false;
        }

        function resetCarf(){
            self.carf = {
                _id: "",
                pms: "",
                values: [],
                priority: "",
                requirement: "",
                stakeholders: []
            };
            self.valueList = [];

        }

        Socket.on('onBroadcastCARFadd', function (carf) {
            self.carfList.push(carf);
            resetCarf();
            self.stakeholderList = self.localStakeholders;
            self.carfPriorityList = self.localPriorityList;
        });

        function addpmsvalue(carf){

            if(carf.pms === ""){
                toastApp.errorMessage("Select PMS");
            }else{
                if(carf.values.length < 1 ){
                    toastApp.errorMessage("Select one or more Value");
                }else{
                    if(carf.stakeholders.length < 1){
                        toastApp.errorMessage("Select one or more Stakeholder(s)");
                    }else{
                        if(carf.priority === ""){
                            toastApp.errorMessage("Select priority [Low, Medium or High]");
                        }else{
                            Socket.emit('broadcastCARFadd', carf);
                            self.stakeholderList = [];
                            self.carfPriorityList = [];
                        }
                    }
                }
            }

        }

        Socket.on('onBroadcastCARFremove', function (id) {
            self.carfList.splice(id,1);
        });

        function removeCARF(index,carf){
            var obj = {
                index: index,
                carf: carf
            };
            Socket.emit('broadcastCARFremove', obj);
        }


        function selectPMSValue(pms){
            if(pms !== undefined) {
                angular.forEach(self.carfPMSValue, function (pms_value) {
                    if (pms_value.pms == pms) {
                        self.carf.values = [];
                        self.valueList = pms_value.values;
                        return;
                    }
                });
            }
        }

        function setPriotity(priority){
            self.carf.priority = priority;
        }

        function addListValue(newvalue){
           if(self.carf.values.length === 0){
                self.carf.values.push(newvalue);
            }else {
               for (var i = 0; i < self.carf.values.length; i++) {
                   if (newvalue == self.carf.values[i]) {
                       self.carf.values.splice(i, 1);
                       return;
                   }
               }
               self.carf.values.push(newvalue);
           }
        }

        function addStakeholder(newStakeholder){
            if(self.carf.stakeholders.length === 0){
                self.carf.stakeholders.push(newStakeholder);
            }else{
                for(var i=0; i < self.carf.stakeholders.length; i++){
                    if(newStakeholder == self.carf.stakeholders[i]){
                        self.carf.stakeholders.splice(i,1);
                        return;
                    }
                }
                self.carf.stakeholders.push(newStakeholder);
            }
        }

        self.localPriorityList = ['Low', 'Medium','High'];

        self.carfPMSValue = [
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
            ];
    }

})();