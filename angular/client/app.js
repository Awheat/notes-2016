/*
 +--------------------------------------------------------------------
 +		@Project: weizhong
 +		@Date: 2016/04/1 PM
 +		@Author: wuwangcheng
 +		@Email: 395212731@qq.com
 +		@Address laiguangying
 +--------------------------------------------------------------------
 */
/*
 +--------------------------------------------------------------------
 +
 +	    定义app模块
 +
 +--------------------------------------------------------------------
 */
var app = angular.module('layoutApp', ['ui.router']);
/*
 +--------------------------------------------------------------------
 +
 +	    路由
 +
 +--------------------------------------------------------------------
 */
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //清除路由缓存
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'tpls/login/login.html',
            controller: 'LoginController'
        })
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/index/index.html'
                },
                'nav@index': {
                    templateUrl: 'tpls/layout/nav.html'
                },
                'navbar@index': {
                    templateUrl: 'tpls/layout/navbar.html'
                }
            }
        })

        .state("index3", {
            url: "/index3",
            templateUrl: "tpls/index/index3.html",
            controller: 'IndexController'
        })
        .state("index3.welcome", {
            url: "/welcome",
            templateUrl: "tpls/index/welcome.html",
            controller: 'IndexController'
        })
        .state("index3.pwdupload", {
            url: "/pwdupload",
            templateUrl: "tpls/admin/pwdupload.html",
            controller: 'IndexController'
        })
        .state("index3.userInfo", {
            url: "/userInfo",
            templateUrl: "tpls/user/userInfo.html",
            controller: 'IndexController'
        })
        .state("index3.certifList", {
            url: "/certifList",
            templateUrl: "tpls/user/certifList.html",
            controller: 'IndexController'
        })
        .state("index3.infoExport", {
            url: "/infoExport",
            templateUrl: "tpls/user/infoExport.html",
            controller: 'IndexController'
        })
        .state("index3.depList", {
            url: "/depList",
            templateUrl: "tpls/dep/depList.html",
            controller: 'IndexController'
        })
        .state("index3.depAdd", {
            url: "/depAdd",
            templateUrl: "tpls/dep/depAdd.html",
            controller: 'IndexController'
        })
        .state("index3.depEdit", {
            url: "/depEdit",
            templateUrl: "tpls/dep/depEdit.html",
            controller: 'IndexController'
        })
        .state("index3.tagList", {
            url: "/tagList",
            templateUrl: "tpls/tag/tagList.html",
            controller: 'IndexController'
        })
        .state("index3.tageyeuser", {
            url: "/tageyeuser",
            templateUrl: "tpls/tag/tageyeuser.html",
            controller: 'IndexController'
        })
        .state("index3.tagadduser", {
            url: "/tagadduser",
            templateUrl: "tpls/tag/tagadduser.html",
            controller: 'IndexController'
        });
}]);
/*
 +--------------------------------------------------------------------
 +
 +	    控制器
 +
 +--------------------------------------------------------------------
 */

app.controller('IndexController', ['$scope', '$timeout', function ($scope, $timeout) {
    console.log("首页控制器");
    //页面存在时间选择器时需要执行初始化代码
    laydateInit();


}]);
//部门
app.controller('DepController', ['$scope', '$timeout', function ($scope, $timeout) {
    console.log("部门控制器");


}]);

app.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
    console.log("登录页控制器");

    var api = {
        createVerify: 'http://1.weizhong360.cn/public/index.php/Login/login/createVerify',
        login: 'http://1.weizhong360.cn/public/index.php/Login/login/login'
    };
    //验证码刷新
    $scope.refresh = function () {
        $scope.verifyCodeSrc = api.createVerify + "?" + Math.floor(Math.random() * 999);
    }
    //登陆点击
    $scope.login = function () {
        $http.post(
            api.login,
                '{"control": {"data_source": "xxxx"},"base": {"from":"0","user_name":"' + $scope.username + '","user_password":"' + $scope.password + '","verify_code":"' + $scope.verify + '"}}'
        ).success(function (data) {
                //验证码再次刷新
                $scope.refresh();

                console.log(data);
                $scope.respMsg = data.base.error_msg;
                if (data.base.error_msg == "登录成功") {
                    alert("登陆成功");
                }
            });
    }
    $scope.refresh();


//    admin  123456
//    http://127.0.0.1/wz/src/dev/public/index.php/Login/login/createVerify
//    http://1.weizhong360.cn/public/index.php/Login/login/createVerify


}]);



//页面时间，
app.controller('TimerCtrl', ['$scope', function ($scope) {
    $scope.clock = new Date();
    var updateClock = function () {
        $scope.clock = new Date();
    };
    setInterval(function () {
        $scope.$apply(updateClock);
    }, 60000);
    updateClock();
}]);
