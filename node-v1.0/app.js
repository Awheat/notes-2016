/**
 * app.js(npm install express jade moment mongoose)
 * @authors Your Name (you@example.org)
 * @date    2015-12-29 11:47:32
 * @version $Id$
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app  = express();

app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('node started on port ' + port);

/*
	--------------------------自定义路由规则----------------------------
*/
// index page
app.get('/',function(req,res){
	res.render('index',{
		title:'node 首页',
		movies: [
			{
				title:'机械战警',
				_id: 1,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警',
				_id: 2,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警',
				_id: 3,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警',
				_id: 4,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警',
				_id: 5,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title:'机械战警',
				_id: 6,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			}
		]
	});
});

// detail page
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'node 详情页',
		movie: {
			doctor: '保罗-美利坚',
			country: '美国',
			title: '机械战警',
			year: 2014,
			poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '山雄伟，海辽阔，经奇幻。自古以来人妖共存于世，人欲主天下，妖遂被驱逐入山。其后历朝，妖偶有越界，皆由捉妖天师秘密处理。老妖王辞世，妖界大乱，众妖越界流窜，一时间世间人妖难辨。在偏安深山的永宁村中，村长宋天荫（井柏然 饰）偶遇一路捉妖而来的菜鸟天师霍小岚（白百何 饰），在意外共度一夜后，被妖后托胎，随即生下了小妖王胡巴。为了自己的私心，小岚带着天荫一路同行前往顺天府，保护他躲过..'
		}
	});
});

// list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'node 列表页',
		movies:[
			{
				title: '机械战警',
				_id: 1,
				doctor: '保罗-美利坚',
				country: '美国',
				year: 2014,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
				language: '英语',
				flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
				summary:'山雄伟，海辽阔，经奇幻。自古以来人妖共存于世，人欲主天下，妖遂被驱逐入山。其后历朝，妖偶有越界，皆由捉妖天师秘密处理。老妖王辞世，妖界大乱，众妖越界流窜，一时间世间人妖难辨。在偏安深山的永宁村中，村长宋天荫（井柏然 饰）偶遇一路捉妖而来的菜鸟天师霍小岚（白百何 饰），在意外共度一夜后，被妖后托胎，随即生下了小妖王胡巴。为了自己的私心，小岚带着天荫一路同行前往顺天府，保护他躲过..'
			}
		]
	});
});

// admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'node 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language:''
		}
	});
});