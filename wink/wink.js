;(function ($, window, document, undefined) {
    'use strict';
    function wink(element_hide_content,element_show_div, only_wink_flag) {
        this.element_hide_content = element_hide_content;//将要打印的内容放到一个隐藏域内
        this.element_show_div = element_show_div;//显示的地方
        this.only_wink_flag = only_wink_flag;//是否只闪动下划线
        this.init();
    }
    wink.prototype =  {
        constructor : wink,
        init : function() {
            this.showWink();
        },
        showWink: function(){
            var Only_Wink_Flag=this.only_wink_flag;
            var content=$(this.element_hide_content).text();
            var  show = $(this.element_show_div);
            var Innt = [];//预定义用存储的数组
            var Index = 0;//预定义用存储的数组的角标
            var Itimes = 0;//光标闪烁次数
            var FootIndex = 0;//输出时用的角标
            var InnerHTML = "";//当前页面已经输出的元素
            for (var i = 0; i <content.length; i++) {
                Innt[Index]=content[i];
                Index++;
            }
            if(!Only_Wink_Flag){
                var   FunOut = function(){
                    if (Itimes % 3 != 0) {
                        Itimes++;
                        show.html(InnerHTML + "_");
                    }else{
                        if(FootIndex<Index){
                            InnerHTML +=Innt[FootIndex++];
                            show.html(InnerHTML+"&nbsp;&nbsp;");
                        }
                        if(FootIndex==Index){
                            //使光标闪烁
                            clearInterval(FunOut);
                            var items=0;
                            setInterval(
                                function(){
                                    if(items%3!=0){
                                        show.html(InnerHTML + "_");
                                    }else{
                                        show.html(InnerHTML +"&nbsp;&nbsp;");
                                    }
                                    items++;
                                },100);
                        }
                    }
                    Itimes++;
                };
                setInterval(FunOut,100);
            }
            else{
                var     Only_Wink=function(){
                    InnerHTML=content;
                    if(Itimes%3!=0){
                        Itimes++;
                        show.html(InnerHTML + "_");
                    }else{
                        show.html(InnerHTML+"&nbsp;&nbsp;");
                    }
                    Itimes++;
                }
                setInterval(Only_Wink,100);
            };}
    }
    $.wink = function (element_hide_content,element_show_div, only_wink_flag) {

        return new wink(element_hide_content,element_show_div, only_wink_flag);
    }
})(jQuery, window, document);