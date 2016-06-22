
/*
* �������������ʵ���˰�����أ�����Ϳ��Խ�controller���һ��һ���ģ�js��cssҲ���԰�����Ҫ������
* 1.angularRequire�������ʵ�ָ���·�ɼ���js
* 2.requireCss�������ʵ�ָ���·�ɼ���css
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