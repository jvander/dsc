/**
 * Created by jesus on 21/03/2016.
 */

(function(){
    "use strict";

    angular
        .module('app')
        .controller('onionController',onionController);

    function onionController(Socket,$window,problemService,$mdDialog,toastApp){
        var self = this;
        self.idproblem = "";
        self.intiMytOnion = intiMytOnion;
        self.savePostItOnion = savePostItOnion;
        self.editPostItOnion = editPostItOnion;
        self.delPostItOnion = delPostItOnion;
        self.addPostItOnion = addPostItOnion;
        self.onOnion = onOnion;
        self.offOnion = offOnion;


        



    }
})();