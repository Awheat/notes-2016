/**
 * main.js
 * @authors Your Name (you@example.org)
 * @date    2015-12-28 13:38:13
 * @version $Id$
 */

requirejs.config({
	paths:{
		jquery:'jquery-1.8.3.min'
	}
});
requirejs(['jquery','backtop'],function($,backtop){
	$("#backtop").backtop({
		method:'move',
		speed:2000
	});
});
