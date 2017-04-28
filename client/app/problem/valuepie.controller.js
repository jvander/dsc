/**
 * Created by jesus on 20/03/2017.
 */

(function() {
    "use strict";
    angular
        .module('app')
        .controller('valuePieController', valuePieController);

    function valuePieController() {
        var self = this;
        self.apaga = apaga;
        self.acende = acende;
        self.addValue = addValue;
        self.saveTagValue = saveTagValue;
        self.valuePieList = [];

        function saveTagValue(tagValue) {
            self.valuePieList.splice((tagValue._id -1),1);
            tagValue._id = self.valuePieList.length +1;
            tagValue.openEdit = false;
            self.valuePieList.push(tagValue);
        };
        function addValue(e,sP) {
            var inf = e.target.id.split(".");
            var tagValue = {
                    "_id": self.valuePieList.length + 1,
                    "slice": inf[1],
                    "layer": inf[0],
                    "value": "",
                    "description": "",
                    "openEdit": true,
                    "x": e.pageX + 'px',
                    "y": e.pageY + 'px',
                    "zindex": 99
            };
            console.log(tagValue);
            self.valuePieList.push(tagValue);
        };

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