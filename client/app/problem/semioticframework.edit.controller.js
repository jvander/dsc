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
    self.editSocialworld = editSocialworld;
    self.isEditSocialworld = false;
    self.onBlurSocialworld = onBlurSocialworld;
    self.localcode = '';





    function onBlurSocialworld(text,flag){
        editSocialworld();
        saveSocialWorld(text,flag);
    }

    function editSocialworld() {
        self.isEditSocialworld = !self.isEditSocialworld;
    }

    function initSemioticFramework(){
        self.idproblem = $window.localStorage.getItem('problemid');
        self.localcode =  $window.localStorage.getItem('localcode');
        problemService.getsemiotic(self.idproblem)
            .success(function(data) {
                if(data.success) {
                    self.semioticframework = data.semioticframework;
                }else{
                    toastApp.errorMessage(data.message);
                }
            });
    }
    
    
    Socket.on('onUpdateSocialWorld', function (data) {
        if(self.localcode !== data.localcode) {
            self.semioticframework.socialworld = data.text;
        }
    });

    function saveSocialWorld(text,flagSave){
        var obj = {
            text: text,
            update: flagSave,
            localcode: self.localcode
        };
        Socket.emit('updateSocialWorld', obj);
    }

    Socket.on('onUpdatePragmatic', function (data) {
        if(self.localcode !== data.localcode) {
            self.semioticframework.pragmatic = data.text;
        }
    });

    function savePragmatic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave,
            localcode: self.localcode
        };
        Socket.emit('updatePragmatic', obj);
    }

    Socket.on('onUpdateSemantic', function (data) {
        if(self.localcode !== data.localcode) {
            self.semioticframework.semantic = data.text;
        }
    });

    function saveSemantic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave,
            localcode: self.localcode
        };
        Socket.emit('updateSemantic', obj);
    }

    Socket.on('onUpdateSyntatic', function (data) {
        if(self.localcode !== data.localcode) {
            self.semioticframework.syntatic = data.text;
        }
    });

    function saveSyntatic(text,flagSave){
        var obj = {
            text: text,
            update: flagSave,
            localcode: self.localcode
        };
        Socket.emit('updateSyntatic', obj);
    }

    Socket.on('onUpdateEmpirical', function (data) {
        if(self.localcode !== data.localcode) {
            self.semioticframework.empirical = data.text;
        }
    });

    function saveEmpirical(text,flagSave){
        var obj = {
            text: text,
            update: flagSave,
            localcode: self.localcode
        };
        Socket.emit('updateEmpirical', obj);
    }

    Socket.on('onUpdatePhysical', function (data) {
        if(self.localcode !== data.localcode) {
            self.semioticframework.physical = data.text;
        }
    });

    function savePhysical(text,flagSave){
        var obj = {
            text: text,
            update: flagSave,
            localcode: self.localcode
        };
        Socket.emit('updatePhysical', obj);
    }
}

})();