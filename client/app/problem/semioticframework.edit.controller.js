/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('semioticframeworkController',semioticframeworkController);


function semioticframeworkController(){

    var vm = this;

    vm.semioticframework = {

        socialworld: {
            requirement: "",
            restriction: ""
            },

        pragmatic: {
            requirement: "",
            restriction: ""
        },

        semantic: {
            requirement: "",
            restriction: ""
        },

        syntatic: {
            requirement: "",
            restriction: ""
        },

        empirical: {
            requirement: "",
            restriction: ""
        },

        physical: {
            requirement: "",
            restriction: ""
        }
    }
}