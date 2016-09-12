$(function(){
    var createArticle = {
        init:function(){
            /* 富文本编辑器 */
            KindEditor.ready(function(K) {
                window.editor = K.create('#article_content',{
                    afterBlur: function(){this.sync();}
                });
            });
            /* 表单验证 */
            $("#createArticleForm").validate(this.validateConfig);
            /* 时间函数 */
            this.events();
        },
        events:function(){
            var form_type = $('.form-type'), form_hidden = $('input[name="article_type"]');
                form_type.on('click','span',function(){
                    $(this).toggleClass('active').siblings('span').removeClass('active');
                    form_hidden.val(form_type.find('span.active').attr('data-type'));
                });

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
            ignore: '',
            submitHandler: function (form) {
                var param = $(form).serialize();
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent());
            },
            success: function (label) {
            },
            rules: {
                article_type: {required: true},
                article_title: {required: true},
                article_abstract:{required:true},
                article_content:{required:true}
            },
            messages: {
                article_type: {required: "请选择文章类型"},
                article_title: {required: "请输入文章标题"},
                article_abstract:{required:"请输入摘要"},
                article_content:{required:"请输入正文"}
            }
        }
    };

    createArticle.init();
});