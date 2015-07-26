/**
 * Created by JOSEVALDERLEI on 22/07/2015.
 */
(function(){

    "use strict";
angular
    .module('app')
    .controller('valueIdentificationFrameController', valueIdentificationFrameController);

function valueIdentificationFrameController($window,problemService,toastApp,Socket){

    var self = this;
    self.inProcessing = true;
    self.idProblem = "";
    self.useremail = "";
    self.newvalues = "";
    self.initValueIdentificationFrame = initValueIdentificationFrame;
    self.setSuggestionShow = setSuggestionShow;
    self.leaveSuggestionShow = leaveSuggestionShow;
    self.removeValueIdentication = removeValueIdentication;
    self.setValueIdentication = setValueIdentication;
    self.sugestionValues = "";
    self.stakeholderList = [
        {
            onionlayer: "Community",
            stakeholders: []
        },
        {
            onionlayer: "Market",
            stakeholders: []
        },
        {
            onionlayer: "Source",
            stakeholders: []
        },
        {
            onionlayer: "Contruibuition",
            stakeholders: []
        },
        {
            onionlayer: "Technico",
            stakeholders: []
        }
    ];
    self.sugestionValuesArray = [
        'Acessibilidade','Adaptabilidade','Estética','Autonomia', 'Disponibilidade', 'Consciência', 'Colaboração',
        'Conversação', 'Emoção e Afeto', 'Grupos', 'Identidade', 'Consentimento informado', 'Meta-comunicação', 'Normas',
        'Objeto', 'Portabilidade', 'Presença', 'Privacidade', 'Propriedade', 'Reciprocidade, Relacionamento, Reputação',
        'Escalabilidade', 'Segurança', 'Compartilhamento', 'Confiança', 'Usabilidade', 'Visibilidade'];

    function initValueIdentificationFrame(){
        self.idproblem = $window.localStorage.getItem('problemid');
        problemService.getonion(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    if(data.stakeholders.length > 0){
                            for(var k = 1; k < self.sugestionValuesArray.length; k++){
                                self.sugestionValues += self.sugestionValuesArray[k] +  ", ";
                            }
                        self.sugestionValues[self.sugestionValuesArray[self.sugestionValuesArray.length-1]] + '.';
                            for(var i = 0; i < data.stakeholders.length; i++){
                                for(var j = 0; j < self.stakeholderList.length; j++){
                                    var stakeholder = {
                                        _id : data.stakeholders[i]._id,
                                        onionlayer : data.stakeholders[i].onionlayer,
                                        values : data.stakeholders[i].values,
                                        name : data.stakeholders[i].name,
                                        description : data.stakeholders[i].description,
                                        openEdit : data.stakeholders[i].openEdit,
                                        x : data.stakeholders[i].x,
                                        y : data.stakeholders[i].y,
                                        newValues : []
                                    };
                                     if(data.stakeholders[i].onionlayer == self.stakeholderList[j].onionlayer){
                                        self.stakeholderList[j].stakeholders.push(stakeholder);
                                        continue;
                                    }
                                }
                        }
                    }
                    self.inProcessing = false;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
    }

    Socket.on('onBroadcastOnionSave', function (data) {
        console.log(data);
        angular.forEach(self.stakeholderList, function (stakeholder) {
            if (stakeholder._id == data._id){
                stakeholder.stakeholder = data.stakeholder;
                stakeholder.name = data.name;
                stakeholder.description = data.description;
                stakeholder.openEdit = data.openEdit;
                stakeholder.x = data.x;
                stakeholder.y = data.y;
                stakeholder.newValues = [];
            }
        });
    });

    function setSuggestionShow(stakeholder){
        stakeholder.openEdit = true;
    }

    function leaveSuggestionShow(stakeholder){
        stakeholder.openEdit = false;
    }

    function removeValueIdentication(value,stakeholder){
        var newList = [];
        for(var i = 0; i < stakeholder.values.length; i++){
            if(stakeholder.values[i] != value){
                newList.push(stakeholder.values[i]);
            }
        }
        stakeholder.values = newList;
        Socket.emit('broadcastOnionSave', stakeholder);
    }

    function setValueIdentication(stakeholder) {
        if((stakeholder.newValues === "") || (stakeholder.newValues === undefined)){
            toastApp.errorMessage('Valor n�o especificado.');
        }else{
            var valuesList = stakeholder.newValues.split(',');
            for(var i=0; i < valuesList.length; i++){
                if(findValue(stakeholder.values, valuesList[i])){
                    toastApp.errorMessage("Duplicate value: " + valuesList[i]);
                }else{
                    stakeholder.values.push(valuesList[i]);
                }
            }
            stakeholder.newValues = "";
            stakeholder.openEdit = false;
            Socket.emit('broadcastOnionSave', stakeholder);
        }

    }

    function findValue(list, value){
        for(var i=0; i < list.length; i++){
            if(value === list[i]){
                return true;
            }
        }
        return false;
    }
}

})();
