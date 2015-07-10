/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

'use strict';

angular.module('app')
    .controller('evaluationframeworkController',evaluationframeworkController);




  function evaluationframeworkController (){

      var vm = this;
      vm.evaluationframeworkList =
      [
          {
              "onionlayer": "Community",
              "stakeholderList":
              [
                  {
                    "name": "Aluno",
                    "openEdit": false,
                    "problems": "Problema Aluno",
                    "solutions": "Solution  Aluno"
                  },
                  {
                      "name": "Professor",
                      "openEdit": false,
                      "problems": "Problema Professor",
                      "solutions": "Solution  Professor"
                  }
              ]
          },
          {
              "onionlayer": "Market",
              "stakeholderList":
                  [

                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"

                      },
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      }
                  ]
          },
          {
              "onionlayer": "Source",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      },
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      }
                  ]
          },
          {
              "onionlayer": "Contribution",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      },
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      }
                  ]
          },
          {
              "onionlayer": "Technico",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      },
                      {
                          "name": "Aluno",
                          "openEdit": false,
                          "problems": "Problema Aluno",
                          "solutions": "Solution  Aluno"
                      }
                  ]
          }
      ];

      vm.saveDiscution = function(stakeholder) {
          console.log("salvar...");
              stakeholder.openEdit = false;

      }

      vm.setOpenEditDiscution = function(currentStakeholder){
          console.log("editando......");
          currentStakeholder.openEdit = true;


          /*var id = currentStakeholder.id;
          if ( id == 0) {
              currentStakeholder.openEdit = true;
          } else {
              angular.forEach(vm.evaluationframeworkList.stakeholderList, function (stakeholder) {
                  if (stakeholder.id == id) stakeholder.openEdit = true;
              });
          }*/

      };



  }