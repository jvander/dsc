/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */


'use strict';

angular.module('app')
    .controller('semioticframeworkController',semioticframeworkController);


function semioticframeworkController(Socket,$window, problemService){
    var vm = this;
    vm.idproblem = "";
    vm.saveSocialWorld = saveSocialWorld;
    vm.savePragmatic = savePragmatic;
    vm.saveSemantic = saveSemantic;
    vm.saveSyntatic = saveSyntatic;
    vm.saveEmpirical = saveEmpirical;
    vm.savePhysical = savePhysical;
    vm.semioticframework = "";
    vm.initSemioticFramework = initSemioticFramework;

    function initSemioticFramework(){
        vm.idproblem = $window.localStorage.getItem('problemid');

        problemService.getsemiotic(vm.idproblem)
            .success(function(data) {
                if(data.success) {
                    vm.semioticframework = data.semioticframework;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
    }

    Socket.on('onUpdateSocialWorld', function (text) {
        vm.semioticframework.socialworld = text;
    });

    function saveSocialWorld(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateSocialWorld', obj);
    }

    Socket.on('onUpdatePragmatic', function (text) {
        vm.semioticframework.pragmatic = text;
    });

    function savePragmatic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updatePragmatic', obj);
    }

    Socket.on('onUpdateSemantic', function (text) {
        vm.semioticframework.semioticramework = text;
    });
    function saveSemantic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateSemantic', obj);
    }

    Socket.on('onUpdateSyntatic', function (text,flagSave) {
        vm.semioticframework.syntatic = text;
    });
    function saveSyntatic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateSyntatic', obj);
    }

    Socket.on('onUpdateEmpirical', function (text) {
        vm.semioticframework.empirical = text;
    });
    function saveEmpirical(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateEmpirical', obj);
    }

    Socket.on('onUpdatePhysical', function (text) {
        vm.semioticframework.physical = text;
    });
    function savePhysical(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updatePhysical', obj);
    }




}