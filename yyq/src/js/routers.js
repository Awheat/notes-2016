
/*
* 利用下面的真正实现了按需加载，后面就可以将controller拆成一个一个的，js和css也可以按照需要加载了
* 1.angularRequire这个可以实现根据路由加载js
* 2.requireCss这个可以实现根据路由加载css
* */
define(['angular','uiRouter','src/js/controllers','angularRequire','requireCss'], function (ng,uiRouter,controllers,angularRequire,requireCss) {
    'use strict';
    return ng.module('myApp.routers', ['ui.router','ngRequire','myApp.controllers'])
        .config(['$requireProvider','$stateProvider', '$urlRouterProvider', function ($requireProvider,$stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'tpls/login.html',
                    controller: 'LoginController',
                    resolve:{
                        deps:$requireProvider.requireJS([
                            './src/js/test'
                        ]),
                        css: $requireProvider.requireCSS([
                            'css!./dist/css/test.css'
                        ])
                    }
                })
                .state('regist', {
                    url: '/regist',
                    templateUrl: 'tpls/regist.html',
                    controller: 'RegistController'
                })
                .state('index', {
                    url: '/index',
                    templateUrl: 'tpls/index.html',
                    controller: 'IndexController'
                })
        }]);

});