/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

(function(){

'use strict';

angular
    .module('app')
    .controller('semioticframeworkController',semioticframeworkController);

function semioticframeworkController(Socket,$window, problemService,toastApp){

    var self = this;
    self.idproblem = "";
    self.saveSocialWorld = saveSocialWorld;
    self.savePragmatic = savePragmatic;
    self.saveSemantic = saveSemantic;
    self.saveSyntatic = saveSyntatic;
    self.saveEmpirical = saveEmpirical;
    self.savePhysical = savePhysical;
    self.semioticframework = "";
    self.initSemioticFramework = initSemioticFramework;

    function initSemioticFramework(){
        self.idproblem = $window.localStorage.getItem('problemid');
        problemService.getsemiotic(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    self.semioticframework = data.semioticframework;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
    }

    Socket.on('onUpdateSocialWorld', function (text) {
        self.semioticframework.socialworld = text;
    });

    function saveSocialWorld(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateSocialWorld', obj);
    }

    Socket.on('onUpdatePragmatic', function (text) {
        self.semioticframework.pragmatic = text;
    });

    function savePragmatic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updatePragmatic', obj);
    }

    Socket.on('onUpdateSemantic', function (text) {
        self.semioticframework.semioticramework = text;
    });

    function saveSemantic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateSemantic', obj);
    }

    Socket.on('onUpdateSyntatic', function (text,flagSave) {
        self.semioticframework.syntatic = text;
    });

    function saveSyntatic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateSyntatic', obj);
    }

    Socket.on('onUpdateEmpirical', function (text) {
        self.semioticframework.empirical = text;
    });

    function saveEmpirical(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updateEmpirical', obj);
    }

    Socket.on('onUpdatePhysical', function (text) {
        self.semioticframework.physical = text;
    });

    function savePhysical(text,flagSave){
        var obj = {
            text: text,
            update: flagSave
        };
        Socket.emit('updatePhysical', obj);
    }
}

})();