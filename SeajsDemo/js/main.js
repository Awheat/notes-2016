define(function(require,exports,module){
	//引入jquery(这里的jq是前面配置的别名)
	require('jq');
	console.log('ok');
	//异步加载模块
	var demo = require.async('demo',function(demo){
		console.log(demo.doSomething());
		console.log(demo.e);
		console.log(demo.f());
	});
	
});