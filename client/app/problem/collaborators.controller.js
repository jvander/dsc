/**
 * Created by JOSEVALDERLEI on 10/07/2015.
 */


(function(){
    "use strict";
    angular.module('app')
        .controller('controllerCollaborators', controllerCollaborators);

    function controllerCollaborators($window,problemService,toastApp){

        var self = this;
        self.idProblem = "";
        self.collaborators = [];


        self.initCollaborators = function(){
            self.idProblem = $window.localStorage.getItem('problemid');
            problemService.getcollaborators(self.idProblem)
                .success(function(data) {
                    if(data.success) {
                        self.collaborators = data.collaborators;
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                })
        };

        function searchCallaboration(email){
            for(var i = 0; i < self.collaborators.length; i++){
                if(email == self.collaborators[i].email){
                    return true;
                }
            }
            return false;
        };

        self.addCollaborator = function(email){
            if(searchCallaboration(email)){
                toastApp.errorMessage("Usuario Cadastrado.");
            }else{
                var invite = {
                    idproblem: self.idProblem,
                    email: email
                }
                problemService.invite(invite)
                    .success(function(data) {
                        if(data.success) {
                            self.collaborators = data.collaborators;
                        }else{
                            toastApp.errorMessage(data.message);
                        }
                    })
            }

        }

        self.removeCollaborator = function(people){
            console.log(people.email);
        }
    }

})();