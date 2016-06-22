$(function(){
    /**错误消息**/
    var promptText = function (_key) {
        mylang = {
            "input_name_null":"请输入姓名",
            "input_name_length":"请输入小于{0}位的姓名",
            "input_name_error":"请输入正确的姓名",
            "input_tel_null":"请输入手机号",
            "input_tel_length":"请输入11的位手机号",
            "input_tel_error":"请输入正确的手机号",
            "input_creditcode_null":"请输入证件号码",
            "input_creditcode_length":"请输入小于{0}位的证件号码",
            "input_creditcode_error":"请输入正确的证件号码",
            "input_area_null": "请选择地区", 

            "input_address_null": "请输入地址", 
            "input_phone_error":"请输入正确的手机号码",
            "input_phone_null":"请输入手机号码",
            "input_email_null":"请输入邮箱",
            "input_email_error":"请输入正确的邮箱",
            "":""
        }; 
        return mylang[_key]; 
    }

    /**
    *表单
    */
    var inputObj = {
        //文本框的错误提示
        alertBox: function(_title,_cont){
            var jconfirm = $(".jconfirm");
            if(jconfirm.length <= 0){
                $.dialog({
                    title: _title,
                    content: _cont,
                    closeIcon: false, 
                    backgroundDismiss:true,
                    theme: 'black'
                });
            }
        },
        //滤除空格
        trimCenter : function (_str){
            var result = _str.replace(/(^\s*)|(\s*$)/g, "");  
            return result.replace(/\s/g,"");
        },
        //判断文本框是否必填
        requiredJudge : function(_value,_element){
            var reObj = $(_element).attr("aria-required");
            if(("undefined" == typeof Obj) && ("" == _value)) return true; 
        }
    }

    /*
    *表单的默认事件
    */
    $.validator.setDefaults({
        errorPlacement:function(_error,_element){
            inputObj.alertBox("",_error[0].innerHTML);
        }
    });

    /**
     * 新增客户
     */
    $("#newcusForm").validate({
        rules:{
            name:{
                required:true,
                rangelength:[2,5],
                isName:true
            },tel:{
                required:true,
                rangelength:[11,11],
                isTel:true
            },credit_code:{
                required:false,
                isCreditCode:true
            },birthday:{
                required:false,
                isBirthday:true
            },area:{
                required:false,
                isArea:true
            },address:{
                required:false,
                isAddress:true
            }
        },submitHandler:function(form){
            $(form).attr("data-flag","true");
        },messages:{
            name:{
                required:promptText("input_name_null"),
                rangelength:jQuery.validator.format("请输入{0}至{1}个中文字符")
            },tel:{
                required:promptText("input_tel_null"),
                rangelength:promptText("input_tel_length")
            }
        },onkeyup:false,onfocusout:false
    });

    /**
    *姓名的验证
    */
    $.validator.addMethod("isName",function(_value,_element) {
        var regexp = new RegExp("^[\u4e00-\u9fa5]{2,5}$");
        _element.value = inputObj.trimCenter(_value);
        return regexp.test(inputObj.trimCenter(_value));
    }, "请输入2至5位中文字符");

    /**
    *手机号验证
    */
    $.validator.addMethod("isTel",function(_value,_element) { 
        var regexp = new RegExp("^1[3|4|5|7|8][0-9]\\d{8}$");   
        return regexp.test(_value);
    }, "请输入11位有效的手机号");

    /**
    *证件号码验证
    */
    $.validator.addMethod("isCreditCode",function(_value,_element) { 
        if(inputObj.requiredJudge(_value,_element)) return true;
        var selectedVal = $("#credit_type").find('option:selected').html();
        if("身份证" == selectedVal){
            return creditCode.creditIdCode(_value);
        }else if("护照" == selectedVal){
            return creditCode.passportCode(_value);
        }
    }, "请输入有效的证件号");

    /**
    * 身份证与护照的验证
    */
    var creditCode = {
        "creditIdCode":function(_value){
            var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ]; // 加权因子   
            var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];  // 身份证验证位值.10代表X 

            var idCard = inputObj.trimCenter(_value); //去掉字符串头尾空格   
            if(idCard.length != 18){
                return false;
            }                  
            var a_idCard = idCard.split(""); // 得到身份证数组 

            /**  
             * 判断身份证号码为18位时最后的验证位是否正确  
             */  
            var sum = 0; // 声明加权求和变量   
            if (a_idCard[17].toLowerCase() == 'x') {   
                a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
            }   
            for ( var i = 0; i < 17; i++) {   
                sum += Wi[i] * a_idCard[i]; // 加权求和   
            }       

            valCodePosition = sum % 11; // 得到验证码所位置   
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                var year =  idCard.substring(6,10);  
                var nowYear = new Date();
                nowYear = nowYear.getFullYear();
                if(nowYear-year >= 120){  
                    return false;   
                }else{   
                    return true;   
                }    
            } else { 
                return false;   
            }  
        },"passportCode":function(_value){
            var regexp = new RegExp('^[a-zA-Z][0-9.]{7,9}$');
            return regexp.test(inputObj.trimCenter(_value));
        }
    }

    /**
    地区验证
    */
    $.validator.addMethod("isArea",function(_value,_element){
        if(inputObj.requiredJudge(_value,_element)) return true;
        var regexp = new RegExp("^[\u4e00-\u9fa5\s]{2,15}$");
        return regexp.test(_value);
    },"请选择有效的地区");
    
    /**
    街道验证
    */
    $.validator.addMethod("isAddress",function(_value,_element){
        if(inputObj.requiredJudge(_value,_element)) return true;
        var reg = new RegExp('^(?=.*?[\u4E00-\u9FA5])[\dA-Za-z\u4E00-\u9FA5]+');
        return reg.test(_value);
    },"请输入有效的地址");

    /**
    * 出生日期验证
    */
    $.validator.addMethod("isBirthday",function(_value,_element){
        if(inputObj.requiredJudge(_value,_element)) return true;
        var reg = new RegExp("(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)");
        return reg.test(_value);
    },"请按格式输入客户出生日期");
});
