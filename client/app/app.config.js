/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function(){

    'use strict';

    angular
        .module('app')
        .config(appConfig);

    appConfig.$inject = ['$mdThemingProvider','$locationProvider'];

   /* function appConfig ($mdThemingProvider,$locationProvider) {

         //$locationProvider.html5Mode(true);
        var customGreenMap = $mdThemingProvider.extendPalette('teal', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'E0F2F1'
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

    };*/



    function appConfig($mdThemingProvider) {
                $mdThemingProvider.definePalette('teal', {
                    '50': 'E0F2F1',
                    '100': 'ffcdd2',
                    '200': '80CBC4',
                    '300': '4DB6AC',
                    '400': '26A69A',
                    '500': '009688',
                    '600': '00897B',
                    '700': '00796B',
                    '800': '00695C',
                    '900': '004D40',
                    'A100': 'A7FFEB',
                    'A200': '64FFDA',
                    'A400': '1DE9B6',
                    'A700': '00BFA5',
                    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                        // on this palette should be dark or light
                    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                        '200', '300', '400', 'A100'],
                    'contrastLightColors': undefined    // could also specify this if default was 'dark'
                });
                $mdThemingProvider.theme('default')
                    .primaryPalette('teal');
    }



})();