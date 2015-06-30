/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function(){

'use strict';

angular.module('app')
    .config(routes);

function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('init', {
        url: '/',
        templateUrl: 'views/pages/initpage.html',
        controller: 'loginController as vm'
        })
        .state('init.login', {
            url: 'login',
            views: {
                'content-tab': {
                    templateUrl: 'views/pages/userlogin.html',
                    controller: 'loginController as vm'
                }
            }
        })
        .state('init.signup', {
            url: 'signup',
               views: {
                'content-tab': {
                    templateUrl: 'views/pages/signup.html',
                    controller: 'signupController as vm'
                }
            }
        })
        .state('init.rescuepassword', {
            url: 'rescuepassword',
            views: {
                'content-tab': {
                    templateUrl: 'views/pages/rescuepassword.html',
                    controller: 'loginController as vm'
                }
            }
        })
        .state('startproblem', {
            url: '/startproblem',
            templateUrl: 'views/pages/startproblem.html',
            controller: 'startProblemController as vm'
        })


        .state('problem', {
            url: '/problem',
            templateUrl: 'views/pages/problem.html',
            controller: 'menuProblemController as vm'
        })
        .state('problem.description', {
            url: '/description',
            views: {
                'problem-description': {
                    templateUrl: 'views/pages/problemdescription.html',
                    controller: 'editProblemController as vm'
                }
            }
        })
        .state('problem.stakeholders', {
            url: 'stakeholders',
            views: {
                'dsc-artifact': {
                    templateUrl: 'views/pages/stakeholders.html',
                    controller: 'stakeholderController as vm'
                }
            }
        })
        .state('problem.valuationframing', {
                url: 'valuationframing',
                views: {
                    'dsc-artifact': {
                        templateUrl: 'views/pages/valuationframing.html',
                        controller: 'valuationframingController as vm'
                    }
                }
            })

        .state('problem.semioticframework', {
                url: 'semioticframework',
                views: {
                    'dsc-artifact': {
                        templateUrl: 'views/pages/semioticframework.html',
                        controller: 'semioticframeworkController as vm'
                    }
                }
            });
        $urlRouterProvider.otherwise('/login');
}

})();