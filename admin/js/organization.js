$(function(){
    var organization = {
        init:function(){
            $("#organizationForm").validate(this.validateConfig);
            /* 拖拽 */
            $( ".draggable" ).sortable({revert: true});
            /* 时间函数 */
            this.events();
        },
        events:function(){

            /*
                定位modal框的位置
            */
            $('.modal').on('show.bs.modal', this.centerModals);
            $(window).on('resize', this.centerModals);  
        },
        centerModals:function(){
            $('.modal').each(function(i){
                var $clone = $(this).clone().css('display', 'block').appendTo('body');    
                var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                top = top > 0 ? top : 0;
                $clone.remove();
                $(this).find('.modal-content').css("margin-top", top-30);
            });
        },
        validateConfig:{
                submitHandler: function (form) {
                    var param = $(form).serialize();
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent());
                },
                success: function (label) {
                },
                rules: {
                    form_title: {required: true},
                    form_link: {required: true},
                    form_type:{required:true}
                },
                messages: {
                    form_title: {required: "请输入标题"},
                    form_link: {required: "请输入链接"},
                    form_type:{required:"请选择推荐机构"}
                }
        }
    };

    organization.init();
});