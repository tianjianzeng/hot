// 用户登录弹层 
function userInforShow(o,e) {
    stopBubble(e);
    $(o).toggleClass("userNameShow");
    $(".user_infor").slideToggle("fast");
}

function sideInforShow(o,e) {
    stopBubble(e);
    $(o).toggleClass("down_layer");
    $(".second_level").slideToggle("fast");
}
//模型
function areaInforShow(o,e) {
    stopBubble(e);
    $(o).toggleClass("handleup");
    $(o).siblings(".area_infor").slideToggle("fast");
    $(o).siblings(".area_infor").children("ul").children("li").children(".add_way").css("display","none"); 
}

//停止事件冒泡
function stopBubble(e) {
     if ( e && e.stopPropagation ) {
        // 因此它支持W3C的stopPropagation()方法 
        e.stopPropagation();
    } else { 
        // 否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
    }
}
