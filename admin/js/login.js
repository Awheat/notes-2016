$(function(){
    var login = {   
        init:function(){
            $("#loginForm").validate(this.validateConfig);
            // 用户名
            $.validator.addMethod("isName", function(value, element) {   
                var username = /^[_a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/;
                return this.optional(element) || (username.test(value));
            }, "请输入合法的用户名");
        },
        validateConfig:{
            submitHandler: function (form) {
                form.submit();
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.next('span.error'));
            },
            rules: {
                username: {required: true,isName:true},
                password: {required: true,rangelength:[6,20]}
            },
            messages: {
                username: {required: "请输入用户名"},
                password: {required: "请输入密码",rangelength:$.validator.format("请输入长度在 {0} 到 {1} 之间的密码")}
            }
        }
    };
    login.init();
});