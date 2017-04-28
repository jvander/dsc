/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

(function(){

'use strict';

angular
    .module('app')
    .controller('semioticframeworkController',semioticframeworkController);

function semioticframeworkController($timeout,Socket,$window, problemService,toastApp){

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
    self.localcode = '';
    var flagDataBase = true;


    var dataBaseTimeOut = function() {
         flagDataBase = true;
    };


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
        if(isLocalCode(data.localcode)) {
            self.semioticframework.socialworld = data.text;
        }
    });

    var isLocalCode = function (code){
        return (self.localcode !== code);
    }

    function saveSocialWorld(text,flagSave){
        if (flagDataBase) {
            flagSave = flagDataBase;
            flagDataBase = false;
            $timeout(dataBaseTimeOut, 2000);
        }
        Socket.emit('updateSocialWorld',
            {
                text: text,
                update: flagSave,
                localcode: self.localcode
            }
        );
    }

    Socket.on('onUpdatePragmatic', function (data) {
        if(isLocalCode(data.localcode)) {
            self.semioticframework.pragmatic = data.text;
        }
    });

    function savePragmatic(text,flagSave){
        if (flagDataBase) {
            flagSave = flagDataBase;
            flagDataBase = false;
            $timeout(dataBaseTimeOut, 2000);
        }
        Socket.emit('updatePragmatic', {
            text: text,
            update: flagSave,
            localcode: self.localcode
        });
    }

    Socket.on('onUpdateSemantic', function (data) {
        if(isLocalCode(data.localcode)) {
            self.semioticframework.semantic = data.text;
        }
    });

    function saveSemantic(text,flagSave){
        if (flagDataBase) {
            flagSave = flagDataBase;
            flagDataBase = false;
            $timeout(dataBaseTimeOut, 2000);
        }
        Socket.emit('updateSemantic', {
            text: text,
            update: flagSave,
            localcode: self.localcode
        });
    }

    Socket.on('onUpdateSyntatic', function (data) {
        if(isLocalCode(data.localcode)) {
            self.semioticframework.syntatic = data.text;
        }
    });

    function saveSyntatic(text,flagSave){
        if (flagDataBase) {
            flagSave = flagDataBase;
            flagDataBase = false;
            $timeout(dataBaseTimeOut, 2000);
        }
        Socket.emit('updateSyntatic', {
            text: text,
            update: flagSave,
            localcode: self.localcode
        });
    }

    Socket.on('onUpdateEmpirical', function (data) {
        if(isLocalCode(data.localcode)) {
            self.semioticframework.empirical = data.text;
        }
    });

    function saveEmpirical(text,flagSave){
        if (flagDataBase) {
            flagSave = flagDataBase;
            flagDataBase = false;
            $timeout(dataBaseTimeOut, 2000);
        }
        Socket.emit('updateEmpirical', {
            text: text,
            update: flagSave,
            localcode: self.localcode
        });
    }

    Socket.on('onUpdatePhysical', function (data) {
        if(isLocalCode(data.localcode)) {
            self.semioticframework.physical = data.text;
        }
    });

    function savePhysical(text,flagSave){
        if (flagDataBase) {
            flagSave = flagDataBase;
            flagDataBase = false;
            $timeout(dataBaseTimeOut, 2000);
        }
        Socket.emit('updatePhysical', {
            text: text,
            update: flagSave,
            localcode: self.localcode
        });
    }
}

})();