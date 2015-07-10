/**
 * Created by JOSEVALDERLEI on 10/07/2015.
 */


(function(){
    "use strict";
    angular.module('app')
        .controller('controllerCollaborators', controllerCollaborators);

    function controllerCollaborators($window,problemService){

        var self = this;
        self.idProblem = "";
        self.collaborators = [];


        self.initCollaborators = function(){

            self.idProblem = $window.localStorage.getItem('problemid');
            console.log('Init collaborators' + self.idProblem)
            problemService.getcollaborators(self.idProblem)
                .success(function(data) {
                    console.log(data.success);
                    if(data.success) {
                        self.collaborators = data.collaborators;
                        console.log(data.collaborators)
                    }else{
                        toastApp.errorMessage(data.message);
                    }
                })

        };

        self.addCollaborator = function(people){
            var collaborator = {
                nickname: self.collaborators.length + 'XXX',
                email: people.email
            }
            self.collaborators.push(collaborator)
        }

        self.removeCollaborator = function(people){
            console.log(people.email);
        }
    }

})();