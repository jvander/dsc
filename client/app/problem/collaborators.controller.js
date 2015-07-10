/**
 * Created by JOSEVALDERLEI on 10/07/2015.
 */


(function(){
    "use strict";
    angular.module('app')
        .controller('controllerCollaborators', controllerCollaborators);

    function controllerCollaborators($window){

        var self = this;
        self.idProblem = "";
        self.collaborators = [
            {
                nickname: "Jesus",
                email: "jesus@jesus.com"
            },
            {
                nickname: "Madalena",
                email: "madalena@jesus.com"
            }
        ];


        self.initCollaborators = function(){
            self.idProblem = $window.localStorage.getItem('problemid');


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