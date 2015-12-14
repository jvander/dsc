/**
 * Created by JOSEVALDERLEI on 28/07/2015.
 */

(function(){

    'use strict';

    angular
        .module('app')
        .controller('profileController',profileController);

    function profileController($window,$state, $scope,signupService){
        var self = this;
        self.startProfile = startProfile;
        self.uploadInProgress = true;
        self.uploadProgress = 0;
        self.userid;
        self.savePhoto = savePhoto;
        self.systemReturn = systemReturn;

        function systemReturn(){
            $state.go('startproblem');
        }

        self.myImage='';
        self.myCroppedImage='';

        var handleFileSelect = function(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function($scope){
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

        function startProfile(){
            self.userid = $window.localStorage.getItem("userid");
            if(self.userid !== undefined){

            }
        }
        function savePhoto(myimage){
            var userPhoto ={
                userid : $window.localStorage.getItem("userid"),
                photo : myimage
            }

            signupService.uploadPhoto(userPhoto)
                .success(function(data) {
                    if(data.success) {
                        $window.localStorage.setItem("photo",myimage);
                    }else{
                        toastApp.errorMessage("-----");
                    }
                });
        }
    }
})();

