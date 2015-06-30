/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('semioticframeworkController',semioticframeworkController);


function semioticframeworkController(){

    var vm = this;

    vm.setValueSF = function(){
        console.log('semioticframeworkController');
    }


}