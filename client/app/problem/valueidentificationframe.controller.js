/**
 * Created by JOSEVALDERLEI on 22/07/2015.
 */
(function(){

    "use strict";
angular
    .module('app')
    .controller('valueIdentificationFrameController', valueIdentificationFrameController);

function valueIdentificationFrameController($filter,$window,problemService,toastApp,Socket){

    var self = this;
    self.inProcessing = true;
    self.idProblem = "";
    self.useremail = "";
    self.newvalues = "";
    self.initValueIdentificationFrame = initValueIdentificationFrame;
    self.removeValueIdentication = removeValueIdentication;
    self.setValueIdentication = setValueIdentication;
    self.sugestionValues = "";
    self.selectStakeholderValue = selectStakeholderValue;
    self.showSuggestion = showSuggestion;
    self.isShowSuggestion = false;
    self.labelShowSuggestion = $filter('translate')('SHOW_SUGGESTION');
    self.arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0ICAgQzEuODA3LDcyLjk5OCwwLDc3LjI3OSwwLDgyLjIyOGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2wxMjcuOTA3LDEyNy45MDdjMy42MjEsMy42MTcsNy45MDIsNS40MjgsMTIuODUsNS40MjggICBzOS4yMzMtMS44MTEsMTIuODQ3LTUuNDI4TDI4Ni45MzUsOTUuMDc0YzMuNjEzLTMuNjE3LDUuNDI3LTcuODk4LDUuNDI3LTEyLjg0N0MyOTIuMzYyLDc3LjI3OSwyOTAuNTQ4LDcyLjk5OCwyODYuOTM1LDY5LjM3N3oiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";


    function showSuggestion(stakeholder) {
        stakeholder.openEdit = !stakeholder.openEdit;
        if(stakeholder.openEdit){
            self.labelShowSuggestion = $filter('translate')('HIDE_SUGGESTION');
            self.arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Ni45MzUsMTk3LjI4N0wxNTkuMDI4LDY5LjM4MWMtMy42MTMtMy42MTctNy44OTUtNS40MjQtMTIuODQ3LTUuNDI0cy05LjIzMywxLjgwNy0xMi44NSw1LjQyNEw1LjQyNCwxOTcuMjg3ICAgQzEuODA3LDIwMC45MDQsMCwyMDUuMTg2LDAsMjEwLjEzNHMxLjgwNyw5LjIzMyw1LjQyNCwxMi44NDdjMy42MjEsMy42MTcsNy45MDIsNS40MjUsMTIuODUsNS40MjVoMjU1LjgxMyAgIGM0Ljk0OSwwLDkuMjMzLTEuODA4LDEyLjg0OC01LjQyNWMzLjYxMy0zLjYxMyw1LjQyNy03Ljg5OCw1LjQyNy0xMi44NDdTMjkwLjU0OCwyMDAuOTA0LDI4Ni45MzUsMTk3LjI4N3oiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
        }else{
            self.labelShowSuggestion = $filter('translate')('SHOW_SUGGESTION');
            self.arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0ICAgQzEuODA3LDcyLjk5OCwwLDc3LjI3OSwwLDgyLjIyOGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2wxMjcuOTA3LDEyNy45MDdjMy42MjEsMy42MTcsNy45MDIsNS40MjgsMTIuODUsNS40MjggICBzOS4yMzMtMS44MTEsMTIuODQ3LTUuNDI4TDI4Ni45MzUsOTUuMDc0YzMuNjEzLTMuNjE3LDUuNDI3LTcuODk4LDUuNDI3LTEyLjg0N0MyOTIuMzYyLDc3LjI3OSwyOTAuNTQ4LDcyLjk5OCwyODYuOTM1LDY5LjM3N3oiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
        }

    }

    function selectStakeholderValue(i,stakeholder,newValue) {
        stakeholder.sugestionValues.splice(i,1);
        stakeholder.newValues = newValue;
        setValueIdentication(stakeholder);
    }

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
            onionlayer: "Contribution",
            stakeholders: []
        },
        {
            onionlayer: "Operation",
            stakeholders: []
        }
    ];

    var sugestionValuesEN = [
        'Accessibility', 'Adaptability', 'Aesthetics', 'Autonomy', 'Availability', 'Awareness', 'Collaboration', 'Conversation', 'Emotion and Affection', 'Groups', 'Identity', 'Informed consent', 'Meta-communication', 'Norms', 'Object', 'Portability', 'Presence', 'Privacy', 'Property (ownership)', 'Reciprocity', 'Relationship', 'Reputation', 'Scalability', 'Security', 'Sharing', 'Trust', 'Usability', 'Visibility'
    ];
    var sugestionValuesPT = [
        'Acessibilidade','Adaptabilidade','Estética','Autonomia', 'Disponibilidade', 'Consciência', 'Colaboração',
        'Conversação', 'Emoção e Afeto', 'Grupos', 'Identidade', 'Consentimento informado', 'Meta-comunicação', 'Normas',
        'Objeto', 'Portabilidade', 'Presença', 'Privacidade', 'Propriedade', 'Reciprocidade, Relacionamento, Reputação',
        'Escalabilidade', 'Segurança', 'Compartilhamento', 'Confiança', 'Usabilidade', 'Visibilidade'];


    var solveList = function(valuesList){
        var sugestionList = self.sugestionValuesArray.slice();
        for (var i=0; i < valuesList.length; i++){
            for (var k=0; k < sugestionList.length; k++) {
                if(valuesList[i] === sugestionList[k]){
                    sugestionList.splice(k,1);
                }
            }
        }

        return sugestionList;
    };
    
    function initValueIdentificationFrame(){
        self.idproblem = $window.localStorage.getItem('problemid');
        if($window.localStorage.getItem('NG_TRANSLATE_LANG_KEY') === 'pt'){
            self.sugestionValuesArray = sugestionValuesPT;
        }else{
            self.sugestionValuesArray = sugestionValuesEN;
        }

        problemService.getonion(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    if(data.stakeholders.length > 0){
                            for(var i = 0; i < data.stakeholders.length; i++){
                                if(data.stakeholders[i].values === null){
                                    data.stakeholders[i].values = [];
                                }
                                var stakeholder = {
                                    _id : data.stakeholders[i]._id,
                                    onionlayer : data.stakeholders[i].onionlayer,
                                    values : data.stakeholders[i].values,
                                    name : data.stakeholders[i].name,
                                    description : data.stakeholders[i].description,
                                    x : data.stakeholders[i].x,
                                    y : data.stakeholders[i].y,
                                    newValues : [],
                                    openEdit: false,
                                    sugestionValues: solveList(data.stakeholders[i].values)
                                };

                                for(var j = 0; j < self.stakeholderList.length; j++){
                                     if(data.stakeholders[i].onionlayer === self.stakeholderList[j].onionlayer){
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
        angular.forEach(self.stakeholderList, function (stakeholder) {
            if (stakeholder._id == data._id){
                stakeholder.stakeholder = data.stakeholder;
                stakeholder.name = data.name;
                stakeholder.description = data.description;
                stakeholder.x = data.x;
                stakeholder.y = data.y;
                stakeholder.newValues = [];
            }
        });
    });
    
    function removeValueIdentication(value,stakeholder){
        var newList = [];
        for(var i = 0; i < stakeholder.values.length; i++){
            if(stakeholder.values[i] != value){
                newList.push(stakeholder.values[i]);
            }
        }
        stakeholder.sugestionValues.push(value);
        stakeholder.values = newList;
        Socket.emit('broadcastOnionSave', stakeholder);
    }


    function setValueIdentication(stakeholder) {
        if((stakeholder.newValues.length === 0) || (stakeholder.newValues === "") || (stakeholder.newValues === undefined)){
            document.getElementById("id"+stakeholder._id).focus();
            toastApp.errorMessage('Valor não especificado.');
            return;
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
            for (var i = 0; i < list.length; i++) {
                if (value === list[i]) {
                    return true;
                }
            }
        return false;
    }
}

})();
