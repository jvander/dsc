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
                    "discutionList":
                    [
                        {
                            "problem": "Problema 01",
                            "solution": "Solution  01"
                        },
                        {
                            "problem": "Problema 01",
                            "solution": "Solution  01"
                        }
                    ]

                },
                  {
                      "name": "Professor",
                      "discutionList":
                          [
                              {
                                  "problem": "Problema 01",
                                  "solution": "Solution  01"
                              },
                              {
                                  "problem": "Problema 01",
                                  "solution": "Solution  01"
                              }
                          ]

                  }
              ]
          },
          {
              "onionlayer": "Market",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      },
                      {
                          "name": "Professor",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      }
                  ]
          },
          {
              "onionlayer": "Source",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      },
                      {
                          "name": "Professor",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      }
                  ]
          },
          {
              "onionlayer": "Contribution",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      },
                      {
                          "name": "Professor",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      }
                  ]
          },
          {
              "onionlayer": "Technico",
              "stakeholderList":
                  [
                      {
                          "name": "Aluno",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      },
                      {
                          "name": "Professor",
                          "discutionList":
                              [
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  },
                                  {
                                      "problem": "Problema 01",
                                      "solution": "Solution  01"
                                  }
                              ]

                      }
                  ]
          }
      ];

      vm.newDiscussion = function() {
            console.log('new Discussion');

      }



  }