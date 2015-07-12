/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('stakeholderController',stakeholderController);


function stakeholderController(){
    var vm = this;
    vm.stakeholderList = [];
    vm.stakeholder = [];



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
        var id = currentStakeholder.id;
        if ( id == 0) {
            currentStakeholder.openEdit = true;
        } else {
            angular.forEach(vm.stakeholderList, function (stakeholder) {
                if (stakeholder.id == id) stakeholder.openEdit = true;
            });
        }
    };

    vm.delPostIt = function(id) {
        var stakeholder = document.getElementById('stakeholder'+vm.stakeholderList[id].id);
        stakeholder.style.display = 'none';
        vm.stakeholderList.splice(id,1);

    };

    vm.addPostIt = function() {
            vm.stakeholderList.push(
                {
                    "id": vm.stakeholderList.length + 1,
                    "onionlayer": "",
                    "name": "",
                    "description": "",
                    "openEdit": true,
                    "positionX": 10,
                    "positionY": 10
                }
            )
    }


    vm.handleDrop = function(item, bin) {
            alert('Item ' + item + ' has been dropped into ' + bin);
            setStakeholderValue(item,bin);
    };


    var setStakeholderValue = function(item, bin){
        var id = item.substring(11,item.length);
        var camada = bin.substring(8,bin.length);

        angular.forEach(vm.stakeholderList, function (stakeholder) {
            if (stakeholder.id == id) {
                stakeholder.onionlayer = camada;
                stakeholder.openEdit = false

            }
        });

    };

    vm.click = function(camada) {
        var altura = 400;
        event.stopPropagation();
        var comunidade = document.getElementById('comunidade');
        var mercado = document.getElementById('mercado');
        var fonte = document.getElementById('fonte');
        var contribuicao = document.getElementById('contribuicao');
        var operacao = document.getElementById('operacao');

        if (camada=='operacao') {

            operacao.style.height = altura + 'px';
            contribuicao.style.height = '';
            fonte.style.height = '';
            mercado.style.height = '';
            comunidade.style.height = '';

            content_operacao.style.height = altura + 'px';

            content_operacao.style.display = 'block';
            content_contribuicao.style.display = 'none';
            content_fonte.style.display = 'none';
            content_mercado.style.display = 'none';
            content_comunidade.style.display = 'none';


        } else if (camada=='contribuicao') {
            operacao.style.height = '';
            contribuicao.style.height = altura + 'px';
            fonte.style.height = '';
            mercado.style.height = '';
            comunidade.style.height = '';

            content_contribuicao.style.height = altura - 60 + 'px';

            content_operacao.style.display = 'none';
            content_contribuicao.style.display = 'block';
            content_fonte.style.display = 'none';
            content_mercado.style.display = 'none';
            content_comunidade.style.display = 'none';
        }  else if (camada=='fonte') {
            operacao.style.height = '';
            contribuicao.style.height = '';
            fonte.style.height = altura  + 'px';
            mercado.style.height = '';
            comunidade.style.height = '';

            content_fonte.style.height = altura - 100 + 'px';

            content_operacao.style.display = 'none';
            content_contribuicao.style.display = 'none';
            content_fonte.style.display = 'block';
            content_mercado.style.display = 'none';
            content_comunidade.style.display = 'none';
        }  else if (camada=='mercado') {
            operacao.style.height = '';
            contribuicao.style.height = '';
            fonte.style.height = '';
            mercado.style.height = altura  + 'px';
            comunidade.style.height = '';

            content_mercado.style.height = altura  - 130 + 'px';

            content_operacao.style.display = 'none';
            content_contribuicao.style.display = 'none';
            content_fonte.style.display = 'none';
            content_mercado.style.display = 'block';
            content_comunidade.style.display = 'none';
        }  else if (camada=='comunidade') {
            operacao.style.height = '';
            contribuicao.style.height = '';
            fonte.style.height = '';
            mercado.style.height = '';
            comunidade.style.height = altura + 'px';

            content_comunidade.style.height = altura - 175 + 'px';

            content_operacao.style.display = 'none';
            content_contribuicao.style.display = 'none';
            content_fonte.style.display = 'none';
            content_mercado.style.display = 'none';
            content_comunidade.style.display = 'block';
        }
    }



    vm.acende = function(evt) {
            evt.target.setAttribute("opacity", "0.7");
        }
    vm.apaga = function(evt) {
        evt.target.setAttribute("opacity", "1.0");
    }
    vm.addStack = function(e,camada){
        alert('Posicao X.' + e.pageX + ' Posicao X.' + e.pageY + ' ' + camada)
    }



}

function onDragStart(event) {
    event.dataTransfer.setData("Text",event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    var id_div = event.target.id;
    if (id_div=='operacao') {
        document.getElementById('content_operacao').appendChild(document.getElementById(data));
        document.getElementById('content_operacao').style.display = 'none';
    } else if (id_div=='contribuicao') {
        document.getElementById('content_contribuicao').appendChild(document.getElementById(data));
        document.getElementById('content_contribuicao').style.display = 'none';
    } else if (id_div=='fonte') {
        document.getElementById('content_fonte').appendChild(document.getElementById(data));
        document.getElementById('content_fonte').style.display = 'none';
    } else if (id_div=='mercado') {
        document.getElementById('content_mercado').appendChild(document.getElementById(data));
        document.getElementById('content_mercado').style.display = 'none';
    } else if (id_div=='comunidade') {
        document.getElementById('content_comunidade').appendChild(document.getElementById(data));
        document.getElementById('content_comunidade').style.display = 'none';
    } else {
        event.target.appendChild(document.getElementById(data));
    }



}