$(function(){
    /* 激活选项卡 */
    $('#myTab li:eq(0) a').tab('show');
    /* 拖拽 */
    $( ".draggable" ).sortable({revert: true});
    $('.choice').on('click',function(){
        $("#addChoice").modal('hide');
        $("#addInformation").modal('show');
    });;
    //模态框居中的控制
    function centerModals(){
        $('.modal').each(function(i){
            var $clone = $(this).clone().css('display', 'block').appendTo('body');    
            var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top-30);
        });
    }
    $('.modal').on('show.bs.modal', centerModals);      //当模态框出现的时候
    $(window).on('resize', centerModals);  
});