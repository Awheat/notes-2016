/**
 * Created with JetBrains WebStorm.
 * User: damay
 * Date: 15-5-16
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    $('#content-nav').attr('height', '100%');
    $('.nav-menu>ul>li>a').on('click', function () {
        var url = $(this).attr('data-url');
        //window.open('../'+url+'.html');
        window.parent.location.href = url;
    });

    $('#dropnav input[type="checkbox"]').on('click', function () {
        if ($(this).is(':checked')) {
            $(this).siblings('.dropdown-toggle').trigger('click');
        }
    });

    //全选  反选
    $(document).on("click", "#tagcheck", function () {
        var tag = $("#tagcheck");
        $("input[type='checkbox'][name='tag_check']").each(function () {
            if (tag.val() == 0) {
                this.checked = true;
                tag.next().html("取消");
            } else {
                this.checked = false;
                tag.next().html("全选");
            }
        });

        tag.val(tag.val() == 0 ? 1 : 0);
    });

    $(document).on("click", "#checkAll", function () {
        var tag = $("#checkAll");
        $("input[type='checkbox'][name='tag_check']").each(function () {
            if (tag.val() == 0) {
                this.checked = true;
                tag.next().html("取消");
            } else {
                this.checked = false;
                tag.next().html("全选");
            }
        });

        tag.val(tag.val() == 0 ? 1 : 0);
    });
});
//左侧菜单栏点击事件
$(function () {
    $(".sidebar-menu>.menu-first").on("click", function () {
        $(".sidebar-menu>.menu-first").removeClass("in");//显示点击事件下的二级菜单
        $(this).addClass("in");//给点击的一级菜单添加点击后的样式
        $(this).next(".collapse").siblings(".collapse").removeClass("in"); //隐藏其他的二级菜单
        var obj = $(this).children("span").last();
        if (obj.hasClass("in")) {
            obj.removeClass("in");
        } else {
            $(".sidebar-menu>.menu-first").children(".fa-angle-left").removeClass("in");
            obj.addClass("in");
        }
    });

    $(".sidebar-menu>.nav-list>li").on("click", function () {
        $(".sidebar-menu>.nav-list>li>a").removeClass("current");
        $(this).children().addClass("current");
    });
});


//弹出隐藏层
function ShowDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'block';
    document.getElementById(bg_div).style.display = 'block';
};
//弹出层
function CloseDiv(show_div, bg_div) {
    document.getElementById(show_div).style.display = 'none';
    document.getElementById(bg_div).style.display = 'none';
};

$("#showdiv").change(function () {
    CloseDiv('MyDiv', 'fade')
});
//tab 选项卡
function setTab(m, n) {
    var tli = document.getElementById("menu" + m).getElementsByTagName("li");
    var mli = document.getElementById("main" + m).getElementsByTagName("ul");
    for (i = 0; i < tli.length; i++) {
        tli[i].className = i == n ? "hover" : "";
        mli[i].style.display = i == n ? "block" : "none";
    }
}

function laydateInit() {
    !function () {


        //页面存在两个 时间选择对，
        if ($("#start").length > 0) {
            //日期范围限制
            var start = {
                elem: '#start',
                event: 'focus',
                format: 'YYYY-MM-DD',
                min: '2010-01-06', //设定最小日期为当前日期
                max: laydate.now(), //最大日期
                init: true,
                istime: true,
                istoday: true,
                choose: function (datas) {
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };
            laydate(start);
        }

        if ($("#end").length > 0) {
            var end = {
                elem: '#end',
                event: 'focus',
                format: 'YYYY-MM-DD',
                min: '2010-01-06',
                max: laydate.now(),
                initDate: true,
                istime: true,
                istoday: true,
                choose: function (datas) {
                    start.max = datas; //结束日选好后，充值开始日的最大日期
                }
            };
            laydate(end);
        }


        if ($("#start1").length > 0) {
            //日期范围限制
            var start = {
                elem: '#start1',
                event: 'focus',
                format: 'YYYY-MM-DD',
                min: '2010-01-06', //设定最小日期为当前日期
                max: laydate.now(), //最大日期
                init: true,
                istime: true,
                istoday: true,
                choose: function (datas) {
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };
            laydate(start);
        }

        if ($("#end1").length > 0) {
            var end = {
                elem: '#end1',
                event: 'focus',
                format: 'YYYY-MM-DD',
                min: '2010-01-06',
                max: laydate.now(),
                initDate: true,
                istime: true,
                istoday: true,
                choose: function (datas) {
                    start.max = datas; //结束日选好后，充值开始日的最大日期
                }
            };
            laydate(end);
        }
    }();
}
