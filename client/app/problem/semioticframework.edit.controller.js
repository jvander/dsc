/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('semioticframeworkController',semioticframeworkController);


function semioticframeworkController(){

    var vm = this;

    vm.semioticframework = [
        {
        "community":{
            "stakeholders":[
            {
                "nome": "Stakeyholder1"
            },
            {
                    "nome": "Stakeyholder2"
            }
            ]
        },
        "market":{
            "stakeholders":[
                {
                    "nome": "Stakeyholder3"
                },
                {
                    "nome": "Stakeyholder4"
                }
            ]

        },
        "source":{
            "stakeholders":[
                {
                    "nome": "Stakeyholder5"
                },
                {
                    "nome": "Stakeyholder6"
                }
            ]
        },
        "contruibuition":{
            "stakeholders":[
                {
                    "nome": "Stakeyholder7"
                },
                {
                    "nome": "Stakeyholder8"
                }
            ]
        },
        "technico":{
            "stakeholders":[
                {
                    "nome": "Stakeyholder9"
                },
                {
                    "nome": "Stakeyholder10"
                }
            ]
        }
        }
    ]

    vm.setValueSF = function(){
        console.log('semioticframeworkController');
    }


}