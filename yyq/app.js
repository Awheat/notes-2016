'use strict';

define([
    'angular',
    'uiRouter',
    'src/js/controllers',
    'src/js/directives',
    'src/js/filters',
    'src/js/services',
    'src/js/routers'
], function (angular, uiRouter) {
    return angular.module('myApp', ['ui.router', 'myApp.routers', 'myApp.controllers', 'myApp.directives', 'myApp.filters', 'myApp.services']);
});