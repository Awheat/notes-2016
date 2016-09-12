$(function(){
    var banner = {
        init:function(){
            $("#bannerForm").validate(this.validateConfig);
            /* 拖拽 */
            $( ".draggable" ).sortable({revert: true});
            /* 时间函数 */
            this.events();
        },
        events:function(){
            /*
                选择时间
            */
            var start_date = $('#start_date'),end_date = $('#end_date');
                start_date.datetimepicker({
                    language:  'zh-CN',
                    format: "yyyy-mm-dd",
                    autoclose:true,
                    minView:2
                }).on('changeDate',function(){
                    end_date.datetimepicker('setStartDate',start_date.val());
                });

                end_date.datetimepicker({
                    language:  'zh-CN',
                    format: "yyyy-mm-dd",
                    autoclose:true,
                    minView:2
                });

                /*
                    定位modal框的位置
                */
                $('.modal').on('show.bs.modal', this.centerModals);      //当模态框出现的时候
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
                    form_start_date:{required:true},
                    form_end_date:{required:true}
                },
                messages: {
                    form_title: {required: "请输入标题"},
                    form_link: {required: "请输入链接"},
                    form_start_date:{required:"请选择开始时间"},
                    form_end_date:{required:"请选择结束时间"}
                }
        }
    };

    banner.init();
});