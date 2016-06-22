define(['angular'], function (ng) {
    'use strict';
    return ng.module('myApp.directives', [])
        .directive('headerBarOne',function(){
            return {
                restrict:'EA',
                templateUrl:'./tpls/header_bar_one.html'
            }
        });
});