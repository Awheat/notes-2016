// JavaScript Document

function getViewportHeight() {
	if (window.innerHeight!=window.undefined) return window.innerHeight;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
	if (document.body) return document.body.clientHeight; 

	return window.undefined; 
}
function getViewportWidth() {
	if (window.innerWidth!=window.undefined) return window.innerWidth;
	if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth;
	if (document.body) return document.body.clientWidth; 

	return window.undefined; 
}

/**
 * Gets the real scroll top
 */
function getScrollTop() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}
function getScrollLeft() {
	if (self.pageXOffset) // all except Explorer
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollLeft)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollLeft;
	}
}
/*
渐变的弹出图片
使用方法：
将ToolTip.js包含在网页body的结束标签后
调用方法：
<a href="pages.jpg" target='_blank' onMouseOver="toolTip('<img src=http://zhouzh:90/templet/T_yestem_channel/pages_small.jpg>')" onMouseOut="toolTip()"><img src='pages_small.jpg' border=0 width=30 height=20 align="absmiddle" title="点击看大图"></a>

必须CSS样式
.trans_msg
{
	filter:alpha(opacity=100,enabled=1) revealTrans(duration=.2,transition=1) blendtrans(duration=.2);
}
*/
//--初始化变量--
var rT=true;//允许图像过渡
var bT=true;//允许图像淡入淡出
var tw=150;//提示框宽度
var endaction=false;//结束动画
var ns4 = document.layers;
var ns6 = document.getElementById && !document.all;
var ie4 = document.all;
offsetX = 10;
offsetY = 20;
var toolTipSTYLE="";
function initToolTips()
{
	tempDiv = document.createElement("div");
	tempDiv.id = "toolTipLayer";
	tempDiv.style.position = "absolute";
	tempDiv.style.display = "none";
	document.body.appendChild(tempDiv);
	if(ns4||ns6||ie4)
	{
		if(ns4) toolTipSTYLE = document.toolTipLayer;
		else if(ns6) toolTipSTYLE = document.getElementById("toolTipLayer").style;
		else if(ie4) toolTipSTYLE = document.all.toolTipLayer.style;
		if(ns4) document.captureEvents(Event.MOUSEMOVE);
		else
		{
		  toolTipSTYLE.visibility = "visible";
		  toolTipSTYLE.display = "none";
		}
		document.onmousemove = moveToMouseLoc;
	}
}
function toolTip(msg, fg, bg)
{
	try {
	  if(toolTip.arguments.length < 1) // hide
	  {
		if(ns4) 
		{
		toolTipSTYLE.visibility = "hidden";
		}
		else 
		{
		  //--图象过渡，淡出处理--
		  if (!endaction) {toolTipSTYLE.display = "none";}
		  if (rT) document.all("msg1").filters[1].Apply();
		  if (bT) document.all("msg1").filters[2].Apply();
		  document.all("msg1").filters[0].opacity=0;
		  if (rT) document.all("msg1").filters[1].Play();
		  if (bT) document.all("msg1").filters[2].Play();
		  if (rT){ 
		  if (document.all("msg1").filters[1].status==1 || document.all("msg1").filters[1].status==0){  
		  toolTipSTYLE.display = "none";}
		  }
		  if (bT){
		  if (document.all("msg1").filters[2].status==1 || document.all("msg1").filters[2].status==0){  
		  toolTipSTYLE.display = "none";}
		  }
		  if (!rT && !bT) toolTipSTYLE.display = "none";
		  //----------------------
		}
	  }
	  else // show
	  {
		if(!fg) fg = "#777777";
		if(!bg) bg = "#eeeeee";
		var content =
		'<table id="msg1" name="msg1" border="0" cellspacing="0" cellpadding="1" bgcolor="' + fg + '" class="trans_msg"><td>' +
		'<table border="1" cellspacing="2" cellpadding="3" bgcolor="' + bg + 
		'"><td><font face="Arial" color="' + fg +
		'" size="-2">' + msg +
		'</font></td></table></td></table>';
	
		if(ns4)
		{
		  toolTipSTYLE.document.write(content);
		  toolTipSTYLE.document.close();
		  toolTipSTYLE.visibility = "visible";
		}
		if(ns6)
		{
		  document.getElementById("toolTipLayer").innerHTML = content;
		  toolTipSTYLE.display='block'
		}
		if(ie4)
		{
		  document.all("toolTipLayer").innerHTML=content;
		  toolTipSTYLE.display='block'
		  //--图象过渡，淡入处理--
		  var cssopaction=document.all("msg1").filters[0].opacity
		  document.all("msg1").filters[0].opacity=0;
		  if (rT) document.all("msg1").filters[1].Apply();
		  if (bT) document.all("msg1").filters[2].Apply();
		  document.all("msg1").filters[0].opacity=cssopaction;
		  if (rT) document.all("msg1").filters[1].Play();
		  if (bT) document.all("msg1").filters[2].Play();
		  //----------------------
		}
	  }
	} catch(e) {}
}
function moveToMouseLoc(e)
{
  var scrollTop = getScrollTop();
  var scrollLeft = getScrollLeft();
  if(ns4||ns6)
  {
    x = e.pageX + scrollLeft;
    y = e.pageY - scrollTop;
  }
  else
  {
    x = event.clientX + scrollLeft;
    y = event.clientY;
  }
  
  if (x-scrollLeft > getViewportWidth() / 2) {
  	x = x - document.getElementById("toolTipLayer").offsetWidth - 2 * offsetX;
  }
  
  if ((y+document.getElementById("toolTipLayer").offsetHeight+offsetY)>getViewportHeight()) {
	y = getViewportHeight()-document.getElementById("toolTipLayer").offsetHeight-offsetY;
  }
  toolTipSTYLE.left = (x + offsetX)+'px';
  toolTipSTYLE.top = (y + offsetY + scrollTop)+'px';
  return true;
}
initToolTips();

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
