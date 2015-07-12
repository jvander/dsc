/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('semioticframeworkController',semioticframeworkController);


function semioticframeworkController(){

    var vm = this;
    vm.saveSocialWorld = saveSocialWorld;
    vm.savePragmatic = savePragmatic;
    vm.saveSemioticFramework = saveSemioticFramework;
    vm.saveSyntatic = saveSyntatic;
    vm.saveEmpirical = saveEmpirical;
    vm.savePhysical = savePhysical;


    vm.semioticframework = {
        socialworld: "social",
        pragmatic: "pragmatic",
        semantic: "semantic",
        syntatic: "syntatic",
        empirical: "empirical",
        physical: "phisical"
    }


    function saveSocialWorld(socialworld){
        console.log(socialworld);
    }
    function savePragmatic(pragmatic){
        console.log(pragmatic);
    }

    function saveSemioticFramework(semantic){
        console.log(semantic);
    }

    function saveSyntatic(syntatic){
        console.log(syntatic);
    }

    function saveEmpirical(empirical){
        console.log(empirical);
    }
    function savePhysical(physical){
        console.log(physical);
    }




}