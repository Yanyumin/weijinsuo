/**
 * Created by yym on 2017/3/7.
 */
$(function(){
    banner();
    //initTabs();
})
function banner(){
//    ��ȡ��̨ͼƬ���� (Ajax)
    var myData;
    var getData = function(callback){
        if(myData){
            callback && callback(myData)
            return false;
        }
        $.ajax({
            //js�Ǳ�html����  �൱����html���������� ,��������json��Ҫ�Ƚ���js�ļ���
            url:'js/wjs.json',
            data:{},
            type:"get",//���������: ��ȡ
            dataType:"json",//Ҫ���̨���ص���������
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
