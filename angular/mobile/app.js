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
app.run(['$rootScope', function ($rootScope) {
    $rootScope.uid = 1;
}]);
/*
 +--------------------------------------------------------------------
 +
 +	    设置页面标题
 +
 +--------------------------------------------------------------------
 */
app.controller("pageTitle", ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {
    /*监听当url改变成功事件*/
    $rootScope.$on("$locationChangeSuccess", function ($rootScope) {
        var routeName = $location.path().substr(1);
        switch (routeName) {
            case "index":
                $scope.title = "主页"
                break;
            case "shop":
                $scope.title = "商城"
                break;
            case "center":
                $scope.title = "个人中心"
                break;
            case "premium":
                $scope.title = "我的业绩"
                break;
            case "commision":
                $scope.title = "我的收入"
                break;
            case "myshop":
                $scope.title = "我的微店"
                break;
            case "myredpackets":
                $scope.title = "我的红包"
                break;
            case "personalcard":
                $scope.title = "个人名片"
                break;
            case "invitepartner":
                $scope.title = "邀请伙伴"
                break;
            case "aimsrules":
                $scope.title = "目标制定"
                break;
        }
    });
}]);
/*
 +--------------------------------------------------------------------
 +
 +	    路由
 +
 +--------------------------------------------------------------------
 */
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'tpls/index/index.html',
            controller: 'IndexController'

        })
        .state('shop', {
            url: '/shop',
            templateUrl: 'tpls/shop/shop.html',
            controller: 'ShopController'
        })
        .state('center', {
            url: '/center',
            templateUrl: 'tpls/center/center.html',
            controller: 'CenterController'
        })
        .state('premium', {
            url: '/premium',
            templateUrl: 'tpls/center/premium.html',
            controller: 'PremiumController'
        })
        .state('commision', {
            url: '/commision',
            templateUrl: 'tpls/center/commision.html',
            controller: 'CommisionController'
        })
        .state('myshop', {
            url: '/myshop',
            templateUrl: 'tpls/center/myshop.html',
            controller: 'CenterController'
        })
        .state('modifyshop', {
            url: '/modifyshop',
            templateUrl: 'tpls/center/modifyshop.html',
            controller: 'CenterController'
        })
        .state('myredpackets', {
            url: '/myredpackets',
            templateUrl: 'tpls/center/myredpackets.html',
            controller: 'CenterController'
        })
        .state('personalcard', {
            url: '/personalcard',
            templateUrl: 'tpls/center/personalcard.html',
            controller: 'CenterController'
        })
        .state('mypartner', {
            url: '/mypartner',
            templateUrl: 'tpls/center/mypartner.html',
            controller: 'MyPartnerController'
        })
        .state('invitepartner', {
            url: '/invitepartner',
            templateUrl: 'tpls/center/invitepartner.html',
            controller: 'JoinProcessController'
        })
        .state('uploadidcard', {
            url: '/uploadidcard',
            templateUrl: 'tpls/center/uploadidcard.html',
            controller: 'JoinProcessController'
        })
        .state('aimsrules', {
            url: '/aimsrules',
            templateUrl: 'tpls/center/aimsrules.html',
            controller: 'CenterController'
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'tpls/customer/customer.html',
            controller: 'CustomerController'
        })
        .state('detail', {
            url: '/detail/{uid}',
            templateUrl: 'tpls/customer/detail.html',
            controller: 'CtrDetailController'
        })
        .state('addcustomer', {
            url: '/addcustomer',
            templateUrl: 'tpls/customer/addcustomer.html',
            controller: 'AddCustomerController'
        })
        .state('editcustomer', {
            url: '/editcustomer/{uid}',
            templateUrl: 'tpls/customer/editcustomer.html',
            controller: 'EditCustomerController'
        })
        .state('notifylist', {
            url: '/notifylist',
            templateUrl: 'tpls/customer/notifylist.html',
            controller: 'CustomerController'
        })
        .state('editbless', {
            params:{"type":null,"name":null,"days":null},
            url: '/editbless/{id}',
            templateUrl: 'tpls/customer/editbless.html',
            controller: 'EditBlessController'
        })
        .state('test', {
            url: '/test',
            templateUrl: 'tpls/test/test.html',
            controller: 'TestController'
        })
}]);
/*
 +--------------------------------------------------------------------
 +
 +	    指令1.页面渲染完成加载焦点图
 +
 +--------------------------------------------------------------------
 */
app.directive('onFinishRender', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    /*向父控制器传递事件*/
                    scope.$emit('ngRepeatFinished');
                    /*向子控制器传递事件*/
                    /*scope.$broadcast('to-child');*/
                });
            }
        }
    };
}]);
/*
 +--------------------------------------------------------------------
 +
 +	    服务1.用promise对象获取数据2.滚动加载3.初始化日期插件
 +
 +--------------------------------------------------------------------
 */
app.factory('getDataByHttp', ['$http', '$q',
    function ($http, $q) {
        return {
            getData: function (api, args) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                $http.post(api, args).success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
                return promise;
            }
        }
    }
]);
app.factory('scrollLoading', ['getDataByHttp',
    function (getDataByHttp) {
        return {
            scrollLoad: function (list, total, api) {
                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();
                    var scrollHeight = $(document).height();
                    var windowHeight = $(this).height();
                    if (scrollTop + windowHeight == scrollHeight) {
                        var len = list.length;
                        var wraper = $("#data_wraper");
                        if (len < total) {
                            wraper.find(".loading").remove().end().append("<div style='padding:20px 0 0 0;text-align: center;color: #929292;font-size: .9rem;background: #efeff4;' class='loading'>正在加载中...</div>");
                            getDataByHttp.getData(api, '{"control": {"data_source": "xxxx"},"base": {"from": "' + len + '","count":"5"}}').then(function (data) {
                                wraper.find(".loading").remove();
                                var back_len = data.base.list.length;
                                len += back_len;
                                for (var i = 0; i < back_len; i++) {
                                    list.push(data.base.list[i]);
                                }
                            });
                        } else {
                            wraper.append("<div style='padding:20px 0 0 0;text-align: center;color: #929292;font-size: .9rem;background: #efeff4;' class='loading'>已全部加载</div>");
                            $(window).unbind("scroll");
                        }

                    }
                });
            }
        }
    }
]);
app.factory('initDatePules', ['$http', '$q',
    function ($http, $q) {
        return {
            getTotalDays: function (y, m) {
                m--;
                var d = new Date(y, m, 1);
                d.setDate(d.getDate() + 32 - d.getDate());
                return (32 - d.getDate());
            },
            getCurrDate:function(){
                var _date = new Date();
                var _year = _date.getFullYear();
                var _month = (_date.getMonth()+1)<10?'0'+(_date.getMonth()+1):(_date.getMonth()+1);
                return _year+'-'+_month+'-'+'01';
            },
            callback: function (value) {
            },
            initDatePules: function (id) {
                var currYear = (new Date()).getFullYear();
                var options = {
                    date: {
                        preset: 'date'
                    },
                    default: {
                        theme: 'android-ics light',
                        display: 'modal',
                        mode: 'scroller',
                        dateFormat: 'yyyy-mm',
                        lang: 'zh',
                        showNow: true,
                        startYear: currYear - 10,
                        endYear: currYear + 10,
                        onSelect: this.callback
                    }
                };
                $("#" + id).mobiscroll($.extend(options['date'], options['default']));
            }
        };
    }
]);
app.factory('getCustomerNotify',['$http', '$q',function($http,$q){
    return {
        getNotifyData:function(){
            var deferred = $q.defer();
            var promise = deferred.promise;
            $http.post(
                'http://localhost/public/index.php/Crm/Notify/getList',
                '{"control": {"data_source": "xxxx"},"base": {"from":"0","count":"10"}}'
            ).success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            return promise;
        }
    }
}]);
/*
 +--------------------------------------------------------------------
 +
 +	    控制器1.个人中心2.我的业绩3.我的收入4.我的伙伴5.加盟流程6.我的客户7.编辑祝福8.客户详情9.添加客户
 +
 +--------------------------------------------------------------------
 */
app.controller('CenterController', ['$scope', '$rootScope', '$http', 'getDataByHttp','initDatePules',
    function ($scope, $rootScope, $http, getDataByHttp,initDatePules) {
        /* 获取当前日期 */
        var _date = new Date();
        var _year = _date.getFullYear();
        var _month = _date.getMonth()+1;
        var start_date = _year + '-' + _month + '-' + '01';
        var end_date = _year + '-' + _month + '-' + initDatePules.getTotalDays(_year,_month);
        /* 个人中心对象：1.接口 2.参数 */
        var center = {
            api: {
                ucenter: 'http://localhost/WZ/src/dev/static/mobile/data/center.json',
                premium: 'http://localhost/public/index.php/Shop/Shop/premium',
                commision: 'http://localhost/public/index.php/Shop/Shop/Commision'
            },
            args: {
                ucenter: '{"control":{"data_source": "xxxx"},"base": {"baseinfo": 1,"pic": 1, "goods": 1,"from":0,"count":5}}',
                premium_commision: '{"control": {"data_source": "xxxx"},"base": {"start_date":"'+start_date+'","end_date":"'+end_date+'","from": "0","count":"5"}}'
            }
        };
        /* 通过promise方式获取个人信息 */
        getDataByHttp.getData(center.api.ucenter, center.args.ucenter).then(function (data) {
            console.log(data);
            $scope.baseinfo = {
                id: data.base.id,
                name: data.base.name,
                identity: '高级销售经理',
                level: data.base.level
                // sex: data.base.sex == 1 ? "男" : "女",
                // tel: data.base.mobile,
                // wechat: data.base.weixinid,
                // qq: data.base.qq,
                // bgpic: data.base.bg_pic,
                // photo: data.base.pic,
                // descr: data.base.describe,
                // slider: data.pics.list,
                // shop: data.shop.list,
                // goods: data.shop.list
            };
        });
        /* 通过promise方式获取业绩信息 */
        // getDataByHttp.getData(center.api.premium, center.args.premium_commision).then(function (data) {
        //     $scope.pm_month = data.base.month;
        // });
        /* 通过promise方式获取收入信息 */
        // getDataByHttp.getData(center.api.commision, center.args.premium_commision).then(function (data) {
        //     $scope.cn_month = data.base.month;
        // });

        /*
         指令页面渲染传递过来的事件
         */
        $scope.$on('ngRepeatFinished',
            function (ngRepeatFinishedEvent) {
                /* 轮播图脚本 */
                var swiper = new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    pagination: '.swiper-pagination',
                    paginationClickable: '.swiper-pagination',
                    spaceBetween: 30,
                    loop: true
                });
            });
        /*
         修改页面
         */
        var modifypage = {
            api: {
                update: 'http://localhost/public/index.php/Shop/Shop/update',
                create: 'http://localhost/public/index.php/Shop/Shop/create',
                bglist: 'http://localhost/public/index.php/Shop/BgPicture/bgPicList',
                gslist: 'http://localhost/public/index.php/Mall/Goods/goodsList'
            },
            switchPage: function () {
                $(".wz_body,.edit_page").toggleClass("switch");
            },
            showEditByType: function (field, type, value) {
                $("#field").val(field);
                var edit_wrap = $(".edit_page");
                var newval = $(".newval");
                var describe = $("#textaea");
                var gender = $(".sexinput.icon_radio");
                var _this = $("div." + type);
                _this.show().siblings("div").hide();
                switch (type) {
                    case "type_input":
                        newval.val(value);
                        break;
                    case "type_radio":
                        value == "男" ? gender.eq(0).addClass("icon_radiohover") : gender.eq(1).addClass("icon_radiohover");
                        break;
                    case "type_list":
                        //$(".bg_list_wraper").find("img").each(function(){var _this = $(this),_id = _this.attr("data-id");if(value == _id){_this.prev("input").addClass("icon_radiohover");}});
                        break;
                    case "type_textarea":
                        describe.val(value);
                        break;
                }
            },
            sendRequestByField: function (_field, _newval) {
                var arg = '{"control":{"data_source": "xxxx"},"base": {"id":"' + $scope.baseinfo.id + '","' + _field + '":"' + _newval + '"}}';
                switch (_field) {
                    case "name":
                        if ($scope.baseinfo.name !== _newval) {
                            getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                                window.location.reload();
                            });
                        }
                        break;
                    case "sex":
                        if ($scope.baseinfo.sex !== _newval) {
                            getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                                window.location.reload();
                            });
                        }
                        break;
                    case "mobile":
                        if ($scope.baseinfo.tel !== _newval) {
                            getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                                window.location.reload();
                            });
                        }
                        break;
                    case "weixinid":
                        if ($scope.baseinfo.wechat !== _newval) {
                            getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                                window.location.reload();
                            });
                        }
                        break;
                    case "qq":
                        if ($scope.baseinfo.qq !== _newval) {
                            getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                                window.location.reload();
                            });
                        }
                        break;
                    case "describe":
                        if ($scope.baseinfo.descr !== _newval) {
                            getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                                window.location.reload();
                            });
                        }
                        break;
                    case "bg_pic":
                        getDataByHttp.getData(modifypage.api.update, arg).then(function (data) {
                            window.location.reload();
                        });
                        break;
                }
            }
        };
        /* 个人详情 */
        $("#person_detail").find("li").on("click",
            function () {
                var _this = $(this),
                    _field = _this.attr("data-field"),
                    _type = _this.attr("data-type"),
                    _value = _this.find("span").text();
                modifypage.switchPage();
                modifypage.showEditByType(_field, _type, _value);
            });
        /* 添加性别的选中效果 */
        $('input[name="sex"]').on("click",
            function () {
                $('input[name="sex"]').removeClass("icon_radiohover");
                $(this).addClass("icon_radiohover");
            });
        /* 绑定点击修改事件 */
        $("#describe").on("click",
            function () {
                var _this = $(this),
                    _field = _this.attr("data-field"),
                    _type = _this.attr("data-type"),
                    _value = _this.find("p").text();
                modifypage.switchPage();
                modifypage.showEditByType(_field, _type, _value);
            });
        /* 背景图片 */
        $("#bg_pic").on("click",
            function () {
                var _this = $(this),
                    _field = _this.attr("data-field"),
                    _type = _this.attr("data-type"),
                    _value = _this.find("img").attr("data-id");
                $http({
                    method: 'POST',
                    url: modifypage.api.bglist
                }).success(function (data) {
                    var img_list = data.base.list;
                    var len = img_list.length;
                    var str = '';
                    for (var i = 0; i < len; i++) {
                        str += '<li><input type="radio" name="bgimg" class="fr"><img data-id="' + img_list[i].id + '" src="' + img_list[i].pic + '"></li>'
                    }
                    $(".bg_list_wraper").html(str);
                    modifypage.switchPage();
                    modifypage.showEditByType(_field, _type, _value);
                });
            });
        /* 背景添加选中的效果 */
        $(".bg_list_wraper").on("click", "img",
            function () {
                $(".bg_list_wraper").find("input").removeClass("icon_radiohover");
                $(this).prev("input").addClass("icon_radiohover");
            });
        /* 添加商品 */
        $("img.add_shop").on("touchstart",
            function () {
                var shop_id = $scope.baseinfo.id;
                var goods_wraper = $(".type_goods");
                var goods_id = [];
                for (var i = 0; i < $scope.baseinfo.goods.length; i++) {
                    goods_id[i] = $scope.baseinfo.goods[i].goods_id;
                }
                $http({
                    method: 'POST',
                    url: modifypage.api.gslist
                }).success(function (data) {
                    console.log(data);
                    var wraper = $(".gs_list_wraper");
                    var goods_list = data.base.list;
                    var len = goods_list.length;
                    var str = [];
                    for (var i = 0; i < len; i++) {
                        str.push('<li data-gsid ="' + goods_list[i].id + '">');
                        if ($.inArray(goods_list[i].id, goods_id) !== -1) {
                            str.push('<i class="icon icon_radio icon_radiohover fr"></i>');
                        } else {
                            str.push('<i class="icon icon_radio fr"></i>');
                        }
                        str.push('<img src="' + goods_list[i].pic + '" class="fl" />');
                        str.push('<h4>"' + goods_list[i].name + '"</h4>');
                        str.push('<p class="ftgrey">"' + goods_list[i].describe + '"</p>');
                        str.push('</li>');
                    }
                    wraper.html(str.join('')).on("click", "li",
                        function (data) {
                            $(this).find("i").toggleClass("icon_radiohover");
                        });
                    goods_wraper.find(".add_btn").on("click",
                        function () {
                            var item = [];
                            wraper.find("i.icon_radiohover").each(function () {
                                item.push({
                                    "shop_id": shop_id,
                                    "goods_id": $(this).parent("li").attr("data-gsid")
                                });
                            });
                            var arg = '{"control":{"data_source": "xxxx"},"base": {"shop_id":"' + shop_id + '","list":' + JSON.stringify(item) + '}}';
                            getDataByHttp.getData(modifypage.api.create, arg).then(function (data) {
                                window.location.reload();
                            });
                        });
                    modifypage.switchPage();
                    goods_wraper.show().siblings("div").hide();
                });
            });
        /* 确定按钮 */
        $("button.button_green").not(".add_btn").on("click",
            function () {
                var _this = $(this);
                var _curren = _this.parents("div.edit_page").find("div:visible");
                var _type = _curren.attr("class");
                var _field = $("#field").val();
                var _newval = '';
                if (_type == "type_input") {
                    _newval = _curren.find(".newval").val();
                } else if (_type == "type_radio") {
                    _newval = _curren.find("input.icon_radiohover").val();
                } else if (_type == "type_textarea") {
                    _newval = _curren.find("#textaea").val();
                } else if (_type == "type_list") {
                    _newval = _curren.find("input.icon_radiohover").next("img").attr("data-id");
                }
                modifypage.sendRequestByField(_field, _newval);
                _curren.hide();
                modifypage.switchPage();
            });
    }
]);
/*我的业绩*/
app.controller('PremiumController', ['$scope', '$timeout', 'getDataByHttp', 'initDatePules', 'scrollLoading',
    function ($scope, $timeout, getDataByHttp, initDatePules, scrollLoading) {
        const api = 'http://localhost/public/index.php/Shop/Shop/premium';
        /* 选择日期的回调函数 */
        initDatePules.callback = function (value) {
            var date = value.split("-");
            var start_date = value + '-01';
            var end_date = value + '-' + initDatePules.getTotalDays(date[0], date[1]);
            getDataByHttp.getData(api, '{"control": {"data_source": "xxxx"},"base": {"start_date":"' + start_date + '","end_date":"' + end_date + '","from": "0","count":"5"}}').then(function (data) {
                var wraper = $("#data_wraper");
                var list = data.base.list;
                if (list.length === 0) {
                    $scope.premium.list.length = 0;
                    wraper.append("<div style='padding:20px 0 0 0;text-align: center;color: #929292;font-size: .9rem;background: #efeff4;' class='tips'>无相关数据</div>");
                } else {
                    wraper.find(".tips").remove();
                    $scope.premium.list = list;
                    scrollLoading.scrollLoad($scope.premium.list, $scope.premium.total, api);
                }
            });
        };

        $scope.init_date = initDatePules.getCurrDate();
        /* 调用日期初始化函数 */
        initDatePules.initDatePules("pm_date");

        /* 通过promise方式获取业绩所有信息 */
        getDataByHttp.getData(api, '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"5"}}').then(function (data) {
            $scope.premium = {
                month: data.base.month,
                sum: data.base.sum,
                list: data.base.list,
                total: data.base.total
            };
            scrollLoading.scrollLoad($scope.premium.list, $scope.premium.total, api);
        });
    }
]);
/*我的收入*/
app.controller('CommisionController', ['$scope', 'getDataByHttp', 'initDatePules', 'scrollLoading',
    function ($scope, getDataByHttp, initDatePules, scrollLoading) {
        const api = 'http://localhost/public/index.php/Shop/Shop/commision';
        /* 选择日期插件的回调函数 */
        initDatePules.callback = function (value) {
            var date = value.split("-");
            var start_date = value + '-01';
            var end_date = value + '-' + initDatePules.getTotalDays(date[0], date[1]);
            getDataByHttp.getData(api, '{"control": {"data_source": "xxxx"},"base": {"start_date":"' + start_date + '","end_date":"' + end_date + '","from": "0","count":"5"}}').then(function (data) {
                console.log(data);
                var list = data.base.list;
                if (list.length === 0) {
                    $scope.commision.list.length = 0;
                } else {
                    $scope.commision.list = list;
                    scrollLoading.scrollLoad($scope.commision.list, $scope.commision.total, api);
                }
            });
        };
        $scope.init_date = initDatePules.getCurrDate();
        /* 调用日期初始化插件 */
        initDatePules.initDatePules("cn_date");

        /* 通过promise方式获取收入信息 */
        getDataByHttp.getData(api, '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"5"}}').then(function (data) {
            $scope.commision = {
                month: data.base.month,
                sum: data.base.sum,
                list: data.base.list,
                total: data.base.total
            };
            scrollLoading.scrollLoad($scope.commision.list, $scope.commision.total, api);
        });

    }
]);
/*
 我的伙伴
 */
app.controller('MyPartnerController',['$scope','$http','$timeout',function($scope,$http,$timeout){
    console.log("我的伙伴控制器...");
    const api = 'http://localhost/public/index.php/Team/Parten/my';
    const def = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100"}}';
    /* 根据状态值获取对应的文本 */
    $scope.getStatusText = function(num){
        var text = '';
        if(num == 0){
            text = '未审核';
        }else if(num == 1){
            text = '未通过';
        }else if(num == 2){
            text = '已通过';
        }
        return text;
    };
    /* 根据不同的条件获取不同的数据 */
    $scope.getListByCondition = function(arg){
        $http.post(api,arg).success(function(data){
                console.log(data);
                if(data.base.list.length !== 0){
                    $scope.list = data.base.list;
                    $scope.tips = false;
                }else{
                    $scope.list.length=0;
                    $scope.tips = true;
                }
        });
    }
    /* 加载一开始的调用 */
    $scope.getListByCondition(def);
    /* 排序 */
    $("#MyDiv").find("li").on("click",function(){
        var _field = $(this).attr("data-field");
        var arg = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100","sort":{"'+_field+'":"DESC"}}}'
        $scope.getListByCondition(arg);
    });
    /* 筛选 */
    $("#MyDiv1").find("li").on("click",function(){
        var _id = $(this).attr("data-id");
        var arg = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100","sort":{"status":"'+_id+'"}}}';
        $scope.getListByCondition(arg);
    });
    /* 搜索 */
    $("#MyDiv2").find(".button_green").on("click",function(){
        var start_date = $("#start_time").val();
        var end_date = $("#end_time").val();
        var name = $(".input_searcw").val();
        var arg = '';
        if(start_date !== "" && end_date !== "" && name !== ""){
            arg = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100","start_date":"'+start_date+'","end_date":"'+end_date+'","name":"'+name+'"}}';
        }else if(start_date !== "" && end_date !== "" && name == ""){
            arg = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100","start_date":"'+start_date+'","end_date":"'+end_date+'"}}';
        }else if(start_date == "" && end_date == "" && name !== ""){
            arg = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100","name":"'+name+'"}}';
        }else{
            arg = '{"control": {"data_source": "xxxx"},"base": {"from": "0","count":"100"}}';
        }
        $scope.getListByCondition(arg);
        $("#MyDiv2,#fade2").hide();
    });

}]);
/* 加盟流程 */
app.controller('JoinProcessController',['$scope','$http','$state',function($scope,$http,$state){
    console.log("加盟流程...");
    var name=$("input[name='name']");
    var tel = $("input[name='tel']");
    var code = $("input[name='code']");
    var btn_code = $("#getcheckcode");
    var btn_renz = $("button.button_green");
    var btn_checkbox = $("#chkbox");
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    var count = 60;
    var timer;
    var api = {
        getcode :'http://localhost/public/index.php/Shop/Join/index',
        check   :'http://localhost/public/index.php/Shop/Join/check',
        submit  :'http://localhost/public/index.php/Shop/Join/submit'
    };
    /* 发送验证码 */
    var sendCheckCode = function(_this){
        if(tel.val() !== ""){
            if(reg.test(tel.val())){
                _this.addClass("disable").text(count);
                timer = window.setInterval(countDown,1000);
                console.log("调用接口开始发送验证码");
                $http.post(api.getcode,
                '{"control": {"data_source": "xxxx"},"base": {"mobile":"'+tel.val()+'"}}'
                ).success(function(data){
                    console.log(data);
                });
            }else{
                showErrorBox("手机号不正确");
            }
        }else{
            showErrorBox("请输入手机号");
        }
    }
    /* 倒计时 */
    var countDown = function(){
        if(count == 0){
            count = 60;
            window.clearInterval(timer);
            btn_code.bind("click",function(){sendCheckCode($(this));}).removeClass("disable").text("重新获取");
        }else{
            count--;
            btn_code.unbind("click").text(count);
        }
    }
    /* step1和step2之间的切换 */
    var switchPage = function(){
       $(".wz_body,.step2").toggleClass("switch");
    }
    var showErrorBox = function(msg){
        $.confirm({
            theme:"black",
            title: false,
            cancelButton: false ,
            confirmButton: false,
            closeIcon: false,
            content: msg,
            backgroundDismiss:true
        });
    }
    /* 点击发送验证码按钮 */
    btn_code.bind("click",function(){
        sendCheckCode($(this));
    });
    /* 实名认证 */
    btn_renz.bind("click",function(){
        if(btn_checkbox.prop("checked") == true){
            $http.post(api.check,
            '{"control": {"data_source": "xxxx"},"base": {"mobile":"'+tel.val()+'","yzcode":"'+code.val()+'","name":"'+name.val()+'","is_agree":"1"}}'
            ).success(function(data){
                console.log(data);
                if(data.base.error_code == "000"){
                    switchPage();
                }else if(data.base.error_code == "002"){
                    showErrorBox(data.base.error_msg);
                }else{
                    showErrorBox(data.base.error_msg);
                }
            });
        }else{
            showErrorBox("请勾选非全日制用工协议");
        }
    });
    /* 上一步 */
    $(".button_grey").bind("click",function(){
        switchPage();
    });
}]);
/*
 客户
 */
app.controller('CustomerController', ['$scope','$http','$state','scrollLoading', function ($scope,$http, $state,scrollLoading) {
    const api = 'http://localhost/public/index.php/Crm/Customer/getList';
    $scope.getCustomerList = function (api, arg) {
        $http.post(api, arg).success(function (data) {
            $scope.list = data.base.list;
            $scope.total = data.base.total;
            scrollLoading.scrollLoad($scope.list,  $scope.total, api);
        });
    }
    $scope.getCustomerList(api, '{"control": {"data_source": "xxxx"},"base": {"from":"0","count":"5"}}');
    $(".icon_search").on("click", function () {
        if ($scope.keyword !== "") {
            $scope.getCustomerList(api, '{"control": {"data_source": "xxxx"},"base": {"from":"0","count":"10","keyword":"' + $scope.keyword + '"}}');
        } else {
            $scope.getCustomerList(api, '{"control": {"data_source": "xxxx"},"base": {"from":"0","count":"10"}}');
        }
    });

    $scope.getDaysInMonth = function (year,month){
        month = parseInt(month,10);
        var temp = new Date(year,month,0);
        return temp.getDate();
    };
    $scope.getBlessTips = function(){
        $http.post(
            'http://localhost/public/index.php/Crm/Notify/getList',
            '{"control": {"data_source": "xxxx"},"base": {"from":"0","count":"10"}}'
        ).success(function(data){
            console.log(data);
            $scope.bir_list = data.base.brdayList;
            $scope.holi_list = data.base.holidayList;
            $scope.bir_total = data.base.brdayTotal==0?0:data.base.brdayTotal;
            if(data.base.holidayTotal != 0){
                $scope.holi_total = data.base.holidayTotal;
            }
        });
    };
    /* 获取祝福语提示 */
    $scope.getBlessTips();
    /* 显示提示语列表 */
    $scope.showTipsList = function(){
        //clearInterval(timer);
        $state.go('notifylist');
    }

    /* 显示编辑祝福页面 */
    $(".notify_wraper").on("click","li",function(){
        var _this = $(this);
        var _type = _this.attr("data-type");
        var _name = _this.find("h4.marb0").text();
        var _days = _this.find("em.ftorange").text();
        $state.go('editbless',{type:_type,name:_name,days:_days});
    });
}]);

/*编辑祝福*/
app.controller('EditBlessController', ['$scope', '$http','$stateParams', function ($scope,$http,$stateParams) {
    var str = '快到了，快去送好友祝福吧！';
    $scope.name = $stateParams.name;
    $scope.days = $stateParams.days;
    $scope.tips = $stateParams.type == 999?'生日'+str:'节日'+str;
    /* 获取生日祝福语 */
    $scope.getBlessText = function(){
        $http.post(
            'http://localhost/public/index.php/Crm/Notify/getAdvice',
            '{"control": {"data_source": "xxxx"},"base": {"holiday_id":"'+$stateParams.type+'"}}'
        ).success(function(data){
                $scope.message = data.base[0].message;
        });
    }
    $scope.getBlessText();
    /* 换一个祝福语 */
    $("#btn_switch").on("click",function(){
        $scope.getBlessText();
    });
}]);
/*客户详情*/
app.controller('CtrDetailController', ['$scope', '$stateParams', '$http', '$state',
    function ($scope, $stateParams, $http, $state) {
        $http.post(
            'http://localhost/public/index.php/Crm/Customer/get',
            '{"control": {"data_source": "xxxx"},"base": {"id":"' + $stateParams.uid + '"}}'
        ).success(function (data) {
            if (data.base.credit_type == 1) {
                $scope.card_type = "身份证";
            } else if (data.base.credit_type == 2) {
                $scope.card_type = "护照";
            } else if (data.base.credit_type == 3) {
                $scope.card_type = "其他";
            }
            $scope.usinfo = {
                name: data.base.name,
                tel: data.base.tel,
                sex: data.base.sex,
                pic: data.base.pic,
                birthday: data.base.birthday,
                card_num: data.base.credit_code,
                prov_city: data.base.province + data.base.city + data.base.area,
                address: data.base.address,
                remark: data.base.remark

            };
        });
        /* 订单记录 */
        $scope.order_list = [];
        $("#nav>li").on("click", function () {
            var _this = $(this),
                _subwpr = $("#menu_con");
            if ($scope.order_list.length == 0) {
                if (_this.find("a").hasClass("request")) {
                    $http.post(
                        'http://localhost/public/index.php/Crm/Order/getList',
                        '{"control": {"data_source": "xxxx"},"base": {"customer_id":"' + $stateParams.uid + '","from":"0","count":"10"}}'
                    ).success(function (data) {
                            $scope.order_list = data.base.list;
                    });
                }
            }
            _this.find("a").addClass("selected").end().siblings("li").find("a").removeClass("selected");
            _subwpr.children("div").eq(_this.index()).show().siblings("div").hide();
        });
        $(".btn_main").bind("click", function () {
            $(this).siblings("div").toggleClass("anim");
        });
        $(".btn_edit").bind("click", function () {
            $state.go("editcustomer", {uid: $stateParams.uid});
        });
        $(".btn_delete").bind("click", function () {
           $http.post(
               'http://localhost/public/index.php/Crm/Customer/delete',
               '{"control": {"data_source": "xxxx"},"base": {"id":"' + $stateParams.uid + '","status":"0"}}'
           ).success(function(data){
                   $state.go("customer");
           });
        });
    }
]);
/*添加客户*/
app.controller('AddCustomerController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    /* 日期控件 */
    $('#area').scroller('destroy').scroller({
        preset: 'area',
        theme: 'android-ics light',
        display: 'bottom',
        valueo: $("#area").attr("areaid")
    });

    /* formData */
    $scope.card_type = [{"id": "1", "text": "身份证"}, {"id": "2", "text": "护照"}, {"id": "3", "text": "其他"}];
    $scope.gender = [{"value": "1", "text": "男"}, {"value": "2", "text": "女"}];
    $scope.formData = {
        credit_type: $scope.card_type[0].id,
        sex: $scope.gender[0].value
    }
    /* 表单提交 */
    $scope.processForm = function () {
        var _flag = $("#newcusForm").attr("data-flag");
        
        if("true" == _flag){
            var area = $("#area").val().split(" ");
            $scope.formData.province = area[0];
            $scope.formData.city = area[1];
            $scope.formData.area = area[2];
            var arg = '{"control": {"data_source": "xxxx"},"base":' + JSON.stringify($scope.formData) + '}';
            $http.post(
                'http://localhost/public/index.php/Crm/Customer/create', arg
            ).success(function (data) {
                    if (data) {
                        $state.go("customer");
                    }
            });
        }else{
            return false;
        }
        
    }
}]);
/*编辑资料*/
app.controller('EditCustomerController', ['$scope', '$stateParams', '$http', '$state', function ($scope, $stateParams, $http, $state) {
    /* 日期控件 */
    $('#area').scroller('destroy').scroller({
        preset: 'area',
        theme: 'android-ics light',
        display: 'bottom',
        valueo: $("#area").attr("areaid")
    });
    /* 根据id获取用户信息 */
    $http.post(
        'http://localhost/public/index.php/Crm/Customer/get',
        '{"control": {"data_source": "xxxx"},"base": {"id":"' + $stateParams.uid + '"}}'
    ).success(function (data) {
            $scope.card_type = [{"id": "1", "text": "身份证"}, {"id": "2", "text": "护照"}, {"id": "3", "text": "其他"}];
            $scope.gender = [{"value": "1", "text": "男"},{"value": "2", "text": "女"}];
            var area = data.base.province + data.base.city + data.base.area;
            $scope.formData = {
                id: $stateParams.uid,
                name: data.base.name,
                tel: data.base.tel,
                credit_type: $scope.card_type[data.base.credit_type - 1].id,
                credit_code: data.base.credit_code,
                sex: $scope.gender[data.base.sex - 1].value,
                birthday: data.base.birthday,
                area: area,
                address: data.base.address,
                remark: data.base.remark
            }
        });
    /* 提交更新 */
    $scope.processForm = function () {
        var area = $("#area").val().split(" ");
        $scope.formData.province = area[0];
        $scope.formData.city = area[1];
        $scope.formData.area = area[2];
        var arg = '{"control": {"data_source": "xxxx"},"base":' + JSON.stringify($scope.formData) + '}';
        $http.post(
            'http://localhost/public/index.php/Crm/Customer/update', arg
        ).success(function (data) {
                if (data) {
                    $state.go("customer");
                }
        });
    }
}]);
/*
 主页
 */
app.controller('TestController', ['$scope', '$http', '$state', '$stateParams',
    function ($scope, $http, $state, $stateParams) {
        console.log('test');
        $scope.fetchRequestParmValue = function (url, paras) {
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {}
            for (i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if (typeof(returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
        }
        $scope.code = '';

        var url = window.location.href;
        //window.location.href="http://localhost/public/index.php/wechat/auth/index/appid/wx01db2b9b0e416100?url="+encodeURIComponent(url);
        if ($scope.fetchRequestParmValue(url, 'code')) {
            $scope.code = $scope.fetchRequestParmValue(url, 'code');
        } else {
            window.location.href = "http://localhost/public/index.php/wechat/auth/index/appid/wx01db2b9b0e416100?url=" + encodeURIComponent(url);
        }
    }
]);
