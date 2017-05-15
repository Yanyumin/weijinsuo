/**
 * Created by yym on 2017/3/7.
 */
$(function(){
    banner();
    //initTabs();
})
function banner(){
//    获取后台图片数据 (Ajax)
    var myData;
    var getData = function(callback){
        if(myData){
            callback && callback(myData)
            return false;
        }
        $.ajax({
            //js是被html调用  相当于是html发出的请求 ,于是请求json是要先进入js文件夹
            url:'js/wjs.json',
            data:{},
            type:"get",//请求的类型: 获取
            dataType:"json",//要求后台返回的数据类型
            success:function(data){
                myData = data;
                callback && callback(myData)
            }
        })
    }
        var renderHtml = function(){
                getData(function(data){
                    var width = $(window).width;
                    var isMobile = false;
                    if(width < 768){
                        isMobile = true;
                    }
                    var templatePoint = _.template($('#template_point').html());
                    var templateImage = _.template($('#template_item').html());
                    var pointHtml = templatePoint({model:data})
                })
            }
;}
