'use strict';
(function () {
    require.config({
        //baseUrl:'./src/js',
        paths: {
            angular: './libs/angular/angular',
            uiRouter: './libs/angular-ui-router/release/angular-ui-router',
            angularAnimate: './libs/angular-animate/angular-animate',
            angularRequire:'./libs/angular-require/angular-require',
            requireCss: './libs/require-css/css',
            baseJs: 'src/js/base'
        },
        map:{
            '*':{
                'css':'./libs/require-css/css'
            }
        },
        shim: {
            angular : {'exports' : 'angular'},
            uiRouter: {
                deps:['angular']
            },
            angularRequire:{
                deps:['angular']
            }
        }
    });
    require(['angular','app','baseJs'],function(angular,app,baseJs){
        angular.element(document).ready(function(){
            angular.bootstrap(document,['myApp']);
        });
    });
})();