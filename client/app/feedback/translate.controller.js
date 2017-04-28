/**
 * Created by JOSEVALDERLEI on 19/06/2015.
 */
(function(){

'use strict';

    angular
    .module('app')
    .config(initLanguage)
    .controller('languageController',languageController)
    .directive('changeLanguage',changeLanguage);

initLanguage.$inject = ['$translateProvider'];
languageController.$inject = ['$translate'];

function initLanguage ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/language/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useLocalStorage();
}

function languageController ($translate) {
    var self = this;
    self.setLang = setLang;
    function setLang(langKey) {
            $translate.use(langKey);
    }
}

function changeLanguage(){
    return {
        templateUrl : "app/language/changeLanguage.html",
        restrict: "E"
        };
    }

})();