define(['angular'], function (ng) {
    'use strict';
    return ng.module('myApp.controllers', [])
        .controller('LoginController',['$scope',function($scope){
            $scope.title = "登录";
        }])
        .controller('RegistController',['$scope',function($scope){
            $scope.title = "注册";
        }])
        .controller('IndexController',['$scope',function($scope){
            $scope.title = "首页";
        }]);
});