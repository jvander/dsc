/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function(){
    'use strict';
    angular
        .module('app')
        .config(appConfig);

    appConfig.$inject = ['$mdThemingProvider','$locationProvider'];

    function appConfig ($mdThemingProvider,$locationProvider) {

         //$locationProvider.html5Mode(true);
        var customGreenMap = $mdThemingProvider.extendPalette('teal', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': '009688'
        });

        $mdThemingProvider.definePalette('customGreen', customGreenMap);
        $mdThemingProvider.theme('default')
            .primaryPalette('customGreen', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('teal');
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('green');

    }


})();