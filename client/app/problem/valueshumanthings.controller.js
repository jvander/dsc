/**
 * Created by jesus on 29/09/2016.
 */

(function() {
    "use strict";
    angular
        .module('app')
        .controller('valuesHumanThingsController', valuesHumanThingsController);

    function valuesHumanThingsController($mdDialog, $window, VisDataSet, problemService) {
        var self = this;
        self.initValuesHumanThingsForm = initValuesHumanThingsForm;
        self.newConnetion = newConnetion;
        self.actorList = [];
        self.removeHTN = removeHTN;
        self.tableHTN = [];
        /*self.tableHTN = [{
            actor01:'',
            actor02:'',
            arrow:'',
            interaction: {
                formal: [],
                informal: [],
                technico: []
            },
            association: {
                formal: [],
                informal: [],
                technico: []
            },
            learning: {
                formal: [],
                informal: [],
                technico: []
            },
            play: {
                formal: [],
                informal: [],
                technico: []
            },
            protection: {
                formal: [],
                informal: [],
                technico: []
            },
            exploitation: {
                formal: [],
                informal: [],
                technico: []
            },
            temporality: {
                formal: [],
                informal: [],
                technico: []
            },
            territoriality: {
                formal: [],
                informal: [],
                technico: []
            },
            classification: {
                formal: [],
                informal: [],
                technico: []
            },
            subsistence: {
                formal: [],
                informal: [],
                technico: []
            }

        }]*/

        function removeHTN(idx,net){
            self.tableHTN.splice(idx,1);
            edges.forEach(function (e) {
                if((e.from === net.actor01.id) && (net.connection === e.arrows)){
                    edges.remove(e);
                    return
                }
            })

        }

      
        function initValuesHumanThingsForm() {
            self.idproblem = $window.localStorage.getItem('problemid');
            problemService.getonion(self.idproblem)
                .success(function (data) {
                    if (data.success) {
                        data.stakeholders.forEach(function (actor) {
                            nodes.add({id:actor._id, label: actor.name});
                            self.actorList.push({id: actor._id, name: actor.name, description: actor.description});
                        });
                    } else {
                        toastApp.errorMessage(data.message);
                    }
                });
        }


        function newConnetion(ev) {
            $mdDialog.show({
                controller: DialogControllerConnecton,
                templateUrl: 'views/pages/newconnection.html',
                parent: angular.element(document.body),
                targetEvent: ev
            });
        }

        function DialogControllerConnecton($scope, toastApp, $mdDialog) {
            $scope.items1 = self.actorList;
            $scope.items2 = [];

            $scope.saveHTN = function(net){
                if(net === undefined || net.actor01 === ""){
                    toastApp.errorMessage("Select Actor 01");
                    return;
                }
                else if(net.actor02 === undefined || net.actor02 === ""){
                    toastApp.errorMessage("Select Actor 02");
                    return;
                }
               else if (net.connection === undefined || net.connection === ""){
                    toastApp.errorMessage("Select connection " + net.actor01.name + ' and ' + net.actor02.name);
                    return;
                }

                self.tableHTN.push(net);
                edges.add({from: net.actor01.id, to: net.actor02.id, arrows: net.connection})
                $mdDialog.hide();
            }
            

            $scope.selectActor = function (actor) {
                $scope.items2 = [];
                var idx = returnIndexOf(actor);
                if (idx > -1) {
                    $scope.items2 = $scope.items1.slice();
                    $scope.items2.splice(idx, 1);
                }
            };

            var returnIndexOf = function(o) {
                for (var i = 0; i < $scope.items1.length; i++) {
                    if ($scope.items1[i].name == o.name) {
                        return i;
                    }
                }
                return -1;
            }

            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
        }



            self.onSelect = function(items) {
                // debugger;
                alert('select');
            };

            self.onClick = function(props) {
                //debugger;
                alert('Click');
            };

            self.onDoubleClick = function(props) {
                // debugger;
                alert('DoubleClick');
            };

            self.rightClick = function(props) {
                alert('Right click!');
                props.event.preventDefault();
            };

        self.options = {
            autoResize: true,
            height: '800',
            width: '100%',
        };

        var nodes = new vis.DataSet([
            {id:0, label:"System", shape:"circle"}
        ]);


       var edges = new vis.DataSet([]);

        /*function network() {
            for(var i = 0; i < self.actorList.length-1; i++){
                if((i % 2)==0){
                    edges.add({from: self.actorList[i].id, to: self.actorList[i+1].id, arrows:'from'})
                }else{
                    edges.add({from: self.actorList[i].id, to: self.actorList[i+1].id, arrows:'to, from'})
                }

            }
        }*/


        self.data = {
            nodes: nodes,
            edges: edges
        };

    }
})();