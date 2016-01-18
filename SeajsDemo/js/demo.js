// 所有模块都通过 define 来定义
define(function(require, exports, module) {
	//当前模块对外提供的接口方式1
	// exports.doSomething = function(){
	// 	console.log('do something ......');
	// }

	//定义一个对象：有属性和方法
	var a = {
		e:'wuwangcheng',
		f:function(){
			console.log('19950201');
		}
	}
	//当前模块对外提供的接口方式2
	module.exports = a;
});