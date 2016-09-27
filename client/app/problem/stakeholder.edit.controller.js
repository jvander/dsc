/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

;(function(undefined){

'use strict';

angular
    .module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(Socket,$filter,$window,problemService,$mdDialog,toastApp){

    var self = this;
    self.idproblem = "";
    self.stakeholderList = [];
    self.stakeholder = "";
    self.intitOnion = intitOnion;
    self.move = false;
    self.inProcessing = true;
    self.saveStakeholder = saveStakeholder;
    self.setOpenEdit = setOpenEdit;
    self.delPostIt = delPostIt;
    self.addPostIt = addPostIt;
    self.acende = acende;
    self.apaga = apaga;
    self.minimizeStakeholder = minimizeStakeholder;
    self.localcode = '';
    self.showSuggestion = showSuggestion;
    self.isShowSuggestion = false;
    self.labelShowSuggestion = $filter('translate')('SHOW_SUGGESTION');
    self.arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0ICAgQzEuODA3LDcyLjk5OCwwLDc3LjI3OSwwLDgyLjIyOGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2wxMjcuOTA3LDEyNy45MDdjMy42MjEsMy42MTcsNy45MDIsNS40MjgsMTIuODUsNS40MjggICBzOS4yMzMtMS44MTEsMTIuODQ3LTUuNDI4TDI4Ni45MzUsOTUuMDc0YzMuNjEzLTMuNjE3LDUuNDI3LTcuODk4LDUuNDI3LTEyLjg0N0MyOTIuMzYyLDc3LjI3OSwyOTAuNTQ4LDcyLjk5OCwyODYuOTM1LDY5LjM3N3oiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";

    function showSuggestion() {
        self.isShowSuggestion = !self.isShowSuggestion;
        if(self.isShowSuggestion){
            self.labelShowSuggestion = $filter('translate')('HIDE_SUGGESTION');
            self.arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Ni45MzUsMTk3LjI4N0wxNTkuMDI4LDY5LjM4MWMtMy42MTMtMy42MTctNy44OTUtNS40MjQtMTIuODQ3LTUuNDI0cy05LjIzMywxLjgwNy0xMi44NSw1LjQyNEw1LjQyNCwxOTcuMjg3ICAgQzEuODA3LDIwMC45MDQsMCwyMDUuMTg2LDAsMjEwLjEzNHMxLjgwNyw5LjIzMyw1LjQyNCwxMi44NDdjMy42MjEsMy42MTcsNy45MDIsNS40MjUsMTIuODUsNS40MjVoMjU1LjgxMyAgIGM0Ljk0OSwwLDkuMjMzLTEuODA4LDEyLjg0OC01LjQyNWMzLjYxMy0zLjYxMyw1LjQyNy03Ljg5OCw1LjQyNy0xMi44NDdTMjkwLjU0OCwyMDAuOTA0LDI4Ni45MzUsMTk3LjI4N3oiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
        }else{
            self.labelShowSuggestion = $filter('translate')('SHOW_SUGGESTION');
            self.arrow = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI5Mi4zNjIgMjkyLjM2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjkyLjM2MiAyOTIuMzYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTI4Ni45MzUsNjkuMzc3Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRIMTguMjc0Yy00Ljk1MiwwLTkuMjMzLDEuODA3LTEyLjg1LDUuNDI0ICAgQzEuODA3LDcyLjk5OCwwLDc3LjI3OSwwLDgyLjIyOGMwLDQuOTQ4LDEuODA3LDkuMjI5LDUuNDI0LDEyLjg0N2wxMjcuOTA3LDEyNy45MDdjMy42MjEsMy42MTcsNy45MDIsNS40MjgsMTIuODUsNS40MjggICBzOS4yMzMtMS44MTEsMTIuODQ3LTUuNDI4TDI4Ni45MzUsOTUuMDc0YzMuNjEzLTMuNjE3LDUuNDI3LTcuODk4LDUuNDI3LTEyLjg0N0MyOTIuMzYyLDc3LjI3OSwyOTAuNTQ4LDcyLjk5OCwyODYuOTM1LDY5LjM3N3oiIGZpbGw9IiMwMDZERjAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K";
        }
    }

    
    function intitOnion(){
        self.idproblem = $window.localStorage.getItem('problemid');
        self.localcode =  $window.localStorage.getItem('localcode');
        problemService.getonion(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    for(var i = 0; i < data.stakeholders.length; i++) {
                        if (data.stakeholders[i].values === null) {
                            data.stakeholders[i].values = [];
                        }
                        var stakeholder = {
                            _id: data.stakeholders[i]._id,
                            onionlayer: data.stakeholders[i].onionlayer,
                            values: data.stakeholders[i].values,
                            name: data.stakeholders[i].name,
                            description: data.stakeholders[i].description,
                            x: data.stakeholders[i].x,
                            y: data.stakeholders[i].y,
                            newValues: [],
                            /*sugestionValues: solveList(data.stakeholders[i].values)*/
                        };
                        self.stakeholderList.push(stakeholder);
                    }
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
        self.inProcessing = false;
    }

    Socket.on('onBroadcastOnionSave', function (data) {
            angular.forEach(self.stakeholderList, function (stakeholder) {
            if (stakeholder._id == data._id){
                stakeholder.stakeholder = data.stakeholder;
                stakeholder.name = data.name;
                stakeholder.description = data.description;
                stakeholder.values = data.values;
                stakeholder.sugestionValues = data.values;
                stakeholder.openEdit = data.openEdit;
                stakeholder.x = data.x;
                stakeholder.y = data.y;
                stakeholder.zindex = 1;
            }
        });

    });

    function saveStakeholder(stakeholder) {
        Socket.emit('broadcastOnionSave', stakeholder);
    }

    function minimizeStakeholder(stakeholder) {
        stakeholder.openEdit = false;
    }

    Socket.on('onBroadcastOnionEdit', function (id) {
        angular.forEach(self.stakeholderList, function (stakeholder) {
            if(stakeholder._id === id) {
                stakeholder.openEdit = true;
                stakeholder.zindex = 9;
            }
        });

    });

    function setOpenEdit(id){
        angular.forEach(self.stakeholderList, function (stakeholder) {
            if(stakeholder._id === id) {
                stakeholder.openEdit = true;
                stakeholder.zindex = 9999;
            }
        });
        Socket.emit('broadcastOnionEdit', id);
    }

    Socket.on('onBroadcastOnionRemove', function (id) {
        var stakeholder = document.getElementById("stakeholder" +self.stakeholderList[id]._id);
        stakeholder.style.display = 'none';
        self.stakeholderList.splice(id,1);
    });


    function removePostIt(index,stakeholder) {
        var obj = {
            index: index,
            stakeholder: stakeholder
        };
        Socket.emit('broadcastOnionRemove', obj);
    }

    function delPostIt(ev,index,stakeholder) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title($filter('translate')('BTN_REMOVE') + ' ' + $filter('translate')('STAKEHOLDER') + '?')
            .content('Title: ' + stakeholder.name)
            .ariaLabel('Remove Stakeholder')
            .ok($filter('translate')('LABEL_YES'))
            .cancel($filter('translate')('LABEL_BTN_CANCEL'))
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            removePostIt(index,stakeholder);
        });
    }

    Socket.on('onBroadcastMove', function (stakeholder) {
            if(self.localcode !== stakeholder.localcode) {
                document.getElementById('stakeholder'+stakeholder._id).style.left = stakeholder.x;
                document.getElementById('stakeholder'+stakeholder._id).style.top = stakeholder.y;
            }

    });

    Socket.on('onBroadcastOnionAdd', function (data) {
        if(self.localcode !== data.localcode) {
            data.stakeholder.openEdit = false;
            data.stakeholder.name = 'New';
        }else{
            data.stakeholder.openEdit = true;
        }
        self.stakeholderList.push(data.stakeholder);
    });

    function addPostIt(e,camada) {
       Socket.emit('broadcastOnionAdd', {
               stakeholder: {
                   "onionlayer": camada,
                   "name": "",
                   "description": "",
                   "openEdit": true,
                   "newValues":"",
                   "values": [],
                   "x": e.pageX + 'px',
                   "y": e.pageY + 'px',
                   "zindex": 9
               },
               "localcode": self.localcode
           }

       );
    }

    function acende(id) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: underline;');
        document.getElementById(id).setAttribute('style', 'fill:#D1C4E9;');
        document.getElementById("legend"+id).setAttribute('style', 'fill:#D1C4E9;');
    }

    function apaga(id,color) {
        document.getElementById("name"+id).setAttribute('style', 'text-decoration: none;');
        document.getElementById(id).setAttribute('style', 'fill: '+color+';');
        document.getElementById("legend"+id).setAttribute('style', 'fill: '+color+';');
    }

    self.newvalues = "";
    self.setSuggestionShow = setSuggestionShow;
    self.leaveSuggestionShow = leaveSuggestionShow;
    self.removeValueIdentication = removeValueIdentication;
    self.setValueIdentication = setValueIdentication;
    self.sugestionValues = "";
    self.selectStakeholderValue = selectStakeholderValue;

    function selectStakeholderValue(i,stakeholder,newValue) {
        console.log(stakeholder);
        stakeholder.sugestionValues.splice(i,1);
        stakeholder.newValues = newValue;
        setValueIdentication(stakeholder);
    }
   /* self.sugestionValuesArray = [
        'Acessibilidade','Adaptabilidade','Estética','Autonomia', 'Disponibilidade', 'Consciência', 'Colaboração',
        'Conversação', 'Emoção e Afeto', 'Grupos', 'Identidade', 'Consentimento informado', 'Meta-comunicação', 'Normas',
        'Objeto', 'Portabilidade', 'Presença', 'Privacidade', 'Propriedade', 'Reciprocidade, Relacionamento, Reputação',
        'Escalabilidade', 'Segurança', 'Compartilhamento', 'Confiança', 'Usabilidade', 'Visibilidade'];
*/

   /* var solveList = function(valuesList){
        var sugestionList = self.sugestionValuesArray.slice();
        for (var i=0; i < valuesList.length; i++){
            for (var k=0; k < sugestionList.length; k++) {
                if(valuesList[i] === sugestionList[k]){
                   sugestionList.splice(k,1);
                }
            }
        }

        return sugestionList;
    };*/


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
        stakeholder.sugestionValues.push(value);
    }


    function setValueIdentication(stakeholder) {
        console.log(stakeholder.newValues);
        if((stakeholder.newValues.length < 1) ||(stakeholder.newValues === "") || (stakeholder.newValues === undefined)){
            document.getElementById("id"+stakeholder._id).focus();
            toastApp.errorMessage('Valor não especificado.');
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

})(this);