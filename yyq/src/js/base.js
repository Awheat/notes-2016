!(function(win){
    var init = function(){
        var docEle = win.document.documentElement;
        var winWid = docEle.clientWidth;
        var def = 80;
        docEle.style.fontSize = winWid >=768 ? def + 'px':winWid / 6.4 + 'px';
    };
    init(),
    win.addEventListener("DOMContentLoaded",init,false),
    win.addEventListener("resize",init,false);
})(window);