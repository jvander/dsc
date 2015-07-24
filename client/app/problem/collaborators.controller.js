/**
 * Created by JOSEVALDERLEI on 10/07/2015.
 */


(function(){

    "use strict";

    angular
        .module('app')
        .controller('controllerCollaborators', controllerCollaborators);

    function controllerCollaborators($window,problemService,toastApp){

        var self = this;
        self.idProblem = "";
        self.collaborators = [];
        self.useremail = "";
        self.initCollaborators = initCollaborators;
        self.addCollaborator = addCollaborator;
        self.removeCollaborator = removeCollaborator;

        function initCollaborators(){
            self.idProblem = $window.localStorage.getItem('problemid');
            self.useremail = $window.localStorage.getItem('useremail');
            problemService.getcollaborators(self.idProblem)
                .success(function(data) {
                    if(data.success) {
                        self.collaborators = data.collaborators;
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
        }

        function searchCallaboration(email){
            for(var i = 0; i < self.collaborators.length; i++){
                if(email == self.collaborators[i].email){
                    return true;
                }
            }
            return false;
        }

        function addCollaborator(email){
            if(self.useremail == email){
                toastApp.errorMessage(self.useremail + " is email of owner.");
            }else {
                if (searchCallaboration(email)) {
                    toastApp.errorMessage("Usuario Cadastrado.");
                } else {
                    var invite = {
                        idproblem: self.idProblem,
                        email: email
                    };
                    problemService.invite(invite)
                        .success(function (data) {
                            if (data.success) {
                                self.collaborators = data.collaborators;
                            } else {
                                toastApp.errorMessage(data.message);
                            }
                        });
                }
            }
        }

        function removeCollaborator(people){
            var obj = {
                idproblem: self.idProblem,
                email: people.email
            };
           problemService.removecollaborators(obj)
                .success(function(data) {
                    if(data.success) {
                        toastApp.errorMessage("Colaborador foi removido do projeto.");
                        self.collaborators = data.collaborators;
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                });
        }
    }

})();