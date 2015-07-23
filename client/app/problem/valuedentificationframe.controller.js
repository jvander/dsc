/**
 * Created by JOSEVALDERLEI on 22/07/2015.
 */

angular.module('app')
    .controller('valueIdentificationFrameController', valueIdentificationFrameController);


function valueIdentificationFrameController($window,problemService,toastApp,Socket){


    var self = this;
    self.inProcessing = true;

    self.idProblem = "";
    self.useremail = "";
    self.newvalues = "";
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

    self.sugestionValues = "";

    self.sugestionValuesArray = [
        'Acessibilidade', 'Adaptabilidade', 'Estética', 'Autonomia', 'Disponibilidade', 'Consciência', 'Colaboração',
        'Conversação', 'Emoção e Afeto', 'Grupos', 'Identidade', 'Consentimento informado', 'Meta-comunicação', 'Normas',
        'Objeto', 'Portabilidade', 'Presença', 'Privacidade', 'Propriedade', 'Reciprocidade, Relacionamento, Reputação,' +
        'Escalabilidade', 'Segurança', 'Compartilhamento', 'Confiança', 'Usabilidade', 'Visibilidade'
    ];


    self.initValueIdentificationFrame = function(){
        self.idproblem = $window.localStorage.getItem('problemid');
        problemService.getonion(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    if(data.stakeholders.length > 0){
                            for(var k = 1; k < self.sugestionValuesArray.length; k++){
                                self.sugestionValues += self.sugestionValuesArray[k] +  ", "
                            }
                        self.sugestionValues[self.sugestionValuesArray[self.sugestionValuesArray.length-1]] + ".";
                            for(var i = 0; i < data.stakeholders.length; i++){
                                for(var j = 0; j < self.stakeholderList.length; j++){
                                    var stakeholder = {
                                        _id : data.stakeholders[i]._id,
                                        onionlayer : data.stakeholders[i].onionlayer,
                                        values : data.stakeholders[i].values,
                                        name : data.stakeholders[i].name,
                                        description : data.stakeholders[i].description,
                                        openEdit : data.stakeholders[i].openEdit,
                                        newValues : []
                                    }
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
            })
    };

    Socket.on('onBroadcastOnionSave', function (data) {
        angular.forEach(self.stakeholderList, function (stakeholder) {
            if (stakeholder._id == data._id){
                stakeholder.onionlayer = data.onionlayer;
                stakeholder.values = data.values;
                stakeholder.name = data.name;
                stakeholder.description = data.description;
                stakeholder.openEdit = data.openEdit;
                stakeholder.newValues = [];
            }
        });
    });

    self.setSuggestionShow = function(stakeholder){
        stakeholder.openEdit = true;
    };

    self.leaveSuggestionShow = function(stakeholder){
        stakeholder.openEdit = false;
    };


    self.removeValueIdentication = function(value,stakeholder){
        var newList = [];
        for(var i = 0; i < stakeholder.values.length; i++){
            if(stakeholder.values[i] != value){
                newList.push(stakeholder.values[i]);
            }
        }
        stakeholder.values = newList;
        Socket.emit('broadcastOnionSave', stakeholder);
    }

    self.setValueIdentication = function(stakeholder) {
        console.log(stakeholder.newValues);

        if((stakeholder.newValues === "") || (stakeholder.newValues === undefined)){
            toastApp.errorMessage("Valor não especificado.");
        }else{
            var valuesList = stakeholder.newValues.split(',');
            for(var i=0; i < valuesList.length; i++){
                stakeholder.values.push(valuesList[i]);
            }
            console.log(stakeholder.values);
            stakeholder.newValues = "";
            stakeholder.openEdit = false;
            Socket.emit('broadcastOnionSave', stakeholder);
        }

    };



}
