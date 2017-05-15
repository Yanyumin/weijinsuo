/**
 * Created by yym on 2017/3/10.
 */
$(function(){
    banner();
})
function banner(){
    var myData;
    var getData = function (callback){
        if(myData){
            callback && callback(myData);
            return false;
        }
        $.ajax ({
            url:"js/index.json",
            data:{},
            type:"get",
            dataType:"json",
            success : function(data){
                myData = data;
                callback && callback(myData);
            }
        })
    }
    var renderHtml = function(){
        getData(function(data){
            var width = $(window).width();
            var isMobile = false;
            if(width < 768){
                isMobile = true;
            }
            //点的模板
            var templatePoint = _.template($("#template_point").html());
        //    图片的模板
            var templateImage = _.template($("#template_item").html());
        //    渲染成html
        //                              传入的名字叫medel，数据较data
            var pointHtml = templatePoint({model:data});
            var imageData = {
                list:data,
                isMobile:isMobile
            }
            var imageHtml = templateImage({model:imageData});
        //    渲染页面
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        })
    }
//    在屏幕尺寸改变的时候，重新渲染页面，监听页面尺寸的改变 resize
    $(window).on("resize",function(){
        renderHtml();
    }).trigger('resize');//即时执行resize事件
//    在移动端通过手势控制图片的轮播
    var startX = 0;
    var isMove = false;
    var moveX = 0;
    var distanceX = 0;
//    绑定事件
    $('.wjs_banner').on('touchstart',function(e){
        //console.log(e.originalEvent.touches[0].clientX);//获取的是当前点击位置在x轴上的坐标
        startX = e.originalEvent.touches[0].clientX;
    })
    $('.wjs_banner').on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
        //console.log(distanceX);
    })
    $('.wjs_banner').on('touchend',function(e){
        //有一定的滑动距离
        if(Math.abs(distanceX) > 50 && isMove){
            if(distanceX < 0){
                //小于零的时候向左滑动，下一张
                $(".carousel").carousel('next');
            }else{
                //大于零的时候向右滑动，上一张
                $(".carousel").carousel('prev');
            }
        }
        startX = 0;
         moveX = 0;
        isMove = false;
        distanceX = 0;
    })
}