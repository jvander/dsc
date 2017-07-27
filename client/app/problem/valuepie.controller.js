/**
 * Created by jesus on 20/03/2017.
 */

(function() {
    "use strict";
    angular
        .module('app')
        .controller('valuePieController', valuePieController);

    function valuePieController(Socket, $filter,$window,problemService,$mdDialog,toastApp) {
        var self = this;
        self.apaga = apaga;
        self.acende = acende;
        self.addValue = addValue;
        self.saveTagValue = saveTagValue;
        self.valuePieList = [];
        self.delPostIt = delPostIt;
        self.minimizeTagValue = minimizeTagValue;
        self.initValuePie = initValuePie;
        self.setOpenEdit = setOpenEdit




    function saveTagValue(tagValue) {
        Socket.emit('broadcastValuePieSave', tagValue);
    }

     Socket.on('onBroadcastValuePieSave', function (data) {

            angular.forEach(self.valuePieList, function (tagValue) {
                if (tagValue._id == data._id){
                    tagValue.slice = data.slice,
                    tagValue.layer = data.layer,
                    tagValue.value = data.value,
                    tagValue.description = data.description,
                    tagValue.openEdit = false,
                    tagValue.x = data.x,
                    tagValue.y = data.y,
                    tagValue.zindex = 1
                }

        });
    });

    function setOpenEdit(id){
        angular.forEach(self.valuePieList, function (tagValue) {
            if(tagValue._id === id) {
                tagValue.openEdit = true;
                tagValue.zindex = self.valuePieList.length + 2;
            }
        });
    }

    function minimizeTagValue(tagValue) {
        tagValue.openEdit = false;
    }

        function initValuePie(){
            self.idproblem = $window.localStorage.getItem('problemid');
            self.localcode =  $window.localStorage.getItem('localcode');
            problemService.getvaluepie(self.idproblem)
                .success(function(data) {
                    if(data.success) {
                        for(var i = 0; i < data.valuepie.length; i++) {
                        var tagValue = {
                            _id: data.valuepie[i]._id,
                            slice : data.valuepie[i].slice,
                            layer : data.valuepie[i].layer,
                            value : data.valuepie[i].value,
                            description : data.valuepie[i].description,
                            openEdit : false,
                            x : data.valuepie[i].x,
                            y : data.valuepie[i].y,
                            zindex: 1
                        };
                        self.valuePieList.push(tagValue);
                    }


                    
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
        }

        
        Socket.on('onBroadcastValuePieAdd', function (data) {
                if(self.localcode !== data.localcode) {
                    data.tagValue.openEdit = false;
                    data.tagValue.name = 'New';
                }else{
                    data.tagValue.openEdit = true;
                }
                console.log(data);
                self.valuePieList.push(data.tagValue);
        });


        function addValue(e,sP) {
            var inf = e.target.id.split(".");

            Socket.emit ('broadcastValuePieAdd',{
                tagValue : {
                    "slice": inf[1],
                    "layer": inf[0],
                    "value": "",
                    "description": "",
                    "openEdit": true,
                    "x": e.pageX + 'px',
                    "y": e.pageY + 'px',
                    "zindex": 10
                },
                "localcode": self.localcode
            })
                
        };

        Socket.on('onBroadcastTagValueRemove', function (id) {
            var tagValue = document.getElementById("tagValue" +self.valuePieList[id]._id);
            tagValue.style.display = 'none';
            self.valuePieList.splice(id,1);
        });

        function removePostIt(index,tagValue) {
        var obj = {
            index: index,
            tagValue: tagValue
        };
        Socket.emit('broadcastTagValueRemove', obj);
    }

    function delPostIt(ev,index,tagValue) {
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title($filter('translate')('BTN_REMOVE') + '?')
            .content('Title: ' + tagValue.value)
            .ariaLabel('Remove Value')
            .ok($filter('translate')('LABEL_YES'))
            .cancel($filter('translate')('LABEL_BTN_CANCEL'))
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            removePostIt(index,tagValue);
        });
    }


     


        function acende(id) {
            document.getElementById("legend"+id).setAttribute('style', 'fill:#D1C4E9;');
        }

        function apaga(id,color) {
             document.getElementById("legend"+id).setAttribute('style', 'fill: '+color+';');
        }
        
        
        //Mapa
        self.listLocal = [];
        self.newLocal = newLocal;
        self.local = {};

        function newLocal(local) {

               local._id = self.listLocal.length + 1;
            console.log(local);
            self.local = {};
               var nLocal = local;
               self.listLocal.push(local);
        };
        
        
    }

})();